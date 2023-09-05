import Text from "src/components/atoms/text";
import Section from "src/components/molecules/section";
import { useScreenResolution } from "hook/useScreenResolution";
import ReusableModal from "./components/dashboardModal";
import Flex from "src/components/atoms/flex";
import { TbCurrencyNaira } from "react-icons/tb";
import { FieldString } from "src/components/atoms/fieldInput";
import { Formik } from "formik";
import { BsExclamationCircleFill } from "react-icons/bs";
import currencyFormatter from "data/currencyFormatter";
import apiService from "hook/apiService";
import { toast } from "react-hot-toast";
import { useUserStore } from "store/useStore";

type VisaPaymentModalProps = {
  open: boolean;
  onClose: () => void;
  visaDetails: {
    intent: string;
    id: string;
    accompanying: number;
  };
};

const VisaPaymentModal: React.FC<VisaPaymentModalProps> = ({
  open,
  onClose,
  visaDetails,
}) => {
  const { isMobile } = useScreenResolution();
  function paymentAmount() {
    switch (visaDetails.intent) {
      case "PROCESSING FEE":
        return visaDetails.accompanying === 0
          ? process.env.NEXT_PUBLIC_SINGLE_VISA_PROCESSING_FEE || "1000000"
          : process.env.NEXT_PUBLIC_FAMILY_VISA_PROCESSING_FEE || "2000";
      default:
        return "2500000";
    }
  }

  const { user } = useUserStore((state) => state);

  const createPayment = async () => {
    return await apiService("/payment/create-form-fee-charge", "POST", {
      currency: "NGN",
      gateway: "Kora",
      service: "VISA",
      user: user?._id,
      serviceID: visaDetails.id,
      paymentIntent: visaDetails.intent,
    }).then((response) => {
      if (response.statusCode == 200 || response.statusCode == 201) {
        window.open(response.data.data.checkout_url, "_self");
        return response.data;
      } else {
        toast.error(response.errorMessage);
        throw response;
      }
    });
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Make Payment"
      description="Kindly make payment for required Visa Application Process."
      buttonProps={{
        text: "Make Payment",
        onClick: createPayment,
      }}
    >
      {/* Additional content goes here */}
      <Section margin="3rem 0px 1.5rem">
        <Flex align="center" gap="0rem" justify="center">
          <Text type="h1" text={currencyFormatter(paymentAmount())} />
        </Flex>
        <Text type="p" text={visaDetails.intent} />
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
          options={["NGN - Nigerian Naira"]}
          name="currency"
          value="NGN - Nigerian Naira"
          placeholder=""
          formik={Formik}
          onChange={() => {}} // Handle the change event
        />
      </Section>
      {!isMobile && (
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
      )}
    </ReusableModal>
  );
};

export default VisaPaymentModal;
