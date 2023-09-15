import Text from "@atom/text";
import Flex from "@components/templates/flex";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { useVoucherStore } from "@lib/store/voucher.store";
import { FieldString } from "@organism/fieldInput";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import Section from "src/components/molecules/section";
import ReusableModal from "./components/dashboardModal";

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
        const processingFee =
          process.env.NEXT_PUBLIC_SINGLE_VISA_PROCESSING_FEE || "1000000";
        const acccompanyingFee =
          process.env.NEXT_PUBLIC_ADDITIONAL_ACCOMPANYING_VISA_PROCESSING_FEE ||
          "200000";
        return (
          parseInt(processingFee) +
          parseInt(acccompanyingFee) * visaDetails.accompanying
        );
      // return visaDetails.accompanying === 0
      //   ? process.env.NEXT_PUBLIC_SINGLE_VISA_PROCESSING_FEE || "1000000"
      //   : process.env.NEXT_PUBLIC_FAMILY_VISA_PROCESSING_FEE || "2000";
      case "VISA FEE":
        return "1000";
      case "FORM FEE":
        // const formFee =
        //   process.env.NEXT_PUBLIC_SINGLE_VISA_APPLICATION_FEE || "10000";
        // const accompanying =
        //   process.env.NEXT_PUBLIC_ADDITIONAL_ACCOMPANYING_VISA_PROCESSING_FEE ||
        //   "200000";
        // return parseInt(formFee) + parseInt(accompanying) * visaDetails.accompanying;
        return visaDetails.accompanying > 0
          ? parseInt(
              process.env.NEXT_PUBLIC_FAMILY_VISA_APPLICATION_FEE || "20000"
            )
          : parseInt(
              process.env.NEXT_PUBLIC_SINGLE_VISA_APPLICATION_FEE || "30000"
            );
      // return visaDetails.accompanying === 0 ? "200" : "250";
      default:
        return "2500000";
    }
  }

  const { user } = useUserStore((state) => state);
  const { applied, voucher } = useVoucherStore((state) => state);
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
