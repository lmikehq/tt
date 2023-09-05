import Breadcrumb from "src/components/atoms/breadcrumb";
import SectionLayout from "src/components/layouts/sectionLayout";
import FaqSection from "src/components/molecules/faq";
import Section from "src/components/molecules/section";

const FaqsComponent = () => {
  return (
    <Section styles={{ paddingTop: "1rem" }}>
      <Breadcrumb />
      <SectionLayout>
        <FaqSection />
      </SectionLayout>
    </Section>
  );
};

export default FaqsComponent;
