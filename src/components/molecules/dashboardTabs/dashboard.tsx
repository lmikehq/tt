import SectionLayout from "src/components/layouts/sectionLayout";
import DashboardTabs from "src/components/molecules/dashboardTabs";
import UserPicture from "src/components/molecules/dashboardTabs/components/picture";
import Section from "src/components/molecules/section";

const DashboardHeader = () => {
  return (
    <Section className="dashboardWrapper" margin={"1rem 0px"}>
      <SectionLayout>
        <UserPicture />
        <DashboardTabs />
      </SectionLayout>
    </Section>
  );
};

export default DashboardHeader;
