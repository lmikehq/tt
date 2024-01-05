'use client'

import { useUserStore } from "@/lib/store/useStore";
import SectionLayout from "@components/templates/SectionLayout";
import { redirect } from "next/navigation";
import DashboardTabs from "src/components/molecules/dashboardTabs";
import UserPicture from "src/components/molecules/dashboardTabs/components/picture";
import Section from "src/components/molecules/section";

const DashboardHeader = () => {
    const { user } = useUserStore()
    if (!user?._id) {
        redirect('/auth/login')
    }

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
