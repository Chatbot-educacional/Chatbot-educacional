import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/Overview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  BookOpen,
  Code,
  FileText,
  BarChart2,
  BookMarked,
  GraduationCap,
} from "lucide-react";

export const StudentDashboard = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard do Aluno</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Exercícios Concluídos
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +3 desde a semana passada
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Projetos Finalizados
                </CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +1 desde o mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Horas de Estudo
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28h</div>
                <p className="text-xs text-muted-foreground">
                  +5h desde a semana passada
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pontuação Total
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,580</div>
                <p className="text-xs text-muted-foreground">
                  +250 desde a semana passada
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Seu Progresso</CardTitle>
                <CardDescription>
                  Acompanhe seu progresso ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
                <CardDescription>
                  Suas últimas interações com o sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trilha de Aprendizado</CardTitle>
              <CardDescription>
                Seu caminho de estudos e próximos passos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <BookMarked className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Módulo atual: Estruturas de Dados Básicas</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Você está 65% completo neste módulo. Continue estudando para avançar!
                </p>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Próximas Lições:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Árvores Binárias - Conceitos Básicos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Algoritmos de Ordenação - Parte 2</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Projeto Prático: Sistema de Gerenciamento</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Pendentes</CardTitle>
              <CardDescription>
                Exercícios e tarefas para completar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Exercício: Implementação de Listas Encadeadas</span>
                    </div>
                    <span className="text-sm font-medium text-destructive">Vence em 2 dias</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span>Projeto: Desenvolvimento de API Básica</span>
                    </div>
                    <span className="text-sm font-medium text-destructive">Vence em 1 semana</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md hover:bg-accent">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Leitura: Introdução a Padrões de Projeto</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Sem prazo</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 