import Text from "@atom/text";
import Flex from "@components/templates/flex";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { useVoucherStore } from "@lib/store/voucher.store";
import { FieldInput, FieldString } from "@organism/fieldInput";
import { Formik, useFormik } from "formik";
import { toast } from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import Section from "src/components/molecules/section";
import ReusableModal from "./components/dashboardModal";
import { ChangeEvent, useState } from "react";
import { CustomRadioGroup } from "../radio";

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
  const [paymentType, setPaymentType] = useState("full_payment");
  const formik = useFormik({ initialValues: {}, onSubmit: () => {} });
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
  // const { applied, voucher } = useVoucherStore((state) => state);
  const createPayment = async () => {
    return await apiService("/payment/create-visa-fee-charge", "POST", {
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
  const [loading, setLoading] = useState(false);

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      headerText="Make Payment"
      description="Kindly make payment for required Visa Application Process."
      loading={loading}
      setLoading={setLoading}
      buttonProps={{
        text: "Make Payment",
        onClick: createPayment,
      }}
    >
      {/* Additional content goes here */}
      <Section margin="2rem 0">
        <Section margin="2.75rem 0px 4.1rem">
          <Flex align="center" gap="0rem" justify="center">
            <Text
              type="h1"
              size={48}
              weight={600}
              text={currencyFormatter(paymentAmount())}
            />
          </Flex>
          <Text
            type="p"
            margin={0}
            size={16}
            weight={400}
            color="#929292"
            textAlign="center"
            text={visaDetails.intent}
          />
        </Section>
        <Section margin="0px">
          <Section>
            <Section>
              <Text
                text={"Select Payment Type"}
                weight={400}
                size={18}
                type={"h5"}
                margin={"0 0 1.125rem 0"}
              />
              <Section width="fit-content">
                <CustomRadioGroup
                  options={[
                    { value: "full_payment", label: "Full Payment" },
                    { value: "part_payment", label: "Part Payment" },
                  ]}
                  name="paymentType"
                  value={paymentType}
                  onChange={(e: ChangeEvent<any>) =>
                    setPaymentType(e.target.value)
                  }
                  justifyContent="flex-end"
                />
              </Section>
            </Section>
            <Section>
              <Section margin="1.5rem 0 1.75rem 0">
                <Text
                  type="p"
                  styles={{ display: "inline" }}
                  text="You are expected to make the Visa Application Payment in 3 Installments. The least amount should be "
                />
                <Text type="p" text="# 4000" styles={{ display: "inline" }} />
              </Section>
              <Section margin="0 0 2.5rem 0">
                <Text
                  text={"Enter amount"}
                  weight={400}
                  size={18}
                  type={"h5"}
                  margin={"0 0 1.125rem 0"}
                />
                <Section>
                  <FieldInput
                    name="installmentalAmount"
                    placeholder="Enter Last Name"
                    formik={formik}
                  />
                </Section>
              </Section>
            </Section>
          </Section>
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
      </Section>
    </ReusableModal>
  );
};

export default VisaPaymentModal;
