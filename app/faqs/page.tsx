import Breadcrumb from "@atom/breadcrumb";
import SectionLayout from "@components/layouts/sectionLayout";
import FaqSection from "@molecule/faq";
import Section from "@molecule/section";

const FaqsComponent = () => {
  return (
    <Section styles={{paddingTop: '1rem'}}>
      <Breadcrumb />
      <SectionLayout>
        <FaqSection />
      </SectionLayout>
    </Section>
  );
};

export default FaqsComponent;
