import Breadcrumb from "@atom/breadcrumb";
import PrivacyPoliicyPage from "@molecule/privacyPolicyPage";
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
      <PrivacyPoliicyPage />
    </Section>
  );
};

export default PrivacyPolicyComponent;
