import SectionLayout from "@components/layouts/sectionLayout";
import PravacyPoliicyPage from "@molecule/privacyPolicyPage";
import Section from "@molecule/section";

const PrivacyPolicyComponent = () => {
  return (
    <Section>
      <SectionLayout>
        <PravacyPoliicyPage />
      </SectionLayout>
    </Section>
  );
};

export default PrivacyPolicyComponent;
