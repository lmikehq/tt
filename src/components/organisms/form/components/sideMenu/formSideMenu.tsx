import Flex from "@components/templates/flex";
import PaymentSummaryPane from "src/components/molecules/payment/PaymentSummaryPane";
import Section from "src/components/molecules/section";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import { isValid } from "date-fns";
import SaveProgressAndContinueLater from "./saveProgress";
import VisApplicationFormDetails from "./visaApplicationFormDetails";
import Text from "@atom/text";
import { VisaApplicationFormInterface } from "@lib/types";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

interface FormSideMenuProps {
  currentPhase: number;
  formData: VisaApplicationFormInterface;
  onClose?: () => void;
  saveProgress?: () => void;
}
const FormSideMenu = ({
  currentPhase,
  formData,
  onClose,
  saveProgress,
}: FormSideMenuProps) => {
  const { isMobile } = useScreenResolution();

  function getPaymentInformation(field: string) {
    let accompanies = 0;

    //  return (
    //    parseInt(processingFee) +
    //    parseInt(acccompanyingFee) * visaDetails.accompanying
    //  );
    if (formData.familyMembers.length > 0) {
      formData.familyMembers.forEach((member) => {
        if (member.accompanying) accompanies++;
      });
    }
    switch (field) {
      case "fee":
        return accompanies > 0
          ? parseInt(
              process.env.NEXT_PUBLIC_FAMILY_VISA_APPLICATION_FEE || "20000"
            )
          : parseInt(
              process.env.NEXT_PUBLIC_SINGLE_VISA_APPLICATION_FEE || "30000"
            );
      case "numberOfPersons":
        return accompanies + 1;
      case "applicationType":
        return formData.tripDetails.applicationType;
      default:
        return 0;
    }
  }
  return (
    <Flex direction="column" height="100%">
      {(() => {
        if (currentPhase <= 6) {
          return !isValid ? (
            <Section margin="0 0 2rem 0">
              <Text
                type="p"
                text={`Please select a 
          ${!formData.tripDetails.destination ? "destination and" : ""} 
          ${!formData.tripDetails.homeCountry ? "home country" : ""}`}
              />
            </Section>
          ) : (
            <VisApplicationFormDetails formData={formData} onClose={onClose} />
          );
        } else if (currentPhase > 6) {
          return (
            <PaymentSummaryPane
              numberOfPersons={Number(getPaymentInformation("numberOfPersons"))}
              visaApplicationType={getPaymentInformation(
                "applicationType"
              ).toString()}
              fee={currencyFormatter(getPaymentInformation("fee").toString())}
              totalFee={currencyFormatter(
                getPaymentInformation("fee").toString()
              )}
            />
          );
        }
      })()}
      <Section>
        <SaveProgressAndContinueLater saveProgress={saveProgress} />
      </Section>
    </Flex>
  );
};

export default FormSideMenu;
