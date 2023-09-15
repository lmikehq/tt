import UserStoreProvider from "@lib/extensions/hook/useUserStore";
import DashboardHeader from "@molecule/dashboardTabs/dashboard";


const DashboardHeaderComponent = () => {
  return (
    <UserStoreProvider>
      <DashboardHeader />
   </UserStoreProvider>
  );
};

export default DashboardHeaderComponent;
