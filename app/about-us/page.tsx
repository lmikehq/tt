import Breadcrumb from "@atom/breadcrumb";
import SectionLayout from "@components/layouts/sectionLayout";
import AboutUsPage from "@molecule/aboutUs";
import Section from "@molecule/section";

const Contact = () => {
  return (
    <Section>
      <SectionLayout style={{
        marginTop: "1rem",
      }}>
        <Breadcrumb />
        <AboutUsPage />
      </SectionLayout>
    </Section>
  );
};

export default Contact;
