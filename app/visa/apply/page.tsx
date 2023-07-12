import SectionLayout from "@components/layouts/sectionLayout";
import canada from "@image/canada-cover.png";
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
        <ApplicationWrapper>
          <ApplicationForm />
        </ApplicationWrapper>
      </SectionLayout>
    </div>
  );
}
