import BreadCrumbPane from "@/components/molecules/stays/view/BreadCrumbPane";
import HeroImageGrid from "@/components/molecules/stays/view/HeroImageGrid";
import SectionLayout from "@/components/templates/SectionLayout";

const StayViewPage = () => {
    return (
        <SectionLayout>
            <BreadCrumbPane />
            <HeroImageGrid />
        </SectionLayout>
    );
};

export default StayViewPage;
