
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type ChatMessageProps = {
  content: string;
  isAi: boolean;
  timestamp: Date;
};

export const ChatMessage = ({ content, isAi, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "py-4 px-4 rounded-lg mb-2 transition-all duration-200",
      isAi ? "bg-muted/50 border border-muted/70" : "bg-education-dark border"
    )}>
      <div className="flex items-center mb-2">
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center text-white",
          isAi ? "bg-education-primary" : "bg-education-secondary"
        )}>
          {isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </div>
        <span className="ml-2 font-medium text-sm">
          {isAi ? "Assistente IA" : "Você"}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="ml-10">
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{content}</div>
      </div>
    </div>
  );
};
