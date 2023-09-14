"use client";
import Section from "src/components/molecules/section";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import { format } from "date-fns";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useState } from "react";
import { HiClock } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { PiDotsThreeCircleLight, PiWalletLight } from "react-icons/pi";
import { useVoucherStore } from "@lib/store/voucher.store";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import VisaPaymentModal from "../visaPayment";
import { AiOutlineCheck } from "react-icons/ai";

const Logo = styled.div`
  height: 64px;
  width: 80px;
  border: 1px solid ${ttColors.primary};
  padding: 10px;
  border-radius: 8px;

  @media screen and (max-width: 900px) {
    height: 41px;
    width: 65px;
  }
`;

const DateIcon = styled.div`
  background: #ebf6f2 !important;
  padding: 10px;
  height: 45px;
  width: 46px;
  border-radius: 8px;
`;

const VisaStatus = styled.div`
  display: grid;
  place-content: center;
  background: #fffeef;
  padding: 14px 18px;
  border-radius: 24px;
  height: 45px;
  width: 25%;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

interface VisaDataProps {
  // countryLogoSrc: string;
  visa?: any;
  // applicationDate: string;
  // paymentFee: string;
  // visaStatus: string;
  // downloadButtonText: string;
  // onDownloadStatusClick: () => void;
}

function VisaDetail({ visa }: { visa: any }) {
  const { isMobile } = useScreenResolution();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  function getButtonInformation() {
    let visaInformation = {
      text: "",
      fn: () => {},
      disabled: false,
      intent: "",
    };
    switch (visa?.applicationStatus) {
      case "APPROVED":
        visaInformation = {
          text: "Download Visa",
          fn: () => {},
          disabled: false,
          intent: "",
        };
        break;
      case "DECLINED":
        visaInformation = {
          text: "Download Visa",
          fn: () => {},
          disabled: false,
          intent: "",
        };
        break;
      case "APPLICATION IN PROGRESS":
        visaInformation = {
          text: "...",
          fn: () => {},
          disabled: false,
          intent: "",
        };
        break;
      case "FORM FEE REQUESTED":
        visaInformation = {
          text: "Submit Application",
          fn: () => {
            setIsModalOpen(true);
          },
          disabled: false,
          intent: "FORM FEE",
        };
        break;
      case "PROCESSING FEE REQUESTED":
        visaInformation = {
          text: "Pay Processing Fee",
          fn: () => {
            setIsModalOpen(true);
          },
          disabled: false,
          intent: "PROCESSING FEE",
        };
        break;
      default:
        visaInformation = {
          text: "Pay Visa Fee",
          fn: () => {},
          disabled: false,
          intent: "",
        };
    }

    return visaInformation;
  }

  const recentPayment = visa?.payments[visa?.payments.length - 1];
  const textAndBgColor =
    visa?.applicationStatus === "DECLINED"
      ? { text: "#9C0000", bg: "#FFF1F1" }
      : visa?.applicationStatus === "APPROVED"
      ? { text: "#1A820A", bg: "#F1FFF2" }
      : visa?.applicationStatus === "AWAITING CONFIRMATION"
      ? { text: "#7A7422", bg: "FFFEEF" }
      : visa?.applicationStatus === "FORM FEE REQUESTED"
      ? { text: "#fff", bg: "#8f3d3d" }
      : { text: "#37008A", bg: "#F6F0FF" };
  // const { applied, voucher } = useVoucherStore((state) => state);

  return (
    <Section
      styles={{ border: "1px solid #E7E7E7", borderRadius: "16px" }}
      padding="15px 10px"
      margin={isMobile ? ".5rem 0" : "2rem 0"}
    >
      <VisaPaymentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        visaDetails={{
          id: visa?._id,
          intent: getButtonInformation().intent,
          accompanying: visa?.familyMembers.filter(
            (fm: any) => fm.accompanying === true
          ).length,
        }}
      />
      <Flex
        justify="space-around"
        gap={isMobile ? ".5rem" : "0rem"}
        direction={isMobile ? "column" : "row"}
        // margin="2rem 0px 0px"
        // border="1px solid #E7E7E7"
        align="center"
        // borderBottom="1px solid #E7E7E7"
        styles={{
          position: "relative",
        }}
      >
        <Logo />
        <Flex
          justify="flex-start"
          width={isMobile ? "100%" : "32%"}
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "7px" : "0rem"}
        >
          <Flex
            margin={isMobile ? "0" : "0px 0px 0px 1.5rem"}
            gap={isMobile ? "2rem" : "1rem"}
            direction="column"
          >
            <Text
              type="p"
              letterSpacing="1px"
              weight={900}
              size={isMobile ? "1rem" : "1.3rem"}
              textAlign={isMobile ? "center" : "left"}
              text={`${visa?.primaryTraveller?.homeCountry} — ${visa?.primaryTraveller?.destination}`}
            />

            <Flex justify="flex-start" gap="0px">
              <Flex
                justify="space-between"
                gap="10px"
                margin="0px 0px 10px 0px"
                width="90%"
              >
                <DateIcon>
                  <IoCalendar color="#8DD3BB" size="1.5rem" />
                </DateIcon>
                <Section>
                  <Text
                    type="p"
                    text="Last updated"
                    color="#112211"
                    size={12}
                    opacity="60%"
                  />
                  <Text
                    type="h5"
                    text={format(new Date(visa.updatedAt), "dd MMM, yyyy")}
                    color="#112211"
                    size={14}
                    weight={500}
                  />
                </Section>
              </Flex>

              <Flex justify="flex-start" gap="10px">
                <DateIcon>
                  <HiClock color="#8DD3BB" size="1.5rem" />
                </DateIcon>
                <section>
                  <Text
                    type="p"
                    text="Recent payment"
                    whiteSpace="nowrap"
                    color="#112211"
                    size={12}
                    opacity="60%"
                  />
                  <Text
                    type="h5"
                    text={
                      visa?.payments.length
                        ? currencyFormatter(recentPayment.totalAmount)
                        : visa?.usedFormFeeVoucher
                        ? "Travel voucher"
                        : "n/a"
                    }
                    color="#112211"
                    size={14}
                    weight={500}
                  />
                </section>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <VisaStatus style={{ backgroundColor: textAndBgColor.bg }}>
          <Text
            type="h5"
            text={
              visa.applicationStatus === "FORM FEE REQUESTED"
                ? "APPLICATION NOT SUBMITTED"
                : visa.applicationStatus
            }
            weight={800}
            size={isMobile ? 13 : 14}
            color={textAndBgColor.text}
          />
        </VisaStatus>

        <Flex
          width={isMobile ? "100%" : "25%"}
          justify={isMobile ? "space-between" : "flex-end"}
          gap=".5rem"
          align="center"
        >
          <Button
            padding="8px 16px"
            width={isMobile ? "300px!important" : "100px !important"}
            height="48px"
            styles={{
              marginLeft: isMobile ? "0px" : "55px",
              display: isMobile ? "flex" : "inline-flex",
              maxWidth: "100%",
            }}
            disabled={getButtonInformation().disabled}
            onClick={getButtonInformation().fn}
          >
            <Text
              type="h5"
              text={getButtonInformation().text}
              weight={400}
              size={14}
              styles={{
                width: "max-content",
                textAlign: "center",
              }}
            />
          </Button>
          {!isMobile && (
            <Section
              width="60px"
              styles={{
                display: isMobile ? "none" : "block",
              }}
            >
              <Flex
                border="1px solid #87CEEB"
                borderBottom="1px solid #87CEEB"
                align="center"
                justify="center"
                padding="8px"
                borderRadius="4px"
                height="48px"
                width="48px"
                styles={{ cursor: "pointer" }}
                onClick={handleAccordionClick}
              >
                {isOpen ? (
                  <MdKeyboardArrowUp size="1.5rem" />
                ) : (
                  <MdKeyboardArrowDown size="1.5rem" />
                )}
              </Flex>
            </Section>
          )}
        </Flex>
      </Flex>
      {isOpen && (
        <Section margin="2rem 2rem 0" styles={{ transition: "all 3s" }}>
          {visa.applicationStatus === "FORM FEE REQUESTED" ? (
            <Flex align="center" gap=".5rem">
              <PiDotsThreeCircleLight size={20} color="red" />
              <Text
                type="p"
                text={"THIS APPLICATION HAS NOT BEEN SUBMITTED"}
                size={"15px"}
              />
            </Flex>
          ) : (
            <>
              <Flex align="center" margin=".5rem 0" gap=".5rem">
                <PiDotsThreeCircleLight size={20} />
                <Text type="p" text={visa?.applicationStatus} size={"15px"} />
              </Flex>
              {visa?.usedFormFeeVoucher && (
                <Flex align="center" margin=".5rem 0" gap=".5rem">
                  <PiWalletLight size={20} />
                  <Text
                    type="p"
                    text={"Application fee paid with Travel Voucher"}
                    size={"15px"}
                  />
                </Flex>
              )}
              <Flex align="center" gap=".5rem">
                <AiOutlineCheck size={20} />
                <Text
                  type="p"
                  text={"NO DOCUMENTED REQUESTED FROM YOU"}
                  size={"15px"}
                />
              </Flex>
            </>
          )}
        </Section>
      )}
    </Section>
  );
}
export default VisaDetail;
