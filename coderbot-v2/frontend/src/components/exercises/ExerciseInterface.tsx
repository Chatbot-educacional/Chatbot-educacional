
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle2, BookOpen } from "lucide-react";

type Exercise = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: "exercise" | "exam";
  status: "pending" | "completed" | "in-progress";
  subject: string;
};

export const ExerciseInterface = () => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: "1",
      title: "Fundamentos de JavaScript",
      description: "Prática de funções e escopo em JavaScript",
      dueDate: "2025-04-25",
      type: "exercise",
      status: "pending",
      subject: "JavaScript"
    },
    {
      id: "2",
      title: "Avaliação: CSS e HTML",
      description: "Avaliação sobre os conceitos de CSS e HTML abordados no curso",
      dueDate: "2025-04-20",
      type: "exam",
      status: "in-progress",
      subject: "HTML & CSS"
    },
    {
      id: "3",
      title: "React Hooks",
      description: "Exercícios sobre o uso de Hooks em aplicações React",
      dueDate: "2025-04-30",
      type: "exercise",
      status: "completed",
      subject: "React"
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Pendente</span>;
      case "in-progress":
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Em Progresso</span>;
      case "completed":
        return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Concluído</span>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-education-primary mb-2">Exercícios e Provas</h1>
        <p className="text-muted-foreground mb-6">
          Acesse suas atividades pendentes, em andamento e concluídas
        </p>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="exercises">Exercícios</TabsTrigger>
            <TabsTrigger value="exams">Provas</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className={cn(
                    "h-2",
                    exercise.type === "exam" ? "bg-red-500" : "bg-blue-500"
                  )}></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      {exercise.type === "exam" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Prazo: {new Date(exercise.dueDate).toLocaleDateString()}</span>
                      </div>
                      {getStatusBadge(exercise.status)}
                    </div>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">Detalhes</Button>
                      {exercise.status !== "completed" && (
                        <Button size="sm">
                          {exercise.status === "in-progress" ? "Continuar" : "Iniciar"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exercises" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises
                .filter(e => e.type === "exercise")
                .map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Similar card structure as above */}
                    <div className="h-2 bg-blue-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Prazo: {new Date(exercise.dueDate).toLocaleDateString()}</span>
                        </div>
                        {getStatusBadge(exercise.status)}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        {exercise.status !== "completed" && (
                          <Button size="sm">
                            {exercise.status === "in-progress" ? "Continuar" : "Iniciar"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exams" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises
                .filter(e => e.type === "exam")
                .map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Similar card structure as above */}
                    <div className="h-2 bg-red-500"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <FileText className="h-5 w-5 text-red-500" />
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Prazo: {new Date(exercise.dueDate).toLocaleDateString()}</span>
                        </div>
                        {getStatusBadge(exercise.status)}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Detalhes</Button>
                        {exercise.status !== "completed" && (
                          <Button size="sm">
                            {exercise.status === "in-progress" ? "Continuar" : "Iniciar"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises
                .filter(e => e.status === "completed")
                .map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    {/* Similar card structure as above */}
                    <div className={cn(
                      "h-2",
                      exercise.type === "exam" ? "bg-red-500" : "bg-blue-500"
                    )}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        {exercise.type === "exam" ? (
                          <FileText className="h-5 w-5 text-red-500" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <CardDescription>{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Concluído em: {new Date(exercise.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-medium">Concluído</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Ver Resultados</Button>
                        <Button variant="ghost" size="sm">Revisar</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseInterface;

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
