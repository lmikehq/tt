import { BlogPage } from "@/components/molecules/blog";
import SectionLayout from "@components/templates/SectionLayout";
import Section from "src/components/molecules/section";

const Contact = () => {
  return (
    <Section styles={{ paddingTop: "2rem" }}>
      <SectionLayout>
        <BlogPage />
      </SectionLayout>
    </Section>
  );
};

export default Contact;

 