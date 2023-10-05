import { create } from "zustand";

interface State {
  aiThinking?: boolean;
  inputMessage?: string;
  outputMessages: Message[];
  suggestions?: string[];
  chatSessionId?: string;
}

interface Message {
  role: string;
  content: string;
}

interface Actions {
  setAiThinking: (aiThinking: boolean) => void;
  setInputMessage: (inputMessage: string) => void;
  setOutputMessages: (outputMessages: Message[]) => void;
  setSuggestions: (suggestions: string[]) => void;
  addOutputMessage: (message: Message) => void;
  setChatSessionId: (id: string) => void;
}

export const useAiChatStore = create<State & Actions>(
  (set): State & Actions => ({
    aiThinking: false,
    inputMessage: "",
    outputMessages: [],
    suggestions: [],
    chatSessionId: "",

    setAiThinking: (aiThinking: boolean) => {
      set({ aiThinking });
    },

    setInputMessage: (inputMessage: string) => {
      set({ inputMessage });
    },

    setOutputMessages: (outputMessages: Message[]) => {
      set({ outputMessages });
    },

    setSuggestions: (suggestions: string[]) => {
      set({ suggestions });
    },

    addOutputMessage: (message: Message) => {
      set((state) => ({ outputMessages: [...state.outputMessages, message] }));
    },
    setChatSessionId: (chatSessionId: string) => {
      set({ chatSessionId });
    },
  })
);
