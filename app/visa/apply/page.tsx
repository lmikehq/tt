import SectionLayout from "@components/layouts/sectionLayout";
import canada from "@image/canada-cover.png";
import SectionTitle from "@molecule/sectionTitle";
import AllCountryHead from "@organism/AllCountry/allCountryHead";
import ApplicationForm from "@organism/form/applicationForm";
import ApplicationWrapper from "./components/ApplicationWrapper";

// interface pageProps {
//   params: Qparams;
// }

export default async function VisaApplicationPage() {
  return (
    <div>
      <AllCountryHead cover={canada} title="CANADA" />
      <SectionLayout>
        <SectionTitle
          title="Apply Now for Canada Employment Visa"
          description="We'll Handle Your Travel Documentation Hassles, and Ensure a Seamless travel experience for you"
          showButton={false}
        />
        <ApplicationWrapper>
          <ApplicationForm />
        </ApplicationWrapper>
      </SectionLayout>
    </div>
  );
}
