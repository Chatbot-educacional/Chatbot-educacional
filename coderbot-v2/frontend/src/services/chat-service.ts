import { pb } from '@/integrations/pocketbase/client';
import type { Message } from '@/services/api';
import { SessionInfo } from '@/components/chat/SessionSelector';

export const chatService = {
  async createSession(title: string = "Nova Conversa"): Promise<string> {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('User not authenticated');
    
    // Create a new session record with title
    const session = await pb.collection('sessao').create({
      usuario: userId,
      messageIDs: [],
      Title: title  // Changed from lowercase 'title' to 'Title'
    });
    
    return session.id;
  },

  async updateSessionTitle(sessionId: string, title: string): Promise<void> {
    try {
      // Make sure we have a valid title
      const finalTitle = title.trim() || "Nova Conversa";
      
      console.log(`Attempting to update session ${sessionId} title to: ${finalTitle}`);
      
      // Update the session with the new title using the correct field name (Title with capital T)
      const data = {
        "Title": finalTitle
      };
      
      await pb.collection('sessao').update(sessionId, data);
      
      // Verify the update worked by fetching the session again
      const updatedSession = await pb.collection('sessao').getOne(sessionId);
      console.log("Session after title update:", updatedSession);
      console.log("Updated title value:", updatedSession.Title);
      
      if (updatedSession.Title !== finalTitle) {
        console.warn(`Title mismatch: expected "${finalTitle}" but got "${updatedSession.Title}"`);
      }
    } catch (error) {
      console.error("Error updating session title:", error);
      throw error;
    }
  },

  async saveMessage(message: {
    content: string;
    isAi: boolean;
    sessionId: string;
  }): Promise<string> {
    try {
      // First, create the message
      const chatMessage = await pb.collection('chat_messages').create({
        content: message.content,
        isAi: message.isAi,
        timestamp: new Date().toISOString(),
      });

      console.log("Created message with ID:", chatMessage.id);

      // Then, update the session to include this message ID
      const session = await pb.collection('sessao').getOne(message.sessionId);
      
      // Ensure messageIDs is an array, even if it's null or undefined
      const messageIDs = Array.isArray(session.messageIDs) ? [...session.messageIDs] : [];
      
      console.log("Current messageIDs:", messageIDs);
      console.log("Adding message ID:", chatMessage.id);

      // Add the new message ID to the array
      messageIDs.push(chatMessage.id);

      // Update the session with the new messageIDs array as JSON
      await pb.collection('sessao').update(message.sessionId, {
        messageIDs: JSON.stringify(messageIDs)
      });

      // Verify the update worked
      const updatedSession = await pb.collection('sessao').getOne(message.sessionId);
      console.log("Updated messageIDs:", updatedSession.messageIDs);

      return chatMessage.id;
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  },

  async loadSessionMessages(sessionId: string): Promise<Message[]> {
    try {
      // Get the session
      const session = await pb.collection('sessao').getOne(sessionId);
      
      // Parse messageIDs from JSON if it's a string
      let messageIDs = session.messageIDs;
      if (typeof messageIDs === 'string') {
        try {
          messageIDs = JSON.parse(messageIDs);
        } catch (e) {
          console.error("Error parsing messageIDs JSON:", e);
          messageIDs = [];
        }
      }
      
      if (!messageIDs || !Array.isArray(messageIDs) || messageIDs.length === 0) {
        console.log("No messages found for session:", sessionId);
        return [];
      }
  
      console.log(`Loading ${messageIDs.length} messages for session:`, sessionId);
      
      // Fetch all messages referenced in the session
      const messages: Message[] = [];
      
      for (const messageId of messageIDs) {
        try {
          const msg = await pb.collection('chat_messages').getOne(messageId);
          messages.push({
            id: msg.id,
            content: msg.content,
            isAi: msg.isAi,
            timestamp: new Date(msg.timestamp),
          });
        } catch (error) {
          console.error(`Failed to load message ${messageId}:`, error);
        }
      }
  
      console.log(`Successfully loaded ${messages.length} messages`);
      return messages;
    } catch (error) {
      console.error("Error loading session messages:", error);
      throw error;
    }
  },

  async getUserSessions(): Promise<SessionInfo[]> {
    const userId = pb.authStore.model?.id;
    if (!userId) throw new Error('User not authenticated');

    const result = await pb.collection('sessao').getList(1, 100, {
      filter: `usuario = "${userId}"`,
      sort: '-created',
    });

    return result.items.map(item => {
      // Parse messageIDs from JSON if it's a string
      let messageIDs = item.messageIDs;
      if (typeof messageIDs === 'string') {
        try {
          messageIDs = JSON.parse(messageIDs);
        } catch (e) {
          console.error("Error parsing messageIDs JSON:", e);
          messageIDs = [];
        }
      }
      
      return {
        id: item.id,
        title: item.Title || "Conversa sem título",  // Changed from lowercase 'title' to 'Title'
        created: item.created,
        usuario: item.usuario,
        messageIDs: Array.isArray(messageIDs) ? messageIDs : []
      };
    });
  },

  async deleteSession(sessionId: string): Promise<void> {
    try {
      // First, get the session to retrieve message IDs
      const session = await pb.collection('sessao').getOne(sessionId);
      
      // Parse messageIDs from JSON if it's a string
      let messageIDs = session.messageIDs;
      if (typeof messageIDs === 'string') {
        try {
          messageIDs = JSON.parse(messageIDs);
        } catch (e) {
          console.error("Error parsing messageIDs JSON:", e);
          messageIDs = [];
        }
      }
      
      // Delete all associated messages
      if (Array.isArray(messageIDs) && messageIDs.length > 0) {
        console.log(`Deleting ${messageIDs.length} messages for session ${sessionId}`);
        
        for (const messageId of messageIDs) {
          try {
            await pb.collection('chat_messages').delete(messageId);
          } catch (error) {
            console.error(`Failed to delete message ${messageId}:`, error);
            // Continue with other deletions even if one fails
          }
        }
      }
      
      // Finally, delete the session itself
      await pb.collection('sessao').delete(sessionId);
      console.log(`Successfully deleted session ${sessionId}`);
    } catch (error) {
      console.error("Error deleting session:", error);
      throw error;
    }
  }
};