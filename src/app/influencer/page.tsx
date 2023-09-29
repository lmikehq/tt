import Breadcrumb from "@organism/breadcrumb";
import SectionLayout from "@components/templates/SectionLayout";
import Section from "src/components/molecules/section";
import InfluencerPage from "@/components/molecules/influencer";

const Influencer = () => {
  return (
    <Section styles={{ paddingTop: "1rem" }}>
      {/* <Breadcrumb /> */}
      <SectionLayout>
        <InfluencerPage />
      </SectionLayout>
    </Section>
  );
};

export default Influencer;
