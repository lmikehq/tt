import Flex from "@atom/flex";
import Text from "@atom/text";
import PaymentSummaryPane from "@molecule/payment/PaymentSummaryPane";
import Section from "@molecule/section";
import currencyFormatter from "data/currencyFormatter";
import { isValid } from "date-fns";
import { VisaApplicationFormInterface } from "types";
import SaveProgressAndContinueLater from "./saveProgressAndContinueLater";
import VisApplicationFormDetails from "./visaApplicationFormDetails";

interface FormSideMenuProps {
  currentPhase: number;
  formData: VisaApplicationFormInterface;
  onClose?: () => void;
  saveProgressAndContinueLater?: () => void;
}
const FormSideMenu = ({
  currentPhase,
  formData,
  onClose,
  saveProgressAndContinueLater,
}: FormSideMenuProps) => {
  function getPaymentInformation(field: string) {
    let accompanies = 0;
    if (formData.familyMembers.length > 0) {
      formData.familyMembers.forEach((member) => {
        if (member.accompanying) accompanies++;
      });
    }
    switch (field) {
      case "fee":
        return accompanies > 0 ? 30000 : 20000;
      case "numberOfPersons":
        return accompanies + 1;
      case "applicationType":
        return formData.applicationType;
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
          ${!formData.destination ? "destination and" : ""} 
          ${!formData.homeCountry ? "home country" : ""}`}
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
        <SaveProgressAndContinueLater
          saveProgressAndContinueLater={saveProgressAndContinueLater}
        />
      </Section>
    </Flex>
  );
};

export default FormSideMenu;
