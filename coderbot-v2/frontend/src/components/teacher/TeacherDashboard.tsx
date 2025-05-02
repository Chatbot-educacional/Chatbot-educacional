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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  BookOpen, 
  Code, 
  MessageSquare, 
  Users, 
  Mail, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';
import { pb } from '@/integrations/pocketbase/client';
import { toast } from '@/components/ui/use-toast';

// Tipos para os dados do professor
interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActivity: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
}

interface Feedback {
  id: string;
  studentId: string;
  studentName: string;
  content: string;
  date: string;
  read: boolean;
}

// Novos tipos para turmas e convites
interface Class {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  created: string;
  studentCount: number;
}

interface Invitation {
  id: string;
  classId: string;
  className: string;
  email: string;
  status: 'pending' | 'accepted' | 'rejected';
  created: string;
}

export const TeacherDashboard: React.FC = () => {
  // Estados
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Novos estados para turmas
  const [classes, setClasses] = useState<Class[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isInvitingStudent, setIsInvitingStudent] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  
  // Estado para formulários
  const [newExercise, setNewExercise] = useState<Omit<Exercise, 'id'>>({
    title: '',
    description: '',
    difficulty: 'medium',
    subject: ''
  });
  
  // Novo estado para o formulário de turma
  const [newClass, setNewClass] = useState({
    name: '',
    description: ''
  });
  
  // Novo estado para o formulário de convite
  const [newInvitation, setNewInvitation] = useState({
    email: '',
    classId: ''
  });
  
  const [isAddingExercise, setIsAddingExercise] = useState(false);

  // Buscar dados do PocketBase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Buscar estudantes
        const studentsResponse = await pb.collection('users').getList(1, 50, {
          filter: 'role = "student"',
          sort: '-created'
        });
        
        const mappedStudents = studentsResponse.items.map(item => ({
          id: item.id,
          name: item.fullName || item.username,
          email: item.email,
          progress: Math.floor(Math.random() * 100), // Simulado por enquanto
          lastActivity: new Date(item.updated).toLocaleDateString()
        }));
        setStudents(mappedStudents);
        
        // Buscar exercícios
        const exercisesResponse = await pb.collection('exercises').getList(1, 50, {
          sort: '-created'
        });
        
        const mappedExercises = exercisesResponse.items.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          difficulty: item.difficulty,
          subject: item.subject
        }));
        setExercises(mappedExercises);
        
        // Buscar feedbacks
        const feedbacksResponse = await pb.collection('feedbacks').getList(1, 50, {
          sort: '-created',
          expand: 'student'
        });
        
        const mappedFeedbacks = feedbacksResponse.items.map(item => ({
          id: item.id,
          studentId: item.student,
          studentName: item.expand?.student?.fullName || 'Estudante',
          content: item.content,
          date: new Date(item.created).toLocaleDateString(),
          read: item.read
        }));
        setFeedbacks(mappedFeedbacks);
        
        // Novo código para buscar turmas
        const classesResponse = await pb.collection('classes').getList(1, 50, {
          filter: `createdBy = "${pb.authStore.model?.id}"`,
          sort: '-created'
        });
        
        const mappedClasses = await Promise.all(classesResponse.items.map(async item => {
          // Contar alunos na turma
          const studentsInClass = await pb.collection('class_enrollments').getList(1, 1, {
            filter: `class = "${item.id}"`,
            requestKey: null
          });
          
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            createdBy: item.createdBy,
            created: new Date(item.created).toLocaleDateString(),
            studentCount: studentsInClass.totalItems
          };
        }));
        setClasses(mappedClasses);
        
        // Buscar convites
        const invitationsResponse = await pb.collection('invitations').getList(1, 50, {
          filter: `createdBy = "${pb.authStore.model?.id}"`,
          sort: '-created',
          expand: 'class'
        });
        
        const mappedInvitations = invitationsResponse.items.map(item => ({
          id: item.id,
          classId: item.class,
          className: item.expand?.class?.name || 'Turma',
          email: item.email,
          status: item.status,
          created: new Date(item.created).toLocaleDateString()
        }));
        setInvitations(mappedInvitations);
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar os dados do professor.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Função para adicionar novo exercício
  const handleAddExercise = async () => {
    try {
      const response = await pb.collection('exercises').create({
        title: newExercise.title,
        description: newExercise.description,
        difficulty: newExercise.difficulty,
        subject: newExercise.subject,
        createdBy: pb.authStore.model?.id
      });
      
      setExercises(prev => [
        ...prev, 
        {
          id: response.id,
          ...newExercise
        }
      ]);
      
      setNewExercise({
        title: '',
        description: '',
        difficulty: 'medium',
        subject: ''
      });
      
      setIsAddingExercise(false);
      
      toast({
        title: 'Exercício adicionado',
        description: 'O exercício foi adicionado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao adicionar exercício:', error);
      toast({
        title: 'Erro ao adicionar exercício',
        description: 'Não foi possível adicionar o exercício.',
        variant: 'destructive'
      });
    }
  };
  
  // Função para marcar feedback como lido
  const markFeedbackAsRead = async (id: string) => {
    try {
      await pb.collection('feedbacks').update(id, {
        read: true
      });
      
      setFeedbacks(prev => 
        prev.map(feedback => 
          feedback.id === id ? { ...feedback, read: true } : feedback
        )
      );
      
      toast({
        title: 'Feedback atualizado',
        description: 'O feedback foi marcado como lido.'
      });
    } catch (error) {
      console.error('Erro ao atualizar feedback:', error);
      toast({
        title: 'Erro ao atualizar feedback',
        description: 'Não foi possível marcar o feedback como lido.',
        variant: 'destructive'
      });
    }
  };
  
  // Função para excluir exercício
  const deleteExercise = async (id: string) => {
    try {
      await pb.collection('exercises').delete(id);
      
      setExercises(prev => 
        prev.filter(exercise => exercise.id !== id)
      );
      
      toast({
        title: 'Exercício excluído',
        description: 'O exercício foi excluído com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao excluir exercício:', error);
      toast({
        title: 'Erro ao excluir exercício',
        description: 'Não foi possível excluir o exercício.',
        variant: 'destructive'
      });
    }
  };
  
  // Nova função para criar turma
  const handleCreateClass = async () => {
    try {
      const response = await pb.collection('classes').create({
        name: newClass.name,
        description: newClass.description,
        createdBy: pb.authStore.model?.id
      });
      
      setClasses(prev => [
        ...prev, 
        {
          id: response.id,
          name: newClass.name,
          description: newClass.description,
          createdBy: pb.authStore.model?.id as string,
          created: new Date().toLocaleDateString(),
          studentCount: 0
        }
      ]);
      
      setNewClass({
        name: '',
        description: ''
      });
      
      setIsAddingClass(false);
      
      toast({
        title: 'Turma criada',
        description: 'A turma foi criada com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      toast({
        title: 'Erro ao criar turma',
        description: 'Não foi possível criar a turma.',
        variant: 'destructive'
      });
    }
  };
  
  // Nova função para enviar convite
  const handleSendInvitation = async () => {
    try {
      const response = await pb.collection('invitations').create({
        class: newInvitation.classId,
        email: newInvitation.email,
        status: 'pending',
        createdBy: pb.authStore.model?.id
      });
      
      const selectedClass = classes.find(c => c.id === newInvitation.classId);
      
      setInvitations(prev => [
        ...prev, 
        {
          id: response.id,
          classId: newInvitation.classId,
          className: selectedClass?.name || 'Turma',
          email: newInvitation.email,
          status: 'pending',
          created: new Date().toLocaleDateString()
        }
      ]);
      
      setNewInvitation({
        email: '',
        classId: newInvitation.classId
      });
      
      toast({
        title: 'Convite enviado',
        description: `Convite enviado para ${newInvitation.email}`
      });
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast({
        title: 'Erro ao enviar convite',
        description: 'Não foi possível enviar o convite.',
        variant: 'destructive'
      });
    }
  };
  
  // Nova função para cancelar convite
  const handleCancelInvitation = async (id: string) => {
    try {
      await pb.collection('invitations').delete(id);
      
      setInvitations(prev => 
        prev.filter(invitation => invitation.id !== id)
      );
      
      toast({
        title: 'Convite cancelado',
        description: 'O convite foi cancelado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao cancelar convite:', error);
      toast({
        title: 'Erro ao cancelar convite',
        description: 'Não foi possível cancelar o convite.',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Painel do Professor</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Carregando dados...</p>
        </div>
      ) : (
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">
              <User className="mr-2 h-4 w-4" />
              Alunos
            </TabsTrigger>
            <TabsTrigger value="classes">
              <Users className="mr-2 h-4 w-4" />
              Turmas
              {invitations.filter(i => i.status === 'pending').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {invitations.filter(i => i.status === 'pending').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="exercises">
              <BookOpen className="mr-2 h-4 w-4" />
              Exercícios
            </TabsTrigger>
            <TabsTrigger value="feedbacks">
              <MessageSquare className="mr-2 h-4 w-4" />
              Feedbacks
              {feedbacks.filter(f => !f.read).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {feedbacks.filter(f => !f.read).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          {/* Tab de Alunos */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Seus Alunos</CardTitle>
                <CardDescription>
                  Visualize o progresso e atividades recentes dos seus alunos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>Lista de alunos ativos</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Progresso</TableHead>
                      <TableHead>Última Atividade</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{student.progress}%</span>
                        </TableCell>
                        <TableCell>{student.lastActivity}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4 mr-1" /> Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {students.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          Nenhum aluno encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Nova Tab de Turmas */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Suas Turmas</CardTitle>
                    <CardDescription>
                      Gerencie suas turmas e convide alunos para participar.
                    </CardDescription>
                  </div>
                  <Dialog open={isAddingClass} onOpenChange={setIsAddingClass}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Nova Turma
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Criar Nova Turma</DialogTitle>
                        <DialogDescription>
                          Crie uma nova turma para organizar seus alunos.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="className" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="className"
                            value={newClass.name}
                            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                            className="col-span-3"
                            placeholder="Nome da turma (ex: Turma A, Programação 101)"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="classDescription" className="text-right pt-2">
                            Descrição
                          </Label>
                          <Textarea
                            id="classDescription"
                            value={newClass.description}
                            onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                            className="col-span-3"
                            placeholder="Descrição da turma"
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingClass(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateClass}>Criar Turma</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="classes" className="w-full">
                  <TabsList>
                    <TabsTrigger value="classes">Turmas</TabsTrigger>
                    <TabsTrigger value="invitations">
                      Convites
                      {invitations.filter(i => i.status === 'pending').length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {invitations.filter(i => i.status === 'pending').length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="classes">
                    <ScrollArea className="h-[400px] pr-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {classes.map((cls) => (
                          <Card key={cls.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50">
                              <div className="flex justify-between items-start">
                                <CardTitle>{cls.name}</CardTitle>
                                <Badge variant="outline">{cls.studentCount} alunos</Badge>
                              </div>
                              <CardDescription>Criada em {cls.created}</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-4">
                              <p className="text-sm text-muted-foreground">
                                {cls.description || "Sem descrição."}
                              </p>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t bg-muted/30 p-2">
                              <Button variant="ghost" size="sm">
                                <Users className="h-4 w-4 mr-1" /> Ver Alunos
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => {
                                      setSelectedClassId(cls.id);
                                      setNewInvitation({...newInvitation, classId: cls.id});
                                    }}
                                  >
                                    <Mail className="h-4 w-4 mr-1" /> Convidar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Convidar Aluno</DialogTitle>
                                    <DialogDescription>
                                      Envie um convite por email para adicionar um aluno à turma: {cls.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="inviteEmail" className="text-right">
                                        Email
                                      </Label>
                                      <Input
                                        id="inviteEmail"
                                        type="email"
                                        value={newInvitation.email}
                                        onChange={(e) => setNewInvitation({ ...newInvitation, email: e.target.value })}
                                        className="col-span-3"
                                        placeholder="Email do aluno"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsInvitingStudent(false)}>
                                      Cancelar
                                    </Button>
                                    <Button onClick={handleSendInvitation}>Enviar Convite</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </CardFooter>
                          </Card>
                        ))}
                        {classes.length === 0 && (
                          <div className="col-span-2 text-center py-10">
                            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">Nenhuma turma encontrada</h3>
                            <p className="text-sm text-muted-foreground">
                              Clique em "Nova Turma" para começar a organizar seus alunos.
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="invitations">
                    <div className="mt-4">
                      <Table>
                        <TableCaption>Lista de convites enviados</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Turma</TableHead>
                            <TableHead>Data de Envio</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invitations.map((invitation) => (
                            <TableRow key={invitation.id}>
                              <TableCell className="font-medium">{invitation.email}</TableCell>
                              <TableCell>{invitation.className}</TableCell>
                              <TableCell>{invitation.created}</TableCell>
                              <TableCell>
                                {invitation.status === 'pending' && (
                                  <Badge variant="outline">Pendente</Badge>
                                )}
                                {invitation.status === 'accepted' && (
                                  <Badge variant="success">Aceito</Badge>
                                )}
                                {invitation.status === 'rejected' && (
                                  <Badge variant="destructive">Recusado</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {invitation.status === 'pending' && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive"
                                    onClick={() => handleCancelInvitation(invitation.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" /> Cancelar
                                  </Button>
                                )}
                                {invitation.status !== 'pending' && (
                                  <span className="text-xs text-muted-foreground">
                                    Nenhuma ação disponível
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                          {invitations.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center">
                                Nenhum convite enviado.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab de Exercícios */}
          <TabsContent value="exercises">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Exercícios</CardTitle>
                    <CardDescription>
                      Gerencie os exercícios disponíveis para seus alunos.
                    </CardDescription>
                  </div>
                  <Dialog open={isAddingExercise} onOpenChange={setIsAddingExercise}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" /> Novo Exercício
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Exercício</DialogTitle>
                        <DialogDescription>
                          Crie um novo exercício para seus alunos resolverem.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Título
                          </Label>
                          <Input
                            id="title"
                            value={newExercise.title}
                            onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                            className="col-span-3"
                            placeholder="Título do exercício"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Assunto
                          </Label>
                          <Input
                            id="subject"
                            value={newExercise.subject}
                            onChange={(e) => setNewExercise({ ...newExercise, subject: e.target.value })}
                            className="col-span-3"
                            placeholder="Ex: Python, Algoritmos, etc."
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="difficulty" className="text-right">
                            Dificuldade
                          </Label>
                          <select
                            id="difficulty"
                            value={newExercise.difficulty}
                            onChange={(e) => setNewExercise({ 
                              ...newExercise, 
                              difficulty: e.target.value as 'easy' | 'medium' | 'hard' 
                            })}
                            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="easy">Fácil</option>
                            <option value="medium">Médio</option>
                            <option value="hard">Difícil</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="description" className="text-right pt-2">
                            Descrição
                          </Label>
                          <Textarea
                            id="description"
                            value={newExercise.description}
                            onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                            className="col-span-3"
                            placeholder="Descrição detalhada do exercício"
                            rows={5}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingExercise(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleAddExercise}>Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exercises.map((exercise) => (
                      <Card key={exercise.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{exercise.title}</CardTitle>
                              <CardDescription>{exercise.subject}</CardDescription>
                            </div>
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
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {exercise.description}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t bg-muted/30 p-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive"
                            onClick={() => deleteExercise(exercise.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Excluir
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    {exercises.length === 0 && (
                      <div className="col-span-2 text-center py-10">
                        <Code className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum exercício encontrado</h3>
                        <p className="text-sm text-muted-foreground">
                          Clique em "Novo Exercício" para começar a criar conteúdo.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab de Feedbacks */}
          <TabsContent value="feedbacks">
            <Card>
              <CardHeader>
                <CardTitle>Feedbacks dos Alunos</CardTitle>
                <CardDescription>
                  Veja o que seus alunos estão dizendo sobre o conteúdo e a plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {feedbacks.map((feedback) => (
                      <Card key={feedback.id} className={feedback.read ? 'opacity-70' : ''}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <User className="h-5 w-5 mr-2 text-muted-foreground" />
                              <CardTitle className="text-base">{feedback.studentName}</CardTitle>
                            </div>
                            {!feedback.read && (
                              <Badge variant="secondary">Novo</Badge>
                            )}
                          </div>
                          <CardDescription>{feedback.date}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            {feedback.content}
                          </p>
                        </CardContent>
                        {!feedback.read && (
                          <CardFooter className="pt-0">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markFeedbackAsRead(feedback.id)}
                            >
                              Marcar como lido
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                    {feedbacks.length === 0 && (
                      <div className="text-center py-10">
                        <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhum feedback recebido</h3>
                        <p className="text-sm text-muted-foreground">
                          Não há feedbacks de alunos para exibir no momento.
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TeacherDashboard;
