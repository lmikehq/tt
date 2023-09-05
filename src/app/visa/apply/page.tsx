import ApplicationForm from "src/components/organisms/form/applicationForm";
import ApplicationWrapper from "./components/ApplicationWrapper";

// interface pageProps {
//   params: Qparams;
// }

export default async function VisaApplicationPage() {
  return (
    <ApplicationWrapper>
      <ApplicationForm />
    </ApplicationWrapper>
  );
}
