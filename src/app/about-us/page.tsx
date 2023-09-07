import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "src/components/layouts/sectionLayout";
import AboutUsPage from "src/components/molecules/aboutUs";
import Section from "src/components/molecules/section";

const Contact = () => {
  return (
    <Section padding="1rem 0 0">
      <Breadcrumb />
      <SectionLayout>
        <AboutUsPage />
      </SectionLayout>
    </Section>
  );
};

export default Contact;
