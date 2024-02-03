import { create } from 'zustand';

interface State {
  page: number;
  accompany: number;
}

interface Actions {
  nextPage: () => void;
  prevPage: () => void;
  setAccompany: (param: number) => void;
}

export const accompanyStore = create<State & Actions>((set): Actions & State => ({
  page: 0,
  accompany: 0,
  nextPage() {
    set((state) => ({
      page: state.page + 1
    }));
  },
  prevPage() {
    set((state) => ({
      page: state.page - 1
    }));
  },
  setAccompany(param) {
    set((state) => ({
      accompany: param
    }));
  },
}))

