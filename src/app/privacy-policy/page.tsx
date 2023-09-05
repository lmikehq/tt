import Breadcrumb from "src/components/atoms/breadcrumb";
import PrivacyPoliicyPage from "src/components/molecules/privacyPolicyPage";
import Section from "src/components/molecules/section";

const PrivacyPolicyComponent = () => {
  return (
    <Section
      styles={{
        paddingTop: "2rem",
      }}
    >
      <Breadcrumb />
      <PrivacyPoliicyPage />
    </Section>
  );
};

export default PrivacyPolicyComponent;
