import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "@components/templates/SectionLayout";
import FaqSection from "src/components/molecules/faq";
import Section from "src/components/molecules/section";
import FAQPage from "@/components/organisms/faq/FAQPage";


const FaqsComponent = () => {
    return (
        <Section styles={{ paddingTop: "1rem" }}>
            <Breadcrumb/>
            <SectionLayout>
                <FAQPage />
            </SectionLayout>
        </Section>
    );
};

export default FaqsComponent;