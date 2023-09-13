import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "@components/templates/sectionLayout";
import ContactPage from "src/components/molecules/contactPage";
import Section from "src/components/molecules/section";

const Contact = () => {
  return (
    <Section styles={{ paddingTop: "2rem" }}>
      <Breadcrumb />
      <SectionLayout>
        <ContactPage />
      </SectionLayout>
    </Section>
  );
};

export default Contact;
