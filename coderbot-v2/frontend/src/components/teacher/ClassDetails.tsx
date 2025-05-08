import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  User,
  Mail,
  BookOpen,
  Calendar,
  Settings,
  Trash2,
  Plus,
  SendIcon,
  FileText,
  CheckCircle
} from 'lucide-react';
import { pb } from '@/integrations/pocketbase/client';
import { toast } from '@/components/ui/use-toast';

// Tipos
interface ClassInfo {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  created: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  joinDate: string;
}

interface Exercise {
  id: string;
  title: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Assignment {
  id: string;
  exerciseId: string;
  exerciseTitle: string;
  assignedDate: string;
  dueDate: string;
  totalStudents: number;
  completedCount: number;
}

interface InvitationState {
  email: string;
}

export const ClassDetails: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  
  // Estados
  const [classInfo, setClassInfo] = useState<ClassInfo | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  
  const [invitation, setInvitation] = useState<InvitationState>({
    email: ''
  });
  
  const [newAssignment, setNewAssignment] = useState({
    exerciseId: '',
    dueDate: ''
  });
  
  // Buscar dados da turma
  useEffect(() => {
    const fetchClassData = async () => {
      if (!classId) return;
      setIsLoading(true);
      
      try {
        // Buscar informações da turma
        const classData = await pb.collection('classes').getOne(classId);
        setClassInfo({
          id: classData.id,
          name: classData.name,
          description: classData.description,
          createdBy: classData.createdBy,
          created: new Date(classData.created).toLocaleDateString()
        });
        
        // Buscar alunos inscritos na turma
        const enrollments = await pb.collection('class_enrollments').getList(1, 100, {
          filter: `class = "${classId}"`,
          expand: 'student'
        });
        
        const mappedStudents = enrollments.items.map(item => ({
          id: item.student,
          name: item.expand?.student?.name || item.expand?.student?.username || 'Aluno',
          email: item.expand?.student?.email || '',
          progress: Math.floor(Math.random() * 100), // Simulado por enquanto
          joinDate: new Date(item.created).toLocaleDateString()
        }));
        setStudents(mappedStudents);
        
        // Buscar exercícios criados pelo professor
        const exercisesData = await pb.collection('exercises').getList(1, 100, {
          filter: `createdBy = "${pb.authStore.model?.id}"`,
          sort: '-created'
        });
        
        const mappedExercises = exercisesData.items.map(item => ({
          id: item.id,
          title: item.title,
          subject: item.subject,
          difficulty: item.difficulty
        }));
        setExercises(mappedExercises);
        
        // Buscar atribuições de exercícios para esta turma
        const assignmentsData = await pb.collection('class_assignments').getList(1, 100, {
          filter: `class = "${classId}"`,
          expand: 'exercise'
        });
        
        const mappedAssignments = await Promise.all(assignmentsData.items.map(async item => {
          // Contar quantos alunos completaram
          const completedCount = await pb.collection('student_exercises').getList(1, 1, {
            filter: `assignment = "${item.id}" && completed = true`,
            requestKey: null
          });
          
          return {
            id: item.id,
            exerciseId: item.exercise,
            exerciseTitle: item.expand?.exercise?.title || 'Exercício',
            assignedDate: new Date(item.created).toLocaleDateString(),
            dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString() : 'Sem prazo',
            totalStudents: students.length,
            completedCount: completedCount.totalItems
          };
        }));
        setAssignments(mappedAssignments);
        
      } catch (error) {
        console.error('Erro ao buscar dados da turma:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar as informações da turma.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClassData();
  }, [classId]);
  
  // Função para convidar aluno para a turma
  const handleInviteStudent = async () => {
    try {
      await pb.collection('invitations').create({
        class: classId,
        email: invitation.email,
        status: 'pending',
        createdBy: pb.authStore.model?.id
      });
      
      setInvitation({ email: '' });
      setIsInviting(false);
      
      toast({
        title: 'Convite enviado',
        description: `Convite enviado para ${invitation.email}`
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
  
  // Função para atribuir exercício à turma
  const handleAssignExercise = async () => {
    try {
      // Criar a atribuição para a turma
      const assignment = await pb.collection('class_assignments').create({
        class: classId,
        exercise: newAssignment.exerciseId,
        dueDate: newAssignment.dueDate ? new Date(newAssignment.dueDate).toISOString() : null,
        createdBy: pb.authStore.model?.id
      });
      
      // Para cada aluno da turma, criar um registro de exercício
      for (const student of students) {
        await pb.collection('student_exercises').create({
          student: student.id,
          exercise: newAssignment.exerciseId,
          assignment: assignment.id,
          completed: false,
          dueDate: newAssignment.dueDate ? new Date(newAssignment.dueDate).toISOString() : null
        });
      }
      
      // Atualizar a lista de atribuições
      const selectedExercise = exercises.find(ex => ex.id === newAssignment.exerciseId);
      
      setAssignments(prev => [
        ...prev,
        {
          id: assignment.id,
          exerciseId: newAssignment.exerciseId,
          exerciseTitle: selectedExercise?.title || 'Exercício',
          assignedDate: new Date().toLocaleDateString(),
          dueDate: newAssignment.dueDate ? new Date(newAssignment.dueDate).toLocaleDateString() : 'Sem prazo',
          totalStudents: students.length,
          completedCount: 0
        }
      ]);
      
      setNewAssignment({
        exerciseId: '',
        dueDate: ''
      });
      
      toast({
        title: 'Exercício atribuído',
        description: 'O exercício foi atribuído para todos os alunos da turma.'
      });
    } catch (error) {
      console.error('Erro ao atribuir exercício:', error);
      toast({
        title: 'Erro ao atribuir exercício',
        description: 'Não foi possível atribuir o exercício à turma.',
        variant: 'destructive'
      });
    }
  };
  
  // Função para remover aluno da turma
  const handleRemoveStudent = async (studentId: string) => {
    try {
      // Buscar o ID da inscrição
      const enrollmentResponse = await pb.collection('class_enrollments').getList(1, 1, {
        filter: `class = "${classId}" && student = "${studentId}"`
      });
      
      if (enrollmentResponse.items.length > 0) {
        await pb.collection('class_enrollments').delete(enrollmentResponse.items[0].id);
        
        // Remover exercícios atribuídos ao aluno nesta turma
        const studentExercises = await pb.collection('student_exercises').getList(1, 100, {
          filter: `student = "${studentId}"`,
          expand: 'assignment'
        });
        
        for (const exercise of studentExercises.items) {
          if (exercise.expand?.assignment?.class === classId) {
            await pb.collection('student_exercises').delete(exercise.id);
          }
        }
        
        setStudents(prev => prev.filter(student => student.id !== studentId));
        
        toast({
          title: 'Aluno removido',
          description: 'O aluno foi removido da turma com sucesso.'
        });
      }
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
      toast({
        title: 'Erro ao remover aluno',
        description: 'Não foi possível remover o aluno da turma.',
        variant: 'destructive'
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container flex justify-center items-center h-64">
        <p>Carregando dados da turma...</p>
      </div>
    );
  }
  
  if (!classInfo) {
    return (
      <div className="container p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Turma não encontrada</h2>
          <Button onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{classInfo.name}</h1>
          <p className="text-muted-foreground">Criada em {classInfo.created}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Sobre a Turma</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{classInfo.description || "Sem descrição."}</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">
            <User className="mr-2 h-4 w-4" />
            Alunos
          </TabsTrigger>
          <TabsTrigger value="assignments">
            <BookOpen className="mr-2 h-4 w-4" />
            Exercícios
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>
        
        {/* Tab de Alunos */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Alunos da Turma</CardTitle>
                  <CardDescription>
                    Gerencie os alunos inscritos nesta turma
                  </CardDescription>
                </div>
                <Dialog open={isInviting} onOpenChange={setIsInviting}>
                  <DialogTrigger asChild>
                    <Button>
                      <Mail className="mr-2 h-4 w-4" /> Convidar Aluno
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Convidar Aluno</DialogTitle>
                      <DialogDescription>
                        Envie um convite por email para adicionar um aluno à turma
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
                          value={invitation.email}
                          onChange={(e) => setInvitation({ email: e.target.value })}
                          className="col-span-3"
                          placeholder="Email do aluno"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsInviting(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleInviteStudent}>Enviar Convite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>{students.length} alunos inscritos</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Data de Ingresso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs whitespace-nowrap">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-1" /> Detalhes
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleRemoveStudent(student.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remover
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {students.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Nenhum aluno inscrito nesta turma.
                        <div className="mt-2">
                          <Button variant="outline" size="sm" onClick={() => setIsInviting(true)}>
                            <Mail className="mr-2 h-4 w-4" /> Convidar Aluno
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Exercícios */}
        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Exercícios da Turma</CardTitle>
                  <CardDescription>
                    Atribua exercícios para os alunos resolverem
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Atribuir Exercício
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Atribuir Exercício</DialogTitle>
                      <DialogDescription>
                        Selecione um exercício para atribuir a todos os alunos desta turma
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="exerciseSelect" className="text-right">
                          Exercício
                        </Label>
                        <select
                          id="exerciseSelect"
                          value={newAssignment.exerciseId}
                          onChange={(e) => setNewAssignment({ ...newAssignment, exerciseId: e.target.value })}
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="">Selecione um exercício</option>
                          {exercises.map(exercise => (
                            <option key={exercise.id} value={exercise.id}>
                              {exercise.title} ({exercise.subject})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="dueDate" className="text-right">
                          Prazo
                        </Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newAssignment.dueDate}
                          onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">
                        Cancelar
                      </Button>
                      <Button onClick={handleAssignExercise} disabled={!newAssignment.exerciseId}>
                        Atribuir
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Exercícios atribuídos à turma</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Exercício</TableHead>
                    <TableHead>Data de Atribuição</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Progresso</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.exerciseTitle}</TableCell>
                      <TableCell>{assignment.assignedDate}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${assignment.totalStudents ? (assignment.completedCount / assignment.totalStudents) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs whitespace-nowrap">
                            {assignment.completedCount}/{assignment.totalStudents}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" /> Ver Respostas
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {assignments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        Nenhum exercício atribuído a esta turma.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Configurações */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Turma</CardTitle>
              <CardDescription>
                Ajuste as configurações e informações da turma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="className">Nome da Turma</Label>
                  <Input
                    id="className"
                    value={classInfo.name}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="classDescription">Descrição</Label>
                  <Input
                    id="classDescription"
                    value={classInfo.description}
                    className="mt-1"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-2 text-destructive">Zona de Perigo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    As seguintes ações não podem ser desfeitas:
                  </p>
                  <div className="flex gap-4">
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir Turma
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassDetails; 