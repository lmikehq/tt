import VoucherForm from "@/components/organisms/form/components/voucherForm";
import { PaymentCompleteSection } from "@/components/organisms/paymentConfirmationModal";
import CustomConfirmationModal from "@/components/organisms/visaApplicationModal";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useUserStore } from "@lib/store/useStore";
import { useVoucherStore } from "@lib/store/voucher.store";
import { FieldInput, FieldString } from "@organism/fieldInput";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { BsExclamationCircleFill } from "react-icons/bs";
import Section from "src/components/molecules/section";
import { CustomRadioGroup } from "../radio";
import SearchStringInput from "../searchInputs/searchStringInput";
import ReusableModal from "./components/dashboardModal";
import { Radio } from "@mui/material";

type VisaPaymentModalProps = {
  open: boolean;
  onClose: () => void;
  visaDetails: {
    intent: string;
    id: string;
    accompanying: number;
    refetch: () => void;
  };
};

const VisaPaymentModal: React.FC<VisaPaymentModalProps> = ({
  open,
  onClose,
  visaDetails,
}) => {
  const { isMobile } = useScreenResolution();
  const [paymentType, setPaymentType] = useState("full_payment");
  const formik = useFormik({
    initialValues: { amount: 0 },
    onSubmit: () => { },
  });

  // console.log({ visaDetails });
  function paymentAmount() {
    switch (visaDetails.intent) {
      case "PROCESSING FEE":
        const processingFee =
          process.env.NEXT_PUBLIC_SINGLE_VISA_PROCESSING_FEE ||
          "1000000";
        const acccompanyingFee =
          process.env
            .NEXT_PUBLIC_ADDITIONAL_ACCOMPANYING_VISA_PROCESSING_FEE ||
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
            process.env.NEXT_PUBLIC_FAMILY_VISA_APPLICATION_FEE ||
            "20000"
          )
          : parseInt(
            process.env.NEXT_PUBLIC_SINGLE_VISA_APPLICATION_FEE ||
            "30000"
          );
      // return visaDetails.accompanying === 0 ? "200" : "250";
      default:
        return "2500000";
    }
  }
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { user } = useUserStore((state) => state);
  const router = useRouter();
  const { applied, voucher, useVoucher } = useVoucherStore((state) => state);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [currency, setCurrency] = useState("NGN - Nigerian Naira");
  const createPayment = async () => {
    if (
      paymentType === "part_payment" &&
      installmentAmount < Number(paymentAmount()) / 4
    ) {
      toast.error(
        "Amount must be greater than or equal to 25% of the total amount"
      );
      setLoading(false);
      return;
    }
    return await apiService("/payment/create-visa-fee-charge", "POST", {
      currency: "NGN",
      gateway: "Kora",
      service: "VISA",
      user: user?._id,
      serviceID: visaDetails.id,
      paymentIntent: visaDetails.intent,
      ...(paymentType === "part_payment" && {
        isPartPayment: true,
        amount: Number(installmentAmount),
      }),
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
  function useApplyVoucher() {
    useVoucher({
      promoCode: voucher as string,
      serviceId: visaDetails.id,
    }).then(() => {
      visaDetails.refetch();
      onClose();
      // SHOULD THE MODAL FOR APPLICATION STATUS SHOWING THE PAY PROCESSING FEE / DOWNLOAD APPLICATION SHOW UP HERE AS WELL ?
      setSuccessModalOpen(true);
    });
  }
  const [loading, setLoading] = useState(false);
  return (
    <>
      <CustomConfirmationModal
        handleClose={() => {
          setSuccessModalOpen(false);
          onClose();
          router.push("/dashboard");
        }}
        open={successModalOpen}
        child={
          <PaymentCompleteSection
            handleModalClose={() => {
              setSuccessModalOpen(false);
              onClose();
              router.push("/dashboard");
            }}
            title="Application Submitted"
            description="Your application has been submitted successfully, and a travel voucher was used to pay for your application. Thank you for trusting Thrillers Travels."
          />
        }
      />
      <ReusableModal
        open={open}
        onClose={() => {
          onClose();
          setLoading(false);
        }}
        maxWidth={isMobile ? '450px' : '647px'}
        headerText={"Make Payment"}
        description="Kindly make payment for required Visa Application Processing."
        loading={loading}
        setLoading={setLoading}
        buttonProps={{
          text:
            applied && visaDetails.intent === "FORM FEE"
              ? "Submit Application"
              : "Make Payment",
          onClick:
            applied && visaDetails.intent === "FORM FEE"
              ? useApplyVoucher
              : createPayment,
        }}
      >
        {/* Additional content goes here */}
        <Section margin="2rem 0">
          <Section margin="1.75rem 0px 1.1rem">
            <Flex align="center" gap="0rem" justify="center">
              <Text
                type="h1"
                size={38}
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
          {/* <Section>
            <Text type="p" text="Select Payment Type" />
            <Flex width="auto" align="center" justify="flex-start" gap="32px">
              <Flex align="center">
                <Radio />
                <Text type="label" text="Full Payment" />
              </Flex>
              <Flex align="center">
                <Radio />
                <Text type='label' text="Part Payment" />
              </Flex>
            </Flex>
          </Section> */}

          <Section margin="0px">
            {visaDetails.intent === "PROCESSING FEE" && (
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
                        {
                          value: "full_payment",
                          label: "Full Payment",
                        },
                        {
                          value: "part_payment",
                          label: "Part Payment",
                        },
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
                {paymentType === "part_payment" && (
                  <Section>
                    <Section margin="1.5rem 0 1.75rem 0">
                      <Text
                        type="p"
                        styles={{ display: "inline" }}
                        text="You are expected to pay the Visa Processing fee Payment in not less than 4 Installments. The least amount should be "
                      />
                      <Text
                        type="p"
                        text={currencyFormatter(
                          Number(paymentAmount()) / 4
                        )}
                        styles={{ display: "inline" }}
                      />
                    </Section>
                    <Section margin="0 0 1.5rem 0">
                      <Text
                        text={"Enter amount"}
                        weight={400}
                        size={18}
                        type={"h5"}
                        margin={"0 0 1rem 0"}
                      />
                      <Section>
                        <FieldInput
                          name="installmentalAmount"
                          // value={currencyFormatter(installmentAmount).replace('NGN', '')}
                          placeholder={`${Number(
                            paymentAmount()
                          ) / 4
                            }`}
                          formik={formik}
                          max={Number(
                            paymentAmount()
                          )}
                          type="number"
                          min={
                            Number(
                              paymentAmount()
                            ) / 4
                          }
                          onChange={(e) =>
                            setInstallmentAmount(
                              e.target.value
                            )
                          }
                        />
                      </Section>
                    </Section>
                  </Section>
                )}
              </Section>
            )}
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Select Currency"
                margin={
                  isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                }
              />
            </Flex>
            {/* <SearchStringInput
              options={["NGN - Nigerian Naira"]}
              onChange={(e) => 
              placeholder={""}
              value={currency}
            /> */}
            <FieldString
              name="currency"
              formik={formik}
              value={currency}
              placeholder="NGN - Nigerian Naira"
              options={["NGN - Nigerian Naira"]}
              onChange={(e) => setCurrency(e)}
            />
          </Section>
          {!isMobile && (
            <Section margin="-10px 0px 24px">
              <Flex
                align="center"
                justify="flex-start"
                gap="10px"
              >
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
          {visaDetails.intent === "FORM FEE" && <VoucherForm modal />}
        </Section>
      </ReusableModal>
    </>
  );
};

export default VisaPaymentModal;
