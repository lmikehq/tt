import Breadcrumb from "@atom/breadcrumb";
import SectionLayout from "@components/layouts/sectionLayout";
import ContactPage from "@molecule/contactPage";
import Section from "@molecule/section";

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
