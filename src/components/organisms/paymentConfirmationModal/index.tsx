"use client";
import { ApplicationStatus } from "@/components/molecules/dashboardTabs/components/applicationStatusModal";
import ResponseModal from "@/components/molecules/dashboardTabs/components/responseModal";
import ErrorAddingDependant from "@/components/molecules/dashboardTabs/components/visa/errorAddingDependantModal";
import VisaPaymentModal from "@/components/molecules/dashboardTabs/visaPayment";
import Button from "@atom/button";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { ttColors } from "@lib/theme/colors";
import Section from "@molecule/section";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "@organism/visaApplicationModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";

export const PaymentCompleteSection = ({
  handleModalClose,
  title,
  description,
}: {
  handleModalClose: () => void;
  title?: string;
  description?: string;
}) => {
  const router = useRouter();
  const { isMobile } = useScreenResolution();


  return (
    <Section
      padding={isMobile ? "3rem 1rem" : "3rem 6rem"}
      height="unset"
      styles={{
        backgroundImage: `url(${"/assets/image/modal/confetti.png"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
      }}
    >
      <Flex direction="column" justify="center">
        <Section
          margin="0 auto 14px auto"
          height="78.58px"
          width="79.58px"
          styles={{ borderRadius: "50%", background: ttColors.light }}
        >
          <BiSolidCheckCircle size={79.58} color={ttColors.primary} />
        </Section>
        <Section margin="0 0  24px" height="unset">
          <Text
            type="p"
            text={title || "Payment Completed Successfully"}
            size={32}
            weight={700}
            color={ttColors.dark}
          />
        </Section>
        <Section margin="0 0  57.5px" height="unset">
          <Text
            type="p"
            text=" Congratulations!!."
            size={18}
            weight={400}
            color="#929292"
          />
          <br />
          <Text
            type="p"
            text={
              description ||
              "Your payment was successful, please login to your dashboard to continue. Thank you for trusting Thrillers Travels."
            }
            weight={400}
            size={18}
            color="#929292"
          />
        </Section>
        <Section>
          <Flex width="100%" gap="8px" direction="column">
            <Button
              width="100%"
              background={ttColors.dark}
              color={ttColors.light}
              onClick={() => {
                router.push("/visa/apply");
                handleModalClose();
              }}
            >
              Make another Application
            </Button>
            <Button
              width="100%"
              background="transparent"
              color={ttColors.dark}
              border="1px solid #19013b"
              onClick={() => {
                handleModalClose();
                router.push("/dashboard");
              }}
            >
              Go to Dashboard
            </Button>
          </Flex>
        </Section>
      </Flex>
    </Section>
  );
};

const PaymentConfirmationModal = () => {
  const params = useSearchParams();
  const paymentRef = params.get("paymentRef");
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const [status, setStatus] = useState<{
    status: string,
    service: string,
    paymentIntent: string;
    serviceID: string;
  }>({
    status: "",
    service: "",
    paymentIntent: "",
    serviceID: ""
  });

  const [open, setOpen] = useState({
    name: '',
    state: false
  });

  const handleClose = (name: string) => {
    setOpen({
      name: name,
      state: false
    });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [modalContent, setModalContent] = useState<
    Omit<CustomConfirmationModalProps, "open" | "handleClose">
  >({
    icon: <></>,
    title: "",
    description: "",
    subTitle: "",
    buttons: <></>,
  });

  const router = useRouter();

  const handlePaymentFailed = () => {
    setModalContent({
      child: (
        <Section padding="3rem 6rem" height="unset">
          <Flex direction="column" justify="center">
            <Section margin="0 0  14px" height="unset">
              <BiSolidXCircle size={79.58} color={ttColors.red} />
            </Section>
            <Section margin="0 0  24px" height="unset">
              <Text
                type="h3"
                text="Payment Failed"
                size={32}
                weight={700}
                color={ttColors.dark}
              />
            </Section>
            <Section margin="0 0  57.5px" height="unset">
              <Text
                type="p"
                text=" Ouch!!."
                size={18}
                weight={400}
                color="#929292"
              />
              <br />
              <Text
                type="p"
                text="Sorry, your application payment was not
          successful."
                weight={400}
                size={18}
                color="#929292"
              />
            </Section>
            <Section>
              <Flex width="100%" gap="8px" direction="column">
                {/* <Button
                  width="100%"
                  background={ttColors.dark}
                  color={ttColors.light}
                  onClick={() => {
                    setModalOpen(false);
                    router.push("/dashboard");
                  }}
                >
                  Try payment again
                </Button> */}
                <Button
                  width="100%"
                  background="transparent"
                  color={ttColors.dark}
                  border="1px solid #19013b"
                  onClick={() => {
                    handleModalClose();
                    router.push("/dashboard");
                  }}
                >
                  Go to Dashboard
                </Button>
              </Flex>
            </Section>
          </Flex>
        </Section>
      ),
    });
    handleModalOpen();
  };

  const handlePaymentComplete = () => {
    setModalContent({
      child: (
        <PaymentCompleteSection handleModalClose={() => setModalOpen(false)} />
      ),
    });
    handleModalOpen();
  };

  const verifyKoraPayment = async () => {
    return apiService(`/payment/${paymentRef}/status`);
  };
  useEffect(() => {
    if (!paymentRef) return;
    verifyKoraPayment().then((res) => {
      // set state
      setStatus((prev) => {
        return {
          status: res?.status,
          service: res?.service,
          serviceID: res?.serviceID,
          paymentIntent: res?.paymentIntent
        };
      });

      if (res?.status === "SUCCESS") {
        switch (res?.paymentIntent) {
          case 'ADDITIONAL DEPENDANT FEE':
            return setOpen({ name: 'dependant-payment-is-successful-modal', state: true });
          case 'FORM FEE':
            // update the url params

            return setOpen({ name: 'form-fee-payment-is-successful-modal', state: true });
          default:
            handlePaymentComplete();
        }
      } else {
        switch (res?.paymentIntent) {
          case 'ADDITIONAL DEPENDANT FEE':
            return setOpen({ name: "dependant-payment-is-not-successful-modal", state: true });

          default:
            handlePaymentFailed();
        }


      }
    });
  }, [paymentRef]);
  return (
    <>
      <CustomConfirmationModal
        open={modalOpen}
        handleClose={handleModalClose}
        {...modalContent}
      />

      <ResponseModal
        state={open.state && open.name === 'dependant-payment-is-successful-modal'}
        onClose={() => handleClose('dependant-payment-is-successful-modal')}
        headerText="Dependant Successfully Added"
        description="Your application has been updated with the new dependant information. Thank you for choosing our services."
      />

      <ErrorAddingDependant
        open={open.state && open.name === 'dependant-payment-is-not-successful-modal'}
        onClose={() => handleClose('dependant-payment-is-not-successful-modal')}
      />

      {/* SHOW APPLICATION STATUS AFTER THE USER HAS MADE SUCCESSFUL FORM FEE PAYMENT */}
      <ApplicationStatus
        state={open.state && open.name === 'form-fee-payment-is-successful-modal'}
        onClose={() => handleClose("form-fee-payment-is-successful-modal")}
        serviceID={status.serviceID}
        setState={setOpen}
      // openPaymentModal={setPaymentModal}
      />

      {/* SHOW PAYMENT MODAL, IF THE USER DECIDES TO MAKE PAYMENT FOR PROCESSING FEE */}
      <VisaPaymentModal
        open={open.state && open.name === 'processing-fee-payment-modal'}
        onClose={() => handleClose('processing-fee-payment-modal')}
        visaDetails={{
          id: status.serviceID,
          intent: 'PROCESSING FEE',
          accompanying: 0,
          refetch: () => { }
        }}
      />
    </>
  );
};

export default PaymentConfirmationModal;
