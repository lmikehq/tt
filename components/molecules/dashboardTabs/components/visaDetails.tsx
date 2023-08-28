"use client";
import Flex from "../../../atoms/flex";
import Image from "../../../atoms/image";
import { useScreenResolution } from "hook/useScreenResolution";
import CountryLogo from "../../../../assets/flags/ng.svg";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import Text from "../../../atoms/text";
import { IoCalendar } from "react-icons/io5";
import { HiClock } from "react-icons/hi";
import Button from "../../../atoms/button";
import { MdKeyboardArrowDown } from "react-icons/md";
import Section from "@molecule/section";
import { useState } from "react";

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
`;

interface VisaDataProps {
  countryLogoSrc: string;
  applicationDate: string;
  paymentFee: string;
  visaStatus: string;
  downloadButtonText: string;
  onDownloadStatusClick: () => void;
}

const VisaData: React.FC<VisaDataProps> = ({
  applicationDate,
  paymentFee,
  visaStatus,
  downloadButtonText,
  onDownloadStatusClick,
}) => {
  const { isMobile } = useScreenResolution();
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  const getStatusBackgroundColor = () => {
    switch (visaStatus) {
      case "APPLICATION IN PROGRESS":
        return "#F6F0FF";
      case "VISA FEES REQUIRED":
      case "PROCESSING FEES REQUIRED":
      case "COURIER FEES REQUIRED":
      case "PASSPORT PHYSICALLY REQUIRED":
      case "ADDITIONAL DOCUMENTS REQUIRED":
        return "#FFF1F9";
      case "AWAITING CONFIRMATION":
      case "AWAITING EMBASSY DECISION":
      case "AWAITING BIO METRIC":
        return "#FFFEEF";
      case "DECLINED":
        return "#FFF1F1";
      case "APPROVED":
        return "#F1FFF2";
      case "AWAITING PASSPORT COLLECTION":
        return "#FEF7F0";
      default:
        return "transparent";
    }
  };
  const getStatusTextColor = () => {
    switch (visaStatus) {
      case "APPLICATION IN PROGRESS":
        return "#37008A";
      case "VISA FEES REQUIRED":
      case "PROCESSING FEES REQUIRED":
      case "COURIER FEES REQUIRED":
      case "PASSPORT PHYSICALLY REQUIRED":
      case "ADDITIONAL DOCUMENTS REQUIRED":
        return "#7A0046";
      case "AWAITING EMBASSY DECISION":
      case "AWAITING BIO METRIC":
        return "#7A7422";
      case "DECLINED":
        return "#9C0000";
      case "APPROVED":
        return "#1A820A";
      case "AWAITING PASSPORT COLLECTION":
        return "#D96C00";
      default:
        return "#112211";
    }
  };

  return (
    <div>
      <Flex
        justify="space-around"
        gap={isMobile ? ".5rem" : "0rem"}
        direction={isMobile ? "column" : "row"}
        margin="2rem 0px 0px"
        border="1px solid #E7E7E7"
        padding="15px 10px"
        // borderRadius="16px
        align="center"
        borderBottom="1px solid #E7E7E7"
        styles={{
          position: "relative",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <Logo>
          <Image
            src={CountryLogo}
            height={isMobile ? 20 : 40}
            width={isMobile ? 40 : 58.5}
            alt="country logo"
          />
        </Logo>
        <Flex
          justify="flex-start"
          width={isMobile ? "100%" : "32%"}
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "7px" : "0rem"}
        >
          <Flex
            margin="0px 0px 0px 1.5rem"
            gap={isMobile ? "2rem" : "1rem"}
            direction="column"
          >
            <Text
              type="p"
              letterSpacing="1px"
              weight={400}
              size={isMobile ? "1rem" : "1.3rem"}
              text="Nigeria(NG) — Canada(CA)"
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
                    text="Application Date"
                    color="#112211"
                    size={12}
                    opacity="60%"
                  />
                  <Text
                    type="h5"
                    text={applicationDate}
                    color="#112211"
                    size={14}
                    weight={500}
                  />
                </Section>
              </Flex>

              <Flex justify="flex-start" gap="10px">
                <DateIcon>
                  <HiClock color="#8DD3BB" size="1.5rem" />
                  {/* Use IoClock for HiClock */}
                </DateIcon>
                <section>
                  <Text
                    type="p"
                    text="Payment Fee"
                    whiteSpace="nowrap"
                    color="#112211"
                    size={12}
                    opacity="60%"
                  />
                  <Text
                    type="h5"
                    text={paymentFee}
                    color="#112211"
                    size={14}
                    weight={500}
                  />
                </section>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <VisaStatus style={{ backgroundColor: getStatusBackgroundColor() }}>
          <Text
            type="h5"
            text={visaStatus}
            weight={800}
            size={isMobile ? 13 : 14}
            color={getStatusTextColor()}
          />
        </VisaStatus>

        <Flex width="25%" justify="flex-end" gap=".5rem" align="center">
          <Button
            padding="8px 16px"
            width="100px !important"
            height="48px"
            styles={{
              marginLeft: isMobile ? "0px" : "55px",
              display: isMobile ? "none" : "block",
            }}
            onClick={onDownloadStatusClick}
          >
            <Text type="h5" text={downloadButtonText} weight={400} size={14} />
          </Button>
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
              <MdKeyboardArrowDown size="1.5rem" />
            </Flex>
          </Section>
        </Flex>
      </Flex>
    </div>
  );
};
export default VisaData;
