import SectionLayout from "@components/layouts/sectionLayout";
import FaqSection from "@molecule/faq";
import Section from "@molecule/section";

const FaqsComponent = () => {
  return (
    <Section>
      <SectionLayout>
        <FaqSection />
      </SectionLayout>
    </Section>
  );
};

export default FaqsComponent;
