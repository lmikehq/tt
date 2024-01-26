import { create } from 'zustand';

interface State {
  visaQueryParams: string[];
  visaSearch: string;
}

interface Actions {
  addVisaParams: (param: string) => void;
  setVisaSearchQuery: (param: string) => void;
}

export const useDashboardVisaStore = create<State & Actions>((set): Actions & State => ({
  visaQueryParams: [],
  visaSearch: '',
  addVisaParams(param) {
    set((state) => {
      let query: string[] = [];
      if (state.visaQueryParams.includes(param)) {
        query = state.visaQueryParams.filter((queryparam) => queryparam !== param);
      } else {
        query = [...state.visaQueryParams, param];
      }
      return { visaQueryParams: query };
    });
  },
  setVisaSearchQuery(param) {
    set((state) => {
      return { visaSearch: param };
    }
    );
  },
}));