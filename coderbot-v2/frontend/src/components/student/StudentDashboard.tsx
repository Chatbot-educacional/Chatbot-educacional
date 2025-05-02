import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Users, MessageSquare, CheckCircle, XCircle, Bell } from 'lucide-react';
import { pb } from '@/integrations/pocketbase/client';
import { toast } from '@/components/ui/use-toast';

// Tipos para os dados do aluno
interface Class {
  id: string;
  name: string;
  description: string;
  teacherName: string;
  studentCount: number;
  joinedDate: string;
}

interface Exercise {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  completed: boolean;
  dueDate?: string;
}

interface Invitation {
  id: string;
  classId: string;
  className: string;
  teacherName: string;
  date: string;
}

export const StudentDashboard: React.FC = () => {
  // Estados
  const [classes, setClasses] = useState<Class[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Buscar dados do PocketBase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const currentUser = pb.authStore.model?.id;
        if (!currentUser) {
          throw new Error('Usuário não autenticado');
        }

        // Buscar convites pendentes
        const invitationsResponse = await pb.collection('invitations').getList(1, 50, {
          filter: `email = "${pb.authStore.model?.email}" && status = "pending"`,
          sort: '-created',
          expand: 'class,createdBy'
        });

        const mappedInvitations = invitationsResponse.items.map(item => ({
          id: item.id,
          classId: item.class,
          className: item.expand?.class?.name || 'Turma',
          teacherName: item.expand?.createdBy?.fullName || 'Professor',
          date: new Date(item.created).toLocaleDateString()
        }));
        setInvitations(mappedInvitations);

        // Buscar turmas em que o aluno está inscrito
        const enrollmentsResponse = await pb.collection('class_enrollments').getList(1, 50, {
          filter: `student = "${currentUser}"`,
          expand: 'class,class.createdBy'
        });

        const mappedClasses = await Promise.all(enrollmentsResponse.items.map(async item => {
          // Contar alunos na turma
          const studentsInClass = await pb.collection('class_enrollments').getList(1, 1, {
            filter: `class = "${item.class}"`,
            requestKey: null
          });

          return {
            id: item.class,
            name: item.expand?.class?.name || 'Turma',
            description: item.expand?.class?.description || '',
            teacherName: item.expand?.class?.expand?.createdBy?.fullName || 'Professor',
            studentCount: studentsInClass.totalItems,
            joinedDate: new Date(item.created).toLocaleDateString()
          };
        }));
        setClasses(mappedClasses);

        // Buscar exercícios atribuídos ao aluno
        const exercisesResponse = await pb.collection('student_exercises').getList(1, 50, {
          filter: `student = "${currentUser}"`,
          expand: 'exercise'
        });

        const mappedExercises = exercisesResponse.items.map(item => ({
          id: item.id,
          title: item.expand?.exercise?.title || 'Exercício',
          subject: item.expand?.exercise?.subject || '',
          difficulty: item.expand?.exercise?.difficulty || 'medium',
          completed: item.completed || false,
          dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString() : undefined
        }));
        setExercises(mappedExercises);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar seus dados.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para aceitar convite
  const handleAcceptInvitation = async (invitationId: string, classId: string) => {
    try {
      // Primeiro atualiza o status do convite para 'accepted'
      await pb.collection('invitations').update(invitationId, {
        status: 'accepted'
      });

      // Depois cria uma inscrição do aluno na turma
      await pb.collection('class_enrollments').create({
        class: classId,
        student: pb.authStore.model?.id
      });

      // Atualiza o estado local
      setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));

      // Atualiza a lista de turmas
      const newClass = invitations.find(inv => inv.id === invitationId);
      if (newClass) {
        setClasses(prev => [...prev, {
          id: classId,
          name: newClass.className,
          description: '',
          teacherName: newClass.teacherName,
          studentCount: 0,
          joinedDate: new Date().toLocaleDateString()
        }]);
      }

      toast({
        title: 'Convite aceito',
        description: 'Você agora é membro da turma!',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
      toast({
        title: 'Erro ao aceitar convite',
        description: 'Não foi possível aceitar o convite.',
        variant: 'destructive'
      });
    }
  };

  // Função para recusar convite
  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await pb.collection('invitations').update(invitationId, {
        status: 'rejected'
      });

      setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));

      toast({
        title: 'Convite recusado',
        description: 'O convite foi recusado com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erro ao recusar convite:', error);
      toast({
        title: 'Erro ao recusar convite',
        description: 'Não foi possível recusar o convite.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel do Aluno</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Carregando dados...</p>
        </div>
      ) : (
        <>
          {/* Banner de convites pendentes */}
          {invitations.length > 0 && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-lg">Convites Pendentes</CardTitle>
                </div>
                <CardDescription>
                  Você tem {invitations.length} convite(s) pendente(s) para turmas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turma</TableHead>
                      <TableHead>Professor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitations.map((invitation) => (
                      <TableRow key={invitation.id}>
                        <TableCell className="font-medium">{invitation.className}</TableCell>
                        <TableCell>{invitation.teacherName}</TableCell>
                        <TableCell>{invitation.date}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleAcceptInvitation(invitation.id, invitation.classId)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Aceitar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectInvitation(invitation.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" /> Recusar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="classes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="classes">
                <Users className="mr-2 h-4 w-4" />
                Minhas Turmas
              </TabsTrigger>
              <TabsTrigger value="exercises">
                <BookOpen className="mr-2 h-4 w-4" />
                Exercícios
              </TabsTrigger>
              <TabsTrigger value="progress">
                <MessageSquare className="mr-2 h-4 w-4" />
                Meu Progresso
              </TabsTrigger>
            </TabsList>

            {/* Tab de Turmas */}
            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Turmas</CardTitle>
                  <CardDescription>
                    Turmas em que você está inscrito
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {classes.map((cls) => (
                        <Card key={cls.id} className="overflow-hidden">
                          <CardHeader className="bg-muted/50">
                            <div className="flex justify-between items-start">
                              <CardTitle>{cls.name}</CardTitle>
                              <Badge variant="outline">{cls.studentCount} alunos</Badge>
                            </div>
                            <CardDescription>Prof. {cls.teacherName}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p className="text-sm text-muted-foreground">
                              {cls.description || "Sem descrição."}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between border-t bg-muted/30 p-2">
                            <span className="text-xs text-muted-foreground">
                              Ingressou em {cls.joinedDate}
                            </span>
                            <Button variant="ghost" size="sm">
                              <BookOpen className="h-4 w-4 mr-1" /> Ver Material
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                      {classes.length === 0 && (
                        <div className="col-span-2 text-center py-10">
                          <Users className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium">Nenhuma turma encontrada</h3>
                          <p className="text-sm text-muted-foreground">
                            Você ainda não está inscrito em nenhuma turma.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Exercícios */}
            <TabsContent value="exercises">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Exercícios</CardTitle>
                  <CardDescription>
                    Exercícios atribuídos a você pelos professores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>Lista de exercícios atribuídos</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Dificuldade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prazo</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exercises.map((exercise) => (
                        <TableRow key={exercise.id}>
                          <TableCell className="font-medium">{exercise.title}</TableCell>
                          <TableCell>{exercise.subject}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                exercise.difficulty === 'easy' ? 'outline' : 
                                exercise.difficulty === 'medium' ? 'secondary' : 
                                'destructive'
                              }
                            >
                              {exercise.difficulty === 'easy' ? 'Fácil' : 
                               exercise.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {exercise.completed ? (
                              <Badge variant="success">Concluído</Badge>
                            ) : (
                              <Badge variant="outline">Pendente</Badge>
                            )}
                          </TableCell>
                          <TableCell>{exercise.dueDate || 'Sem prazo'}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Resolver
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {exercises.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">
                            Nenhum exercício atribuído.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab de Progresso */}
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Meu Progresso</CardTitle>
                  <CardDescription>
                    Acompanhe seu progresso nos exercícios e atividades
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p>Estatísticas e gráficos de progresso serão exibidos aqui.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default StudentDashboard; 