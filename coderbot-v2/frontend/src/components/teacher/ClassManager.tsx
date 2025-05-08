
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { School, Plus, Users, BookOpen, Calendar, Edit, Trash2, Eye, UserPlus } from "lucide-react";

type Class = {
  id: number;
  name: string;
  description: string;
  studentCount: number;
  activitiesCount: number;
  schedule: string;
};

export const ClassManager = () => {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      name: "Desenvolvimento Web",
      description: "HTML, CSS e JavaScript para iniciantes",
      studentCount: 18,
      activitiesCount: 12,
      schedule: "Segunda e Quarta, 19h-21h"
    },
    {
      id: 2,
      name: "React Frontend",
      description: "Desenvolvimento de aplicações modernas com React",
      studentCount: 15,
      activitiesCount: 8,
      schedule: "Terça e Quinta, 19h-21h"
    },
    {
      id: 3,
      name: "Backend com Node.js",
      description: "Criação de APIs e servidores com Node.js",
      studentCount: 12,
      activitiesCount: 10,
      schedule: "Sábado, 9h-12h"
    }
  ]);

  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
    schedule: ""
  });

  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const handleAddClass = () => {
    const newId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) + 1 : 1;
    
    setClasses([...classes, {
      id: newId,
      name: newClass.name,
      description: newClass.description,
      studentCount: 0,
      activitiesCount: 0,
      schedule: newClass.schedule
    }]);
    
    setNewClass({
      name: "",
      description: "",
      schedule: ""
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <School className="h-5 w-5 text-education-primary" />
          Gerenciamento de Turmas
        </h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Turma
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Turma</DialogTitle>
              <DialogDescription>
                Adicione uma nova turma ao sistema. Você poderá adicionar alunos e atividades depois.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Turma</Label>
                <Input 
                  id="name" 
                  value={newClass.name} 
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})} 
                  placeholder="Ex: Desenvolvimento Web"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={newClass.description} 
                  onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                  placeholder="Breve descrição da turma e seus objetivos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Horário</Label>
                <Input 
                  id="schedule" 
                  value={newClass.schedule} 
                  onChange={(e) => setNewClass({...newClass, schedule: e.target.value})}
                  placeholder="Ex: Segunda e Quarta, 19h-21h"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddClass}>Criar Turma</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{classItem.name}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Detalhes da Turma</DialogTitle>
                        <DialogDescription>
                          {classItem.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Horário:</span>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {classItem.schedule}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-2">Alunos Matriculados</h3>
                          <div className="border rounded-lg overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[250px]">Nome</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead className="text-right">Progresso</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {classItem.id === 1 ? (
                                  [
                                    { id: 1, name: "Ana Silva", email: "ana.silva@example.com", progress: "85%" },
                                    { id: 2, name: "Carlos Mendes", email: "carlos.m@example.com", progress: "72%" },
                                    { id: 3, name: "Juliana Costa", email: "ju.costa@example.com", progress: "93%" },
                                  ].map(student => (
                                    <TableRow key={student.id}>
                                      <TableCell className="font-medium">{student.name}</TableCell>
                                      <TableCell>{student.email}</TableCell>
                                      <TableCell className="text-right">{student.progress}</TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                                      Os dados dos alunos serão exibidos aqui
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                      <DialogFooter className="mt-4">
                        <Button variant="outline">Gerenciar Alunos</Button>
                        <Button>Adicionar Atividade</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <CardDescription>{classItem.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 py-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{classItem.studentCount} Alunos</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{classItem.activitiesCount} Atividades</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{classItem.schedule}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 py-2 flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <UserPlus className="h-4 w-4" />
                Adicionar Alunos
              </Button>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Nova Atividade
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {classes.length === 0 && (
        <div className="bg-muted/50 rounded-lg p-8 text-center border border-dashed">
          <School className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma Turma Cadastrada</h3>
          <p className="text-muted-foreground mb-4">
            Você ainda não tem nenhuma turma. Clique no botão abaixo para começar.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Turma
              </Button>
            </DialogTrigger>
            <DialogContent>
              {/* Conteúdo do diálogo */}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ClassManager;
