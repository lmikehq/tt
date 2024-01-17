import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "@components/templates/SectionLayout";
import Section from "src/components/molecules/section";
import CareersPage from "@/components/organisms/careers/CareersPage";

function Careers () {
    return (
        <Section padding="1rem 0 0">
            <Breadcrumb/>
            <SectionLayout>
                <CareersPage/>
            </SectionLayout>
        </Section>
    );
};

export default Careers;
