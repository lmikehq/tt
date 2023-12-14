"use client";
import Button from "@atom/button";
import { Divider } from "@atom/divider";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useVoucherStore } from "@lib/store/voucher.store";
import { ttColors } from "@lib/theme/colors";
import CustomDrawer from "@molecule/drawers/customDrawer";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { HiClock } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdNumbers,
  MdOutlineFamilyRestroom,
} from "react-icons/md";
import {
  PiDotsThreeCircleLight,
  PiEyeLight,
  PiWalletLight,
} from "react-icons/pi";
import Section from "src/components/molecules/section";
import styled from "styled-components";
import VisaPaymentModal from "../visaPayment";

import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { useDetectOutsideClick } from "@/lib/extensions/hook/useDetectOutsideClick";
import { AiOutlineCheck } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import VisaUploadDocModal from "../visaUploadDoc";

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
  background: #fffeef;
  padding: 14px 18px;
  border-radius: 24px;
  // height: 45px;
  width: 25%;
  text-align: center;

  @media screen and (max-width: 900px) {
    width: 100%;
    font-size: 14px;
    padding: 10px 0px;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 274px;
  height: max-content;
  z-index: 9999999;
  overflow-y: scroll;
  font-size: 16px;
  line-height: 19.2px;
`;

const StyledOption = styled.div<{ hovered: boolean; lastChild: boolean }>`
  display: flex;
  align-items: center;
  padding: 24px 18px;
  cursor: pointer;
  background-color: ${({ hovered }) => (hovered ? "#F3FAFD" : "transparent")};
  border-bottom: ${({ lastChild }) =>
    lastChild ? "none" : "1px solid #dedee3"};
`;

const OptionText = styled.div<{ hovered: boolean }>`
  color: ${({ hovered }) => (hovered ? "#6092A7" : "#101010")};
  font-weight: 400;
  flex: 1;
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

function VisaDetail({ visa, refetch }: { visa: any; refetch: any }) {
  const { isMobile } = useScreenResolution();
  const [modalState, setModalState] = useState({
    open: false,
    type: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsOpen(!isOpen);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  //   setHoveredOption(null);
  // };

  const ref = useRef(null);
  useDetectOutsideClick(ref, () => setIsDropdownOpen(false));

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
      case "FORM FEE REQUESTED":
        visaInformation = {
          text: "Submit Application",
          fn: () => setModalState({ open: true, type: "payment" }),
          disabled: false,
          intent: "FORM FEE",
        };
        break;
      case "PROCESSING FEE REQUESTED":
        visaInformation = {
          text: "Pay Processing Fee",
          fn: () => setModalState({ open: true, type: "payment" }),
          disabled: false,
          intent: "PROCESSING FEE",
        };
        break;
      case "ADDITIONAL INFORMATION REQUESTED":
        visaInformation = {
          text: "Upload documents",
          fn: () => setModalState({ open: true, type: "upload" }),
          disabled: false,
          intent: "",
        };
        break;
      case "ADDITIONAL DOCUMENT REQUESTED":
        visaInformation = {
          text: "Upload documents",
          fn: () => setModalState({ open: true, type: "upload" }),
          disabled: false,
          intent: "",
        };
        break;
      default:
        visaInformation = {
          text: "No action required",
          fn: () => {},
          disabled: true,
          intent: "",
        };
    }

    return visaInformation;
  }

  // function PaymentIcon() {
  //   return (
  //     <Image
  //       src="/assets/images/dashboard/payment.png"
  //       alt=""
  //       width={17.2}
  //       height={12.4}
  //     />
  //   );
  // }

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
  const { applied, voucher } = useVoucherStore((state) => state);

  const accompanying = visa?.familyMembers.filter(
    (fm: any) => fm.accompanying == true
  ).length;

  function getLocationField(field: string) {
    return typeof visa?.primaryTraveller[field] === "string"
      ? visa?.primaryTraveller?.[field]
      : `${visa?.primaryTraveller?.[field]?.name} (${visa?.primaryTraveller?.[field]?.code})`;
  }

  const sortOptions = [
    // {
    //   value: "Option 1",
    //   label: "Add Accompanies",
    //   icon: <HiOutlinePlusSm size="1rem" />,
    //   action: () => {},
    //   disabled: true,
    // },
    {
      value: "Option 3",
      label: "View More Details",
      icon: <PiEyeLight size="1rem" />,
      action: () => {
        setBottomDrawerOpen(true);
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <Section
      styles={{
        border: "1px solid #E7E7E7",
        borderRadius: "16px",
      }}
      padding="15px 10px"
      margin={isMobile ? ".5rem 0" : "2rem 0"}
    >
      <VisaPaymentModal
        open={modalState.open && modalState.type === "payment"}
        onClose={() => setModalState({ open: false, type: "" })}
        visaDetails={{
          id: visa?._id,
          intent: getButtonInformation().intent,
          accompanying: accompanying,
          refetch,
        }}
      />

      <VisaUploadDocModal
        onClose={() => setModalState({ open: false, type: "" })}
        open={modalState.open && modalState.type === "upload"}
        visa={visa}
        refetch={refetch}
      />

      {isMobile ? (
        <Flex
          gap="1.5rem"
          justify="space-between"
          align="center"
          styles={{ position: "relative" }}
        >
          <Logo>
            {visa?.primaryTraveller?.destination?.code && (
              <img
                src={
                  COUNTRY_FLAGS.find(
                    (x) => x.code === visa?.primaryTraveller?.destination?.code
                  )?.flag
                }
                alt="logo"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </Logo>
          <Flex direction="column" gap=".5rem">
            <Text
              type="p"
              weight={900}
              size={isMobile ? "14px" : "20px"}
              textAlign={isMobile ? "center" : "left"}
              text={`${getLocationField("homeCountry")} — ${getLocationField(
                "destination"
              )}`}
              letterSpacing={"unset"}
            />
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
          </Flex>
          <BsThreeDotsVertical
            color="#040404"
            size="2rem"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <DropdownContent ref={ref}>
              {sortOptions.map((option, index) => (
                <StyledOption
                  key={option.value}
                  hovered={hoveredOption === index}
                  lastChild={index === sortOptions.length - 1}
                  onMouseEnter={() => setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={option.action}
                >
                  <OptionText hovered={hoveredOption === index}>
                    <Flex gap="1rem" align="center">
                      {option.icon}
                      {option.label}
                    </Flex>
                  </OptionText>
                </StyledOption>
              ))}
            </DropdownContent>
          )}
          {/* {isDropdownOpen && <DropdownContent>yessss</DropdownContent>} */}
          <CustomDrawer
            anchor="bottom"
            open={bottomDrawerOpen}
            onClose={() => setBottomDrawerOpen(false)}
            height="50vh"
            borderRadius="16px 16px 0px 0px"
          >
            <Section
              height="unset"
              padding={"1rem 1.5rem 1.5rem"}
              styles={{
                background: ttColors.light,
              }}
            >
              <Flex
                justify="space-between"
                align="center"
                margin="1rem 0 .6rem"
              >
                <Flex justify="flex-start" gap="1rem" align="center">
                  <Text
                    type="h3"
                    text={`${getLocationField(
                      "homeCountry"
                    )} — ${getLocationField("destination")}`}
                    size={16}
                    weight={600}
                    width="max-content"
                    color="#112211"
                  />
                </Flex>
                <GrFormClose
                  size={30}
                  color="#848484"
                  onClick={() => {
                    setBottomDrawerOpen(false);
                    setIsDropdownOpen(false);
                  }}
                />
              </Flex>
              <Divider direction="horizontal" margin="0px 0px 1rem" />
              <Flex gap="2rem" direction="column">
                <Flex justify="space-between" align="center">
                  <Text
                    type="h3"
                    text="Application Date"
                    size={16}
                    weight={500}
                    width="max-content"
                    color="#000000"
                  />
                  <Text
                    type="h3"
                    text={
                      visa?.createdAt
                        ? format(new Date(visa?.createdAt), "dd MMM, yyyy")
                        : "n/a"
                    }
                    size={16}
                    weight={400}
                    width="max-content"
                    color="#5C5C5C"
                  />
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text
                    type="h3"
                    text="Recent paymemt"
                    size={16}
                    weight={500}
                    width="max-content"
                    color="#000000"
                  />
                  <Text
                    type="h3"
                    text={
                      visa?.payments.length
                        ? currencyFormatter(recentPayment.totalAmount)
                        : visa?.usedFormFeeVoucher
                        ? "Travel voucher"
                        : "n/a"
                    }
                    size={16}
                    weight={400}
                    width="max-content"
                    color="#5C5C5C"
                  />
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text
                    type="h3"
                    text="Application Type"
                    size={16}
                    weight={500}
                    width="max-content"
                    color="#000000"
                  />
                  <Text
                    type="h3"
                    text={visa?.applicationType}
                    size={16}
                    weight={400}
                    width="max-content"
                    color="#5C5C5C"
                  />
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text
                    type="h3"
                    text="Status"
                    size={16}
                    weight={500}
                    width="max-content"
                    color="#000000"
                  />

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
                </Flex>
                <Flex>
                  <Button
                    padding="8px 10px"
                    width={"100%"}
                    height="48px"
                    background="#06062A"
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
                </Flex>
              </Flex>
            </Section>
          </CustomDrawer>
        </Flex>
      ) : (
        <>
          <Flex
            justify="space-around"
            gap={isMobile ? "1.5rem" : "0rem"}
            direction={isMobile ? "column" : "row"}
            // margin="2rem 0px 0px"
            // border="1px solid #E7E7E7"
            align="center"
            // borderBottom="1px solid #E7E7E7"
            styles={{
              position: "relative",
            }}
          >
            <Logo>
              {visa?.primaryTraveller?.destination?.code && (
                <img
                  src={
                    COUNTRY_FLAGS.find(
                      (x) =>
                        x.code === visa?.primaryTraveller?.destination?.code
                    )?.flag
                  }
                  alt="logo"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
            </Logo>

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
                styles={{ display: isMobile ? "none" : "flex" }}
              >
                <Text
                  type="p"
                  letterSpacing="1px"
                  weight={900}
                  size={isMobile ? "1rem" : "1.3rem"}
                  textAlign={isMobile ? "center" : "left"}
                  text={`${getLocationField(
                    "homeCountry"
                  )} — ${getLocationField("destination")}`}
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
                        // text={
                        //   recentPayment?.totalAmount
                        //     ? currencyFormatter(recentPayment.totalAmount)
                        //     : visa?.usedFormFeeVoucher
                        //     ? "Travel voucher"
                        //     : "n/a"
                        // }
                        decoration={applied && voucher ? "line-through" : ""}
                        color="#112211"
                        size={14}
                        weight={500}
                      />
                    </section>
                  </Flex>
                </Flex>
              </Flex>

              {/* <Flex styles={{ display: isMobile ? "block" : "none" }}>
                <Text
                  type="p"
                  letterSpacing="1px"
                  weight={900}
                  size={isMobile ? "1rem" : "1.3rem"}
                  textAlign={isMobile ? "center" : "left"}
                  text={`${visa?.primaryTraveller?.homeCountry} — ${visa?.primaryTraveller?.destination}`}
                />
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
              </Flex> */}
            </Flex>

            <VisaStatus
              style={{
                backgroundColor: textAndBgColor.bg,
                display: isMobile ? "none" : "block",
              }}
            >
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
                background="#06062A"
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
                <Flex width={isMobile ? "100%" : "92%"} justify="space-between" align="center" margin="2rem 0">
                  <div>
                    <Flex align="center" margin=".5rem 0" gap=".5rem">
                      <PiDotsThreeCircleLight size={20} />
                      <Text
                        type="p"
                        text={visa?.applicationStatus}
                        size={"15px"}
                      />
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
                    {/* <Flex align="center" gap=".5rem">
                    <AiOutlineCheck size={20} />
                    <Text
                      type="p"
                      text={"NO DOCUMENTED REQUESTED FROM YOU"}
                      size={"15px"}
                    />
                  </Flex> */}
                    <Flex align="center" gap=".5rem">
                      {visa?.applicationStatus !==
                      "ADDITIONAL INFORMATION REQUESTED" ? (
                        <AiOutlineCheck size={20} />
                      ) : (
                        <BiError color="red" size={20} />
                      )}
                      <Text
                        type="p"
                        text={
                          visa?.applicationStatus ===
                          "ADDITIONAL INFORMATION REQUESTED"
                            ? "ADDITIONAL DOCUMENT REQUESTED"
                            : "NO DOCUMENT REQUESTED FROM YOU"
                        }
                        size={"15px"}
                      />
                    </Flex>
                  </div>
                  <div>
                    <Flex align="center" margin=".5rem 0" gap=".5rem">
                      <RxAvatar size={20} />
                      <Text
                        type="p"
                        text={`${visa?.primaryTraveller?.firstName} ${visa?.primaryTraveller?.lastName}`}
                        size={"15px"}
                      />
                    </Flex>

                    <Flex align="center" margin=".5rem 0" gap=".5rem">
                      <MdOutlineFamilyRestroom size={20} />
                      <Text
                        type="p"
                        text={accompanying > 0 ? `Family${accompanying > 0 ? ` (${accompanying} travellers)` : ''}` : "Single"}
                        size={"15px"}
                      />
                    </Flex>

                    <Flex align="center" gap=".5rem">
                      <MdNumbers size={20} />
                      <Text type="p" text={visa?.uniqueVisaId} size={"15px"} />
                    </Flex>
                  </div>
                  <div>
                    <Flex>
                      <Button
                        width="200px"
                        styles={{
                          maxWidth: "100%",
                        }}
                        background="transparent"
                        border="1px solid black"
                        color="black"
                      >
                        <Text
                          type="p"
                          text="+ Add accompanying"
                          size={"14px"}
                        />
                      </Button>
                    </Flex>
                  </div>
                </Flex>
              )}
            </Section>
          )}
        </>
      )}
    </Section>
  );
}
export default VisaDetail;
