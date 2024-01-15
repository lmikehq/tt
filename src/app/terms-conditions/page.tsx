import TermsConditionsPage from "@/components/organisms/terms-conditions/TermsConditionsPage";
import SectionLayout from "@/components/templates/SectionLayout";
import Breadcrumb from "@organism/breadcrumb";
import Section from "src/components/molecules/section";


const TermsAndConditions = () => {
    return (
        <Section styles={{ paddingTop: "2rem" }}>
            <Breadcrumb />
            <SectionLayout>
                <TermsConditionsPage />
            </SectionLayout>
        </Section>
    );
};

export default TermsAndConditions;
