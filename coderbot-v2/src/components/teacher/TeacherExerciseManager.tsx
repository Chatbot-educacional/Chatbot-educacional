
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, Users, Eye } from "lucide-react";
import ExerciseCreator from "./ExerciseCreator";

// Exemplo: lista de exercícios mockada (substituir por fetch do backend futuramente)
const mockExercises = [
  {
    id: 1,
    title: "Fundamentos de JavaScript",
    subject: "JavaScript",
    dueDate: "2025-04-25",
    turma: "Turma A",
    submissions: 12,
    pending: 3,
  },
  {
    id: 2,
    title: "Lógica de Programação",
    subject: "Lógica",
    dueDate: "2025-05-10",
    turma: "Turma B",
    submissions: 15,
    pending: 0,
  }
];

const mockTurmas = [
  { id: "A", name: "Turma A" },
  { id: "B", name: "Turma B" },
  { id: "C", name: "Turma C" }
];

export const TeacherExerciseManager = () => {
  const [tab, setTab] = useState("list");
  const [exercises, setExercises] = useState(mockExercises);
  const [showCreator, setShowCreator] = useState(false);

  const handleDelete = (id: number) => {
    setExercises((exs) => exs.filter((e) => e.id !== id));
  };

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList>
        <TabsTrigger value="list">Meus Exercícios</TabsTrigger>
        <TabsTrigger value="novo">Criar Novo</TabsTrigger>
        <TabsTrigger value="turmas">Turmas</TabsTrigger>
      </TabsList>

      <TabsContent value="list">
        <div className="mb-4 flex justify-end">
          <Button onClick={() => setTab("novo")} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Novo Exercício
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((ex) => (
            <Card key={ex.id} className="relative transition hover:shadow-lg">
              <CardHeader>
                <CardTitle>{ex.title} <span className="text-xs ml-1 text-muted-foreground">({ex.subject})</span></CardTitle>
                <div className="text-xs text-muted-foreground">
                  <Users className="inline-block mr-1 h-3 w-3" /> {ex.turma}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>
                    Prazo: <span className="font-semibold">{new Date(ex.dueDate).toLocaleDateString()}</span>
                  </span>
                  <span>
                    Submissões: <span className="font-bold text-education-primary">{ex.submissions}</span>/{ex.submissions + ex.pending}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1"><Eye className="h-3 w-3" />Ver</Button>
                  <Button size="sm" variant="outline" className="gap-1"><Pencil className="h-3 w-3" />Editar</Button>
                  <Button size="sm" variant="destructive" className="gap-1" onClick={() => handleDelete(ex.id)}>
                    <Trash2 className="h-3 w-3" />Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="novo">
        <ExerciseCreator />
      </TabsContent>

      <TabsContent value="turmas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockTurmas.map((turma) => (
            <Card key={turma.id}>
              <CardHeader>
                <CardTitle>{turma.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground">Qtd. alunos: <b>25</b></div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">Ver Alunos</Button>
                  <Button size="sm" variant="outline">Atribuir Exercício</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TeacherExerciseManager;
