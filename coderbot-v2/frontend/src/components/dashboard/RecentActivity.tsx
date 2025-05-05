import React from "react";
import { Code, FileText, GitCommit, MessageSquare } from "lucide-react";

type Activity = {
  id: number;
  icon: React.ReactNode;
  description: string;
  timestamp: string;
};

export function RecentActivity() {
  const activities: Activity[] = [
    {
      id: 1,
      icon: <Code className="h-4 w-4 text-primary" />,
      description: "Completou o exercício 'Ordenação de Algoritmos'",
      timestamp: "há 1 hora"
    },
    {
      id: 2,
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      description: "Fez upload de uma solução para 'Projeto API'",
      timestamp: "há 3 horas"
    },
    {
      id: 3,
      icon: <GitCommit className="h-4 w-4 text-green-500" />,
      description: "Enviou 5 respostas para o desafio semanal",
      timestamp: "há 6 horas"
    },
    {
      id: 4,
      icon: <MessageSquare className="h-4 w-4 text-orange-500" />,
      description: "Conversou com o assistente sobre estruturas de dados",
      timestamp: "há 1 dia"
    },
    {
      id: 5,
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      description: "Iniciou o módulo 'Programação Orientada a Objetos'",
      timestamp: "há 2 dias"
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 py-2">
          <div className="mt-0.5 bg-muted flex items-center justify-center rounded-full p-1">
            {activity.icon}
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground">
              {activity.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 