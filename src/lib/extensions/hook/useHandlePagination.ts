import { useDashboardStore } from "@/lib/store/dashboard/index.store";

const useHandlePagination = () => {
  const { updatePage } = useDashboardStore((state) => state);

  const onPageChange = (page: number) => {
    updatePage(page);
  };

  return {
    onPageChange
  };
};

export default useHandlePagination;