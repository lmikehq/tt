import { create } from "zustand";

interface userState {
    user: any;
    setUser: (e: any) => void;
}


export const useUserStore = create<userState>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));
