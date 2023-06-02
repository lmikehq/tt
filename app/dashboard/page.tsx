
import SectionLayout from "@layout/sectionLayout";
import DashboardTabs from "@molecule/dashboardTabs";
import UserPicture from "@molecule/dashboardTabs/components/picture";
import Section from "@molecule/section";

const DashboardHeader = () => {
  return (
    <Section margin="4rem 0px">
      <SectionLayout>
        <UserPicture />
        <DashboardTabs />
      </SectionLayout>
    </Section>
  );
};

export default DashboardHeader;
