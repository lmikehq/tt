import Breadcrumb from "@atom/breadcrumb";
import SectionLayout from "@components/layouts/sectionLayout";
import PravacyPoliicyPage from "@molecule/privacyPolicyPage";
import Section from "@molecule/section";

const PrivacyPolicyComponent = () => {
  return (
    <Section
      styles={{
        paddingTop: "2rem",
      }}
    >
      <Breadcrumb />
      <SectionLayout>
        <PravacyPoliicyPage />
      </SectionLayout>
    </Section>
  );
};

export default PrivacyPolicyComponent;
