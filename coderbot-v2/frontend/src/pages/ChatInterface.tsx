import { ChatInterface as ChatComponent } from "@/components/chat/ChatInterface";
import { pb } from "@/integrations/pocketbase/client";

const ChatInterface = () => {
  const userId = pb.authStore.model?.id;
  if (!userId) return null;
  return <ChatComponent userId={userId} />;
};

export default ChatInterface;
