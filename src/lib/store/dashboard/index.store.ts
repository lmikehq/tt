import { create } from 'zustand';

interface State {
  queryParams: string[];
  param: string;
  activeTab: string;
  page: number;
  limit: number;
  search: string;
  dateRange?: string;
  startDate?: string;
  endDate?: string | undefined;
  tab: number;
}

interface Actions {
  addParams: (param: string) => void;
  updateParams: (param: string) => void;
  updateTab: (tab: string) => void;
  setPage: (param: string) => void;
  setSearch: (param: string) => void;
  setDateRange: (startDate: string, endDate: string) => void;
  setTab: (param: number) => void;
}

export const useDashboardStore = create<Actions & State>((set): Actions & State => ({
  tab: 0,
  page: 1,
  limit: 10,
  queryParams: [],
  param: '',
  search: '',
  activeTab: '',
  dateRange: '',
  startDate: '',
  endDate: '',
  addParams(param: string) {
    set((state) => {
      let query: string[] = [];
      if (state.queryParams.includes(param)) {
        query = state.queryParams.filter((queryparam) => queryparam !== param);
      } else {
        query = [...state.queryParams, param];
      }
      return { queryParams: query, page: 1 };
    });
  },
  updateParams(param: string) {
    set((state) => ({
      param: param,
      page: 1
    }));
  },
  updateTab(tab: string) {
    set((state) => ({
      activeTab: tab,
      page: 1,
      limit: 10,
      search: '',
      param: '',
      queryParams: []
    }));
  },
  setPage(param) {
    set((state) => {
      if (param === 'next') {
        state.page = state.page + 1;
      } else {
        state.page = state.page - 1;
      }
      return { page: state.page };
    });
  },
  setSearch(param) {
    set((state) => {
      return { search: param, page: 1 };
    });
  },
  setDateRange(startDate, endDate) {
    set((state) => {
      return { startDate: startDate, endDate: endDate, page: 1 };
    });
  },
  setTab(param: number) {
    set(() => ({
      tab: param
    }));
  },
}));