import PrivacyPolicyPage from "@/components/organisms/privacy-policy/PrivacyPolicyPage";
import SectionLayout from "@/components/templates/SectionLayout";
import Breadcrumb from "@organism/breadcrumb";
import Section from "src/components/molecules/section";


function PrivacyPolicy () {
    return (
        <Section styles={{ paddingTop: "2rem" }}>
            <Breadcrumb />
            <SectionLayout>
                <PrivacyPolicyPage/>
            </SectionLayout>
        </Section>
    );
};

export default PrivacyPolicy;
