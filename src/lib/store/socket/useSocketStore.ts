import { create } from "zustand";

interface State {
  aiThinking?: boolean;
  inputMessage?: string;
  outputMessages: Message[];
  aiSuggestions?: SuggestionsType | null;
  chatSessionId?: string;
  initialAiChats?: InitialAiChats | null;
}

interface Message {
  role?: string;
  response: string;
  message?: string;
  id?: string;
}
interface SuggestionsType {
  suggestions: string[];
  loading: boolean;
}
interface InitialAiChats {
  chats: Message[];
  loading: boolean;
}

interface Actions {
  setAiThinking: (aiThinking: boolean) => void;
  setInputMessage: (inputMessage: string) => void;
  setOutputMessages: (outputMessages: Message[]) => void;
  setChatSuggestions: (suggestions: SuggestionsType) => void;
  addOutputMessage: (message: Message) => void;
  setChatSessionId: (id: string) => void;
  setInitialAiChats: (chats: InitialAiChats) => void;
  updateLastMessage: (message: Message['response']) => void;
}

export const useAiChatStore = create<State & Actions>(
  (set): State & Actions => ({
    aiThinking: false,
    inputMessage: "",
    outputMessages: [],
    aiSuggestions: null,
    chatSessionId: "",
    initialAiChats: {
      chats: [],
      loading: true,
    },

    setAiThinking: (aiThinking: boolean) => {
      set({ aiThinking });
    },

    setInputMessage: (inputMessage: string) => {
      set({ inputMessage });
    },

    setOutputMessages: (outputMessages: Message[]) => {
      set({ outputMessages });
    },

    setChatSuggestions: (aiSuggestions: SuggestionsType) => {
      set({ aiSuggestions });
    },

    addOutputMessage: (message: Message) => {
      set((state) => ({ outputMessages: [...state.outputMessages, message] }));
    },
    setChatSessionId: (chatSessionId: string) => {
      set({ chatSessionId });
    },
    setInitialAiChats: (initialAiChats: InitialAiChats) => {
      set({ initialAiChats });
    },
    updateLastMessage: (response: Message['response']) => {
      set((state) => {
        const outputMessages = [...state.outputMessages];
        outputMessages[outputMessages.length - 1].response = response;
        return { outputMessages };
      });
    },
  })
);
