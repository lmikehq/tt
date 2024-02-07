import { create } from 'zustand';

interface State {
  page: number;
  accompany: number;
  numberOfDependants: number;
}

interface Actions {
  setNumberOfDependants: (param: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  removeDependant: (param: number) => void;
}

export const accompanyStore = create<State & Actions>((set): Actions & State => ({
  page: 0,
  accompany: 0,
  numberOfDependants: 1,
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
  removeDependant(param: number) {
    set((state) => {
      // console.log('this is the index element to remove', param);
      // console.log(state.numberOfDependants);
      return {
        // BASED ON THE INDEX REMOVE THE ELEMENT AT THAT POSITION
        // accompany: param
        numberOfDependants: param
      };
    });
  },
  setNumberOfDependants(param: number) {
    set(() => ({
      numberOfDependants: param
    }));
  }
}))

