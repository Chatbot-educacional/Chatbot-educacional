
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileUp, Plus, Calendar, Clock, BookOpen, FileQuestion } from "lucide-react";

export const ExerciseCreator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState<"exercise" | "exam">("exercise");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui futuramente adicionaremos a lógica para salvar o exercício
    console.log({ title, description, dueDate, type, subject });
    
    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setType("exercise");
    setSubject("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileQuestion className="h-5 w-5 text-education-primary" />
          Criar Nova Atividade
        </CardTitle>
        <CardDescription>
          Configure os detalhes da atividade que será disponibilizada para os alunos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Ex: Fundamentos de JavaScript"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Disciplina</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Ex: JavaScript"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Descreva o objetivo e as instruções para esta atividade"
              className="w-full min-h-[100px] p-2 border rounded-md"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data de Entrega</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="dueDate" 
                  type="date" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)} 
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Atividade</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={type === "exercise" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setType("exercise")}
                >
                  <BookOpen className="h-4 w-4" />
                  Exercício
                </Button>
                <Button
                  type="button"
                  variant={type === "exam" ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setType("exam")}
                >
                  <FileText className="h-4 w-4" />
                  Prova
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Label className="block mb-3">Conteúdo da Atividade</Label>
            <Tabs defaultValue="questions" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="questions">Questões</TabsTrigger>
                <TabsTrigger value="materials">Materiais</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="questions" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 text-center">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Questão
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Adicione questões de múltipla escolha, verdadeiro ou falso, ou questões discursivas
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="materials" className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 text-center">
                  <Button variant="outline" className="gap-2">
                    <FileUp className="h-4 w-4" />
                    Anexar Material
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Anexe PDFs, imagens ou outros materiais de apoio para esta atividade
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Tempo Limite (minutos)</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="timeLimit" 
                        type="number" 
                        defaultValue={60} 
                        min={5}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="attempts">Número de Tentativas</Label>
                    <Input 
                      id="attempts" 
                      type="number" 
                      defaultValue={1} 
                      min={1}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button onClick={handleSubmit}>Criar Atividade</Button>
      </CardFooter>
    </Card>
  );
};

export default ExerciseCreator;
