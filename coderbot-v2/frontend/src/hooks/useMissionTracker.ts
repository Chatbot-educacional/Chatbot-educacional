import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  ClassMissionRecord,
  MissionType,
  listClassMissions,
  getStudentMissionProgress,
  updateStudentMissionProgress,
  getCurrentUser,
  registerUserAction,
  pb,
} from '@/integrations/pocketbase/client';

/**
 * Hook para rastrear automaticamente o progresso das missões do aluno.
 * 
 * Este hook monitora as ações do usuário e atualiza o progresso das missões
 * relevantes automaticamente.
 * 
 * @param classId - ID da turma atual (opcional)
 * @returns Funções para rastrear diferentes tipos de ações
 */
export const useMissionTracker = (classId?: string) => {
  console.log('[useMissionTracker] 🌟 HOOK CRIADO/MONTADO', { classId });
  
  const [activeMissions, setActiveMissions] = useState<ClassMissionRecord[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  
  // Tentar inicializar userId IMEDIATAMENTE (síncrono)
  const initialUser = getCurrentUser();
  const [userId, setUserId] = useState<string | null>(initialUser?.id || null);
  
  console.log('[useMissionTracker] 📌 Estado inicial userId:', userId);

  // Inicializar userId imediatamente (não esperar useEffect)
  useEffect(() => {
    console.log('[useMissionTracker] 🚀 useEffect[] iniciado (montagem)');
    const user = getCurrentUser();
    if (user) {
      console.log('[useMissionTracker] 👤 Definindo userId no useEffect:', user.id);
      setUserId(user.id);
    } else {
      console.log('[useMissionTracker] ⚠️ getCurrentUser() retornou null/undefined');
    }
  }, []); // Executar apenas uma vez na montagem

  // Carregar missões ativas da turma
  useEffect(() => {
    const loadMissions = async () => {
      console.log('[useMissionTracker] 🔄 useEffect loadMissions', { classId });
      
      try {
        const user = getCurrentUser();
        if (!user) {
          console.log('[useMissionTracker] ⚠️ Nenhum usuário logado');
          return;
        }

        console.log('[useMissionTracker] 👤 Usuário encontrado:', user.id);
        setUserId(user.id);

        // Se temos classId, carregar missões da turma
        if (classId) {
          const missions = await listClassMissions(classId, { status: 'active' });
          console.log('[useMissionTracker] ✅ Missões carregadas da turma:', missions.length);
          setActiveMissions(missions);
        } else {
          console.log('[useMissionTracker] ℹ️ Sem classId, missões serão carregadas sob demanda');
        }
      } catch (error) {
        console.error('[useMissionTracker] ❌ Erro ao carregar missões:', error);
      }
    };

    loadMissions();
  }, [classId]);

  /**
   * Rastreia uma ação e atualiza o progresso das missões relevantes.
   * 
   * @param missionType - Tipo da missão (chat_interaction, code_execution, etc.)
   * @param increment - Valor a incrementar (padrão: 1)
   * @param metadata - Metadados adicionais para contexto
   */
  const trackAction = useCallback(async (
    missionType: MissionType,
    increment: number = 1,
    metadata?: Record<string, any>
  ) => {
    console.log('[useMissionTracker] 🎬 trackAction iniciado', {
      missionType,
      increment,
      userId,
      isTracking,
      classId,
      activeMissionsCount: activeMissions.length,
      activeMissions: activeMissions.map(m => ({ id: m.id, title: m.title, type: m.type }))
    });

    if (!userId || isTracking) {
      console.log('[useMissionTracker] ⚠️ Abortando trackAction:', {
        reason: !userId ? 'sem userId' : 'já está rastreando'
      });
      return;
    }

    setIsTracking(true);

    try {
      // Se não temos missões ativas localmente, tentar recarregar do servidor
      if (activeMissions.length === 0 && classId) {
        console.log('[useMissionTracker] Nenhuma missão ativa local, recarregando do servidor...');
        try {
          const missions = await listClassMissions(classId, { status: 'active' });
          setActiveMissions(missions);
          console.log('[useMissionTracker] Missões recarregadas:', missions.length);
        } catch (error) {
          console.error('[useMissionTracker] Erro ao recarregar missões:', error);
        }
      }

      // Se ainda não temos missões, buscar missões de todas as turmas do usuário
      let relevantMissions = activeMissions.filter(m => m.type === missionType);
      
      if (relevantMissions.length === 0 && !classId) {
        console.log('[useMissionTracker] Buscando missões de todas as turmas do usuário...');
        try {
          // Buscar matrículas do usuário
          const enrollments = await pb.collection('class_members').getFullList({
            filter: `user = "${userId}"`,
          });
          
          const classIds = enrollments.map(e => e.class);
          console.log('[useMissionTracker] Turmas do usuário:', classIds);
          
          // Buscar missões ativas de todas as turmas
          const allMissions: ClassMissionRecord[] = [];
          for (const cId of classIds) {
            const missions = await listClassMissions(cId, { status: 'active' });
            allMissions.push(...missions);
          }
          
          relevantMissions = allMissions.filter(m => m.type === missionType);
          console.log('[useMissionTracker] Missões encontradas de todas as turmas:', relevantMissions.length);
        } catch (error) {
          console.error('[useMissionTracker] Erro ao buscar missões de todas as turmas:', error);
        }
      }

      if (relevantMissions.length === 0) {
        // Sem missões ativas deste tipo, apenas registrar ação para gamificação
        console.log('[useMissionTracker] Nenhuma missão relevante, registrando ação de gamificação');
        await registerUserAction(userId, missionType, JSON.stringify(metadata || {}));
        return;
      }

      console.log('[useMissionTracker] ✅ Atualizando progresso de', relevantMissions.length, 'missões');

      // Atualizar progresso de cada missão relevante
      for (const mission of relevantMissions) {
        try {
          const progress = await getStudentMissionProgress(mission.id, userId);
          const currentValue = progress?.current_value || 0;
          const newValue = currentValue + increment;

          console.log(`[useMissionTracker] Missão "${mission.title}": ${currentValue} -> ${newValue}/${mission.target_value}`);

          // Verificar se completou a missão
          const isCompleted = newValue >= mission.target_value;

          await updateStudentMissionProgress(
            mission.id,
            userId,
            newValue,
            {
              ...metadata,
              actionType: missionType,
              timestamp: new Date().toISOString(),
              previousValue: currentValue,
            }
          );

          // Registrar ação de gamificação
          await registerUserAction(userId, missionType, `mission_${mission.id}`);

          // Se completou, dar pontos extras e notificar
          if (isCompleted && progress?.status !== 'completed') {
            await registerUserAction(
              userId,
              'complete_mission',
              `mission_${mission.id}_${mission.reward_points}`
            );

            toast.success(
              `🎉 Missão "${mission.title}" completa! +${mission.reward_points} pontos!`,
              {
                duration: 5000,
                icon: '🏆',
              }
            );
          } else if (newValue % 5 === 0 && !isCompleted) {
            // Feedback a cada 5 ações
            toast.success(
              `Progresso: ${newValue}/${mission.target_value} - ${mission.title}`,
              {
                duration: 2000,
              }
            );
          }
        } catch (error) {
          console.error(`Erro ao atualizar progresso da missão ${mission.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Erro ao rastrear ação:', error);
    } finally {
      setIsTracking(false);
    }
  }, [userId, activeMissions, isTracking, classId]);

  /**
   * Rastreia uma mensagem enviada no chat.
   * Atualiza missões do tipo 'chat_interaction'.
   */
  const trackChatMessage = useCallback(async (messageContent: string) => {
    await trackAction('chat_interaction', 1, {
      messageLength: messageContent.length,
      timestamp: new Date().toISOString(),
    });
  }, [trackAction]);

  /**
   * Rastreia uma execução de código.
   * Atualiza missões do tipo 'code_execution'.
   */
  const trackCodeExecution = useCallback(async (language: string, codeLength: number) => {
    console.log('[useMissionTracker] 🎯 trackCodeExecution chamado', { language, codeLength });
    await trackAction('code_execution', 1, {
      language,
      codeLength,
      timestamp: new Date().toISOString(),
    });
    console.log('[useMissionTracker] 🎯 trackCodeExecution finalizado');
  }, [trackAction]);

  /**
   * Rastreia criação ou salvamento de uma anotação textual.
   * Atualiza missões do tipo 'notes_creation'.
   */
  const trackNoteCreation = useCallback(async (noteTitle: string, noteLength: number) => {
    await trackAction('notes_creation', 1, {
      noteTitle,
      noteLength,
      timestamp: new Date().toISOString(),
    });
  }, [trackAction]);

  /**
   * Rastreia interações no quadro branco (desenhos, etc).
   * Atualiza missões do tipo 'whiteboard_interaction'.
   */
  const trackWhiteboardInteraction = useCallback(async (actionType: string, metadata?: Record<string, any>) => {
    await trackAction('whiteboard_interaction', 1, {
      actionType,
      ...metadata,
      timestamp: new Date().toISOString(),
    });
  }, [trackAction]);

  /**
   * Rastreia conclusão de um exercício.
   * Atualiza missões do tipo 'exercise_completion'.
   */
  const trackExerciseCompletion = useCallback(async (exerciseId: string, score?: number) => {
    await trackAction('exercise_completion', 1, {
      exerciseId,
      score,
      timestamp: new Date().toISOString(),
    });
  }, [trackAction]);

  /**
   * Rastreia uma ação customizada.
   * Atualiza missões do tipo 'custom'.
   */
  const trackCustomAction = useCallback(async (actionName: string, metadata?: Record<string, any>) => {
    await trackAction('custom', 1, {
      actionName,
      ...metadata,
      timestamp: new Date().toISOString(),
    });
  }, [trackAction]);

  /**
   * Recarrega as missões ativas.
   * Útil após criar novas missões ou quando o progresso precisa ser atualizado.
   */
  const refreshMissions = useCallback(async () => {
    if (!classId) return;

    try {
      const missions = await listClassMissions(classId, { status: 'active' });
      setActiveMissions(missions);
    } catch (error) {
      console.error('Erro ao recarregar missões:', error);
    }
  }, [classId]);

  return {
    // Estado
    activeMissions,
    isTracking,
    hasActiveMissions: activeMissions.length > 0,

    // Funções de rastreamento específicas
    trackChatMessage,
    trackCodeExecution,
    trackNoteCreation,
    trackWhiteboardInteraction,
    trackExerciseCompletion,
    trackCustomAction,

    // Funções utilitárias
    trackAction,
    refreshMissions,
  };
};
