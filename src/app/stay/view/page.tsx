import Section from "@/components/molecules/section";
import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane";
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid";
import RecentlyViewedList from "@/components/molecules/stays/view/recently-viewed/RecentlyViewedList";
import StayDetailsTab from "@/components/molecules/stays/view/StayDetailsTab";
import SectionLayout from "@/components/templates/SectionLayout";
import Flex from "@/components/templates/flex";
import ChooseYourRoom from "@/components/molecules/stays/view/ChooseYourRoom";

const StayViewPage = () => {
    return (
        <SectionLayout>
            <BreadCrumbPane />
            <HeroImageGrid />
            <Flex gap="2.25rem">
                <Section width="62%">
                    <StayDetailsTab />
                </Section>

                <Section width="38%">
                    <RecentlyViewedList />
                </Section>
            </Flex>
            <Flex gap="2.25rem">
                <Section width="62%">
                    <Section styles={{ marginTop: "37px" }}>
                        <ChooseYourRoom />
                    </Section>
                    <Section styles={{ marginTop: "37px" }}>
                        <></>
                    </Section>
                </Section>
                <Section width="38%">
                    <></>
                </Section>
            </Flex>
        </SectionLayout>
    );
};

export default StayViewPage;
