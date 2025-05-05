import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  FileText,
  CalendarDays,
  GraduationCap,
  ClipboardCheck,
} from "lucide-react";

export const TeacherDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Professor</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="students">Alunos</TabsTrigger>
          <TabsTrigger value="classes">Turmas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Alunos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">
                  +4 desde o mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Exercícios Atribuídos
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde a semana passada
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Turmas Ativas
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  +1 desde o mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Média de Conclusão
                </CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">
                  +5% desde o mês passado
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Interações dos alunos com o sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>João completou o exercício sobre Estruturas de Dados</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Há 1 hora</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>Maria enviou uma dúvida sobre Algoritmos</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Há 3 horas</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>Pedro começou o projeto final</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Há 5 horas</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Próximas Entregas</CardTitle>
                <CardDescription>
                  Prazos de exercícios e projetos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Estruturas de Dados - Entrega Final</h3>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "30%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    30% dos alunos já entregaram. Prazo: 2 dias.
                  </p>

                  <div className="flex items-center space-x-2 pt-4">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Algoritmos - Exercício 3</h3>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    65% dos alunos já entregaram. Prazo: 5 dias.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
