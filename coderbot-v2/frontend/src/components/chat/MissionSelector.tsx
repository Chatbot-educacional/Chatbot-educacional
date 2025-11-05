import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Target,
  Trophy,
  BookOpen,
  Code2,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Mission } from '@/hooks/useMissions';

interface MissionSelectorProps {
  missions: Mission[];
  selectedMission: Mission | null;
  onSelectMission: (mission: Mission) => void;
  isLoading?: boolean;
  isCompact?: boolean;
  className?: string;
}

const getMissionIcon = (type: Mission['type']) => {
  const typeStr = type as string;
  switch (typeStr) {
    case 'chat_interaction':
      return MessageSquare;
    case 'code_execution':
      return Code2;
    case 'exercise_completion':
      return Trophy;
    case 'notes_creation':
      return BookOpen;
    case 'whiteboard_interaction':
      return Target;
    case 'custom':
      return Sparkles;
    // Tipos legados para compatibilidade
    case 'quiz':
      return Trophy;
    case 'exercise':
      return Code2;
    case 'project':
      return Target;
    case 'learning_path':
      return BookOpen;
    case 'discussion':
      return MessageSquare;
    default:
      return Target;
  }
};

const getMissionTypeLabel = (type: Mission['type']) => {
  const typeStr = type as string;
  const labels: Record<string, string> = {
    chat_interaction: 'Conversa com IA',
    code_execution: 'Execução de Código',
    exercise_completion: 'Exercícios',
    notes_creation: 'Anotações',
    whiteboard_interaction: 'Quadro Branco',
    custom: 'Personalizada',
    // Tipos legados
    quiz: 'Quiz',
    exercise: 'Exercício',
    project: 'Projeto',
    learning_path: 'Trilha de Aprendizado',
    discussion: 'Discussão',
  };
  return labels[typeStr] || 'Missão';
};

