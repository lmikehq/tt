import DashboardHeader from "src/components/molecules/dashboardTabs/dashboard";
import UserStoreProvider from "@lib/extensions/hook/useUserStore";

const DashboardHeaderComponent = () => {
  return (
   // <UserStoreProvider>
      <DashboardHeader />
   // </UserStoreProvider>
  );
};

export default DashboardHeaderComponent;
