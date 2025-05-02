import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Importe Continue (assumindo que já esteja instalado)
import { Continue } from "continue"; 

export const ChatWithContinue: React.FC = () => {
  const [userMessage, setUserMessage] = useState<string>(""); // Mensagem digitada pelo usuário
  const [chatHistory, setChatHistory] = useState<string[]>([]); // Histórico de mensagens (usuário + Continue)
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para mostrar se o Continue está processando
  const continueAPI = useRef<any>(); // Referência para o Continue (se necessário)

  // Inicializando o Continue (apenas uma vez)
  useEffect(() => {
    continueAPI.current = new Continue({
      apiKey: "sua-chave-api", // Se for necessário, adicione sua chave de API aqui
      language: "python", // Defina o idioma conforme necessário (opcional)
    });
  }, []);

  // Função para enviar a mensagem do usuário para o Continue e obter a resposta
  const handleSendMessage = async () => {
    if (!userMessage) return;

    setIsLoading(true);

    // Adiciona a mensagem do usuário ao histórico de chat
    setChatHistory(prev => [...prev, `Você: ${userMessage}`]);
    setUserMessage(""); // Limpa o campo de entrada

    try {
      // Solicita ao Continue que forneça uma resposta com base na mensagem do usuário
      const response = await continueAPI.current.chat(userMessage);

      // Adiciona a resposta do Continue ao histórico de chat
      setChatHistory(prev => [...prev, `Continue: ${response}`]);
    } catch (error) {
      console.error("Erro ao conversar com o Continue:", error);
      toast({
        title: "Erro ao obter resposta do Continue.",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className="message">
            <p>{message}</p>
          </div>
        ))}
      </div>

      <div className="input-area">
        <Input
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Digite sua mensagem"
        />
        <Button onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </div>
  );
};
