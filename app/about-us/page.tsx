import Breadcrumb from "@atom/breadcrumb";
import SectionLayout from "@components/layouts/sectionLayout";
import AboutUsPage from "@molecule/aboutUs";
import Section from "@molecule/section";

const Contact = () => {
  return (
    <Section padding='1rem 0 0'>
      <Breadcrumb />
      <SectionLayout>
        <AboutUsPage />
      </SectionLayout>
    </Section>
  );
};

export default Contact;
