"use client";
import SectionLayout from "@layout/sectionLayout";
import DashboardTabs from "@molecule/dashboardTabs";
import UserPicture from "@molecule/dashboardTabs/components/picture";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";

const DashboardHeader = () => {
  const { isMobile } = useScreenResolution();

  return (
    <Section
      className="dashboardWrapper"
      margin={isMobile ? "1rem 0px" : "4rem 0px"}
    >
      <SectionLayout>
        <UserPicture />
        <DashboardTabs />
      </SectionLayout>
    </Section>
  );
};

export default DashboardHeader;
