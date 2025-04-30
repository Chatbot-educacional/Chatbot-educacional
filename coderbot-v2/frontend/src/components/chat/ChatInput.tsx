
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  analogiesEnabled: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading, analogiesEnabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Digite sua pergunta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        className={cn(
          "flex-1 transition-all duration-200",
          analogiesEnabled && "border-education-primary focus-visible:ring-education-primary/20"
        )}
        aria-label="Mensagem"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()} 
        aria-label="Enviar"
        className={cn(
          "transition-all duration-200",
          analogiesEnabled && "bg-education-primary hover:bg-education-secondary"
        )}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
