import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "@components/templates/SectionLayout";
import Section from "src/components/molecules/section";
import AboutUsPage from "@/components/organisms/about-us/AboutUsPage";

function AboutUs () {
    return (
        <Section padding="1rem 0 0">
            <Breadcrumb/>
            <SectionLayout>
                <AboutUsPage/>
            </SectionLayout>
        </Section>
    );
};

export default AboutUs;
