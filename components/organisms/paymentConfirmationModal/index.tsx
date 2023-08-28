"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import Section from "@molecule/section";
import CustomConfirmationModal, {
  CustomConfirmationModalProps,
} from "@organism/visaApplicationModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidCheckCircle, BiSolidXCircle, BiXCircle } from "react-icons/bi";
import { ttColors } from "theme/colors";
import Confetti from "@image/modal/confetti.png";

const PaymentConfirmationModal = () => {
  const params = useSearchParams();
  const status = params.get("application");
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
                text="Visa Payment Failed"
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
                text="Sorry that your Visa Application payment wasn’t
          successfully."
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
                  // border="1px solid #19013b"
                  onClick={handleModalClose}
                >
                  Try payment again
                </Button>
                <Button
                  width="100%"
                  background="transparent"
                  color={ttColors.dark}
                  border="1px solid #19013b"
                  onClick={handleModalClose}
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
        <Section
          padding="3rem 6rem"
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
                text="Visa Application Completed"
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
                text="Your application has been submitted and currently being reviewed by our administrative officer. Your details and information will be reviewed and we will get back to you for further steps."
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
                  // border="1px solid #19013b"
                  onClick={handleModalClose}
                >
                  Make another Application
                </Button>
                <Button
                  width="100%"
                  background="transparent"
                  color={ttColors.dark}
                  border="1px solid #19013b"
                  onClick={handleModalClose}
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
  useEffect(() => {
    if (!status) return;
    if (status == "NOT PAID") {
      handlePaymentFailed();
    } else {
      handlePaymentComplete();
    }
  }, [status]);
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
