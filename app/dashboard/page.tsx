
import DashboardHeader from "components/molecules/dashboardTabs/dashboard";
import UserStoreProvider from "hook/useUserStore";

const DashboardHeaderComponent = () => {
  return (
    // <UserStoreProvider>
      <DashboardHeader />
    // </UserStoreProvider>
  );
};

export default DashboardHeaderComponent;