const getDifficultyColor = (difficulty?: Mission['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
};

const getDifficultyLabel = (difficulty?: Mission['difficulty']) => {
  const labels = {
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
  };
  return difficulty ? labels[difficulty] : 'Não definido';
};

// Versão expandida (tela inicial) com agrupamento e scroll melhorado
export const MissionSelectorExpanded: React.FC<MissionSelectorProps> = ({
  missions,
  selectedMission,
  onSelectMission,
  isLoading,
  className,
}) => {
  const [hoveredMission, setHoveredMission] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  if (isLoading) {
    return (
      <div className={cn('flex flex-col items-center justify-center p-8 space-y-4', className)}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Carregando missões...</p>
      </div>
    );
  }

  if (missions.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center p-8 space-y-4 text-center', className)}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Nenhuma missão disponível</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Seu professor ainda não criou nenhuma missão para esta turma. 
            Volte mais tarde ou entre em contato com seu professor.
          </p>
        </div>
      </div>
    );
  }

  // Agrupar missões por tipo
  const missionsByType = missions.reduce((acc, mission) => {
    const type = mission.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(mission);
    return acc;
  }, {} as Record<string, Mission[]>);

  // Tipos únicos disponíveis
  const availableTypes = Object.keys(missionsByType);
  
  // Missões filtradas
  const filteredMissions = selectedType === 'all' 
    ? missions 
    : missionsByType[selectedType] || [];

  return (
    <div className={cn('flex flex-col w-full max-w-6xl mx-auto h-full', className)}>
      {/* Header Compacto */}
      <div className="text-center mb-6 space-y-2 flex-shrink-0">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg mb-3">
          <Target className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Escolha sua Missão
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {missions.length} {missions.length === 1 ? 'missão disponível' : 'missões disponíveis'}
        </p>
      </div>

      {/* Filtros por tipo (se houver mais de um tipo) */}
      {availableTypes.length > 1 && (
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            <button
              onClick={() => setSelectedType('all')}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              Todas ({missions.length})
            </button>
            {availableTypes.map((type) => {
              const Icon = getMissionIcon(type as Mission['type']);
              const count = missionsByType[type].length;
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap',
                    selectedType === type
                      ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {getMissionTypeLabel(type as Mission['type'])} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid de Missões com Scroll Otimizado */}
      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {filteredMissions.map((mission) => {
            const Icon = getMissionIcon(mission.type);
            const isHovered = hoveredMission === mission.id;
            const isSelected = selectedMission?.id === mission.id;

            return (
              <button
                key={mission.id}
                onClick={() => onSelectMission(mission)}
                onMouseEnter={() => setHoveredMission(mission.id)}
                onMouseLeave={() => setHoveredMission(null)}
                className={cn(
                  'group relative p-5 rounded-xl border-2 transition-all duration-300 text-left',
                  'hover:shadow-lg hover:scale-[1.02]',
                  'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950',
                  isSelected
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20 ring-2 ring-purple-100 dark:ring-purple-900/30'
                    : 'border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
                )}
              >
                {/* Badge de selecionado */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg z-10">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Header do card */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0',
                    'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20',
                    isHovered && 'scale-110 rotate-3'
                  )}>
                    <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-tight">
                      {mission.title}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {mission.difficulty && (
                        <Badge className={cn('text-xs px-2 py-0', getDifficultyColor(mission.difficulty))}>
                          {getDifficultyLabel(mission.difficulty)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                  {mission.description}
                </p>

                {/* Footer com informações */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {!!mission.estimatedDuration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{mission.estimatedDuration}min</span>
                    </div>
                  )}
                  {mission.topics && mission.topics.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      <span>{mission.topics.length} tópico{mission.topics.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>

                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-transparent group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer com dica */}
      <div className="mt-4 text-center flex-shrink-0">
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-purple-500" />
          Clique em uma missão para começar
        </p>
      </div>
    </div>
  );
};

// Versão compacta (dropdown lateral) com agrupamento
export const MissionSelectorCompact: React.FC<MissionSelectorProps> = ({
  missions,
  selectedMission,
  onSelectMission,
  isLoading,
  className,
}) => {
  console.log('[MissionSelectorCompact] 📦 Props recebidas:', {
    missionsCount: missions.length,
    isLoading,
    selectedMission: selectedMission?.title,
    missions: missions.map(m => ({ id: m.id, title: m.title }))
  });

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className={cn('w-full', className)}>
          <SelectValue placeholder="Carregando..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (missions.length === 0) {
    return (
      <Select disabled>
        <SelectTrigger className={cn('w-full', className)}>
          <SelectValue placeholder="Nenhuma missão disponível" />
        </SelectTrigger>
      </Select>
    );
  }

  // Agrupar missões por tipo
  const missionsByType = missions.reduce((acc, mission) => {
    const type = mission.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(mission);
    return acc;
  }, {} as Record<string, Mission[]>);

  // Ordenar tipos para exibição consistente
  const sortedTypes = Object.keys(missionsByType).sort();

  return (
    <Select
      value={selectedMission?.id}
      onValueChange={(missionId) => {
        const mission = missions.find(m => m.id === missionId);
        if (mission) onSelectMission(mission);
      }}
    >
      <SelectTrigger className={cn('w-full', className)}>
        <SelectValue placeholder="Selecione uma missão">
          {selectedMission && (
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = getMissionIcon(selectedMission.type);
                return <Icon className="w-4 h-4" />;
              })()}
              <span className="truncate">{selectedMission.title}</span>
              {selectedMission.difficulty && (
                <Badge className={cn('text-xs ml-auto', getDifficultyColor(selectedMission.difficulty))}>
                  {getDifficultyLabel(selectedMission.difficulty)}
                </Badge>
              )}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        {sortedTypes.length > 1 ? (
          // Se houver múltiplos tipos, agrupar
          sortedTypes.map((type) => (
            <SelectGroup key={type}>
              <SelectLabel className="flex items-center gap-2 text-xs font-semibold">
                {(() => {
                  const Icon = getMissionIcon(type as Mission['type']);
                  return <Icon className="w-3.5 h-3.5" />;
                })()}
                {getMissionTypeLabel(type as Mission['type'])} ({missionsByType[type].length})
              </SelectLabel>
              {missionsByType[type].map((mission) => {
                const Icon = getMissionIcon(mission.type);
                return (
                  <SelectItem key={mission.id} value={mission.id}>
                    <div className="flex items-center gap-2 w-full">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate flex-1">{mission.title}</span>
                      {mission.difficulty && (
                        <Badge className={cn('text-xs ml-2', getDifficultyColor(mission.difficulty))}>
                          {getDifficultyLabel(mission.difficulty)[0]}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          ))
        ) : (
          // Se houver apenas um tipo, não agrupar
          <SelectGroup>
            <SelectLabel>Missões Disponíveis ({missions.length})</SelectLabel>
            {missions.map((mission) => {
              const Icon = getMissionIcon(mission.type);
              return (
                <SelectItem key={mission.id} value={mission.id}>
                  <div className="flex items-center gap-2 w-full">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate flex-1">{mission.title}</span>
                    {mission.difficulty && (
                      <Badge className={cn('text-xs ml-2', getDifficultyColor(mission.difficulty))}>
                        {getDifficultyLabel(mission.difficulty)[0]}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
};

// Componente principal que alterna entre os dois modos
export const MissionSelector: React.FC<MissionSelectorProps> = (props) => {
  if (props.isCompact) {
    return <MissionSelectorCompact {...props} />;
  }
  return <MissionSelectorExpanded {...props} />;
};
