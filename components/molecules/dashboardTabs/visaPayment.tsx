import Text from "@atom/text";
import Section from "@molecule/section";
import { useScreenResolution } from "hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Flex from "@atom/flex";
import { TbCurrencyNaira } from "react-icons/tb";
import { FieldString } from "@atom/fieldInput";
import { Formik } from "formik";
import { BsExclamationCircleFill } from "react-icons/bs";

type VisaPaymentModalProps = {
  open: boolean;
  onClose: () => void;
};

const VisaPaymentModal: React.FC<VisaPaymentModalProps> = ({
  open,
  onClose,
}) => {
  const { isMobile } = useScreenResolution();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Make Payment"
      description="Kindly make payment for required Visa Application Process."
    >
      {/* Additional content goes here */}
      <Section margin="3rem 0px 1.5rem">
        <Flex align="center" gap="0rem" justify="center">
          <TbCurrencyNaira
            size="2rem"
            style={{ position: "relative", top: "0px", left: "3px" }}
          />
          <Text type="h1" text="20,000" />
        </Flex>
        <Text type="p" text="Visa Application Payment" />
      </Section>
      <Section margin="0px">
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text="Select Currency"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
        </Flex>
        <FieldString
          options={["NGN - Nigerian Naira", "USD", "EUR", "GBP"]}
          name="currency"
          placeholder="NGN - Nigerian Naira"
          formik={Formik}
        />
      </Section>
      <Section margin="-10px 0px 2.5rem">
        <Flex align="center" justify="flex-start" gap="10px">
          <BsExclamationCircleFill
            color="#6092A7"
            size="2.5rem"
            style={{
              position: "relative",
              top: "-10px",
            }}
          />
          <Text
            type="p"
            text="Only the Nigerian currency naira (Naira) is active for now. Other currencies will be made available soon."
            styles={{ textAlign: "left" }}
          />
        </Flex>
      </Section>
    </ReusableModal>
  );
};

export default VisaPaymentModal;
