"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import Text from "@atom/text";
import Confetti from "@image/modal/confetti.png";
import Section from "@molecule/section";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "@organism/visaApplicationModal";
import apiService from "hook/apiService";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidXCircle } from "react-icons/bi";
import { ttColors } from "theme/colors";

export const PaymentCompleteSection = ({
  handleModalClose,
  title,
  description,
}: {
  handleModalClose?: () => void;
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
        backgroundImage: `url(${Confetti.src})`,
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
                handleModalClose;
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
                handleModalClose;
                router.push("/dashboard");
              }}
            >
              Back to dashboard
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
                <Button
                  width="100%"
                  background={ttColors.dark}
                  color={ttColors.light}
                  onClick={() => {
                    setModalOpen(false);
                    router.push("/dashboard");
                  }}
                >
                  Try payment again
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
                  Back to dashboard
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
      if (res?.status === "SUCCESS") {
        handlePaymentComplete();
      } else {
        handlePaymentFailed();
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
    </>
  );
};

export default PaymentConfirmationModal;
