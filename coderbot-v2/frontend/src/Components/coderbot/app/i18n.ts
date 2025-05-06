import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      sidebar: {
        yourConversations: 'Your Conversations',
        searchPlaceholder: 'Search conversations...',
        newConversation: 'New Conversation',
        newConversationTitle: 'New Conversation',
        conversationTitleLabel: 'Conversation title',
        create: 'Create',
        cancel: 'Cancel',
        loading: 'Loading...',
        noneFound: 'No conversations found',
        noneYet: 'No conversations yet',
        untitled: 'Untitled conversation',
        rename: 'Rename',
        delete: 'Delete',
        deleteTitle: 'Delete Conversation',
        deleteConfirm: 'Are you sure you want to delete this conversation? This action cannot be undone.',
        deleteSuccess: 'Conversation deleted successfully',
        updateSuccess: 'Title updated',
        updateError: 'Error updating title',
        deleteError: 'Error deleting conversation',
        loadError: 'Error loading sessions',
      }
    }
  },
  pt: {
    translation: {
      sidebar: {
        yourConversations: 'Suas Conversas',
        searchPlaceholder: 'Buscar conversas...',
        newConversation: 'Nova Conversa',
        newConversationTitle: 'Nova Conversa',
        conversationTitleLabel: 'Título da conversa',
        create: 'Criar',
        cancel: 'Cancelar',
        loading: 'Carregando...',
        noneFound: 'Nenhuma conversa encontrada',
        noneYet: 'Nenhuma conversa ainda',
        untitled: 'Conversa sem título',
        rename: 'Renomear',
        delete: 'Excluir',
        deleteTitle: 'Excluir Conversa',
        deleteConfirm: 'Tem certeza que deseja excluir esta conversa? Esta ação não pode ser desfeita.',
        deleteSuccess: 'Sessão excluída com sucesso',
        updateSuccess: 'Título atualizado',
        updateError: 'Erro ao atualizar título',
        deleteError: 'Erro ao excluir sessão',
        loadError: 'Erro ao carregar sessões',
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 