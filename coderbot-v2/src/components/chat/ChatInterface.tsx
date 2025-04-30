import { useState, useRef, useEffect } from "react";
import { AnalogySettings } from "@/components/chat/AnalogySettings";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Message, fetchChatResponse } from "@/services/api";
import { toast } from "@/components/ui/sonner";
import { Loader2, MessageSquarePlus, Settings } from "lucide-react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { chatService } from "@/services/chat-service";
import { SessionSidebar } from "@/components/chat/SessionSidebar";

// --- Define Settings Components Outside ---

interface SettingsProps {
  analogiesEnabled: boolean;
  setAnalogiesEnabled: (enabled: boolean) => void;
  knowledgeBase: string;
  setKnowledgeBase: (base: string) => void;
}

// Renamed to avoid conflict and indicate it's a view component
const DesktopSettingsView: React.FC<SettingsProps> = (props) => (
  <div className="mb-3">
    <AnalogySettings {...props} />
  </div>
);

// Renamed to avoid conflict and indicate it's a view component
const MobileSettingsDrawerView: React.FC<SettingsProps> = (props) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline" size="icon" className="h-8 w-8">
        <Settings className="h-4 w-4" />
      </Button>
    </DrawerTrigger>
    <DrawerContent className="px-4 pb-6 pt-2">
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-3">Configurações do Chat</h3>
        <AnalogySettings {...props} />
      </div>
      <div className="flex justify-end mt-4">
        <DrawerClose asChild>
          <Button variant="default">Fechar</Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  </Drawer>
);


// --- Main Chat Interface Component ---

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Olá! Como posso ajudar com seu aprendizado hoje?",
    isAi: true,
    timestamp: new Date(),
  },
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [analogiesEnabled, setAnalogiesEnabled] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [sessionId, setSessionId] = useState<string>("");

  // Load or create session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Create new session
        const newSessionId = await chatService.createSession();
        setSessionId(newSessionId);

        // Save initial AI message
        await chatService.saveMessage({
          content: INITIAL_MESSAGES[0].content,
          isAi: true,
          sessionId: newSessionId,
        });

        // No need to load messages for a new session as we just created it
        // The initial message will be displayed from the INITIAL_MESSAGES constant
      } catch (error) {
        console.error("Error initializing chat session:", error);
        toast.error("Error creating chat session");
      }
    };

    initSession();
  }, []);

  const handleSessionChange = async (newSessionId: string) => {
    try {
      setIsLoading(true);
      const sessionMessages = await chatService.loadSessionMessages(newSessionId);
      
      if (sessionMessages && sessionMessages.length > 0) {
        setMessages(sessionMessages);
      } else {
        // If no messages found, show at least the initial greeting
        setMessages(INITIAL_MESSAGES);
      }
      
      setSessionId(newSessionId);
      scrollToBottom(); // Scroll to bottom when changing sessions
    } catch (error) {
      console.error("Error changing session:", error);
      toast.error("Erro ao carregar mensagens da sessão");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = () => {
    setSessionId(""); // This will trigger the useEffect to create a new session
    setMessages(INITIAL_MESSAGES);
  };

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || !sessionId) return;
    
    const userMessage = {
      id: Date.now().toString(), // Temporary ID for UI
      content: input,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Save user message
      const userMsgId = await chatService.saveMessage({
        content: input,
        isAi: false,
        sessionId,
      });

      // Update the user message with the real ID from PocketBase
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, id: userMsgId } 
            : msg
        )
      );

      // Create a temporary AI message
      const tempId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, {
        id: tempId,
        content: "",
        isAi: true,
        timestamp: new Date(),
      }]);

      const response = await fetchChatResponse(
        input, 
        analogiesEnabled, 
        false,
        knowledgeBase
      );
      
      // Save AI response
      const aiMsgId = await chatService.saveMessage({
        content: response.content,
        isAi: true,
        sessionId,
      });

      // Update the AI message with content and real ID
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId 
            ? {
                ...msg,
                id: aiMsgId,
                content: response.content,
                timestamp: new Date()
              } 
            : msg
        )
      );
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Error processing message. Please try again.");
      
      setMessages(prev => prev.filter(msg => !msg.content.includes("")));
    } finally {
      setIsLoading(false);
    }
  };

  // No longer need inline definitions for DesktopSettings and MobileSettingsDrawer

  return (
    <div className="flex h-full">
      {/* Session Sidebar - hidden on mobile by default */}
      {showSidebar && (
        <div className={`${isMobile ? 'absolute z-10 h-full' : 'w-72'}`}>
          <SessionSidebar
            currentSessionId={sessionId}
            onSessionChange={handleSessionChange}
            onNewSession={handleNewSession}
          />
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-background">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Toggle sidebar button on mobile */}
              {isMobile && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 mr-2"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <MessageSquarePlus className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-semibold text-primary">Assistente de Aprendizado</h1>
                <p className="text-sm text-muted-foreground">Tire suas dúvidas sobre programação</p>
              </div>
            </div>
            {/* Use the externally defined MobileSettingsDrawerView */}
            {isMobile && (
              <MobileSettingsDrawerView
                analogiesEnabled={analogiesEnabled}
                setAnalogiesEnabled={setAnalogiesEnabled}
                knowledgeBase={knowledgeBase}
                setKnowledgeBase={setKnowledgeBase}
              />
            )}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isAi={message.isAi}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className={cn(
          "border-t p-4 bg-background/80 backdrop-blur-sm",
          isMobile ? "pb-6" : ""
        )}>
          <div className="max-w-3xl mx-auto">
            {/* Use the externally defined DesktopSettingsView */}
            {!isMobile && (
              <DesktopSettingsView
                analogiesEnabled={analogiesEnabled}
                setAnalogiesEnabled={setAnalogiesEnabled}
                knowledgeBase={knowledgeBase}
                setKnowledgeBase={setKnowledgeBase}
              />
            )}

            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              analogiesEnabled={analogiesEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
