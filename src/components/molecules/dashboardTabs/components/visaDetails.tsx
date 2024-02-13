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
import { HiClock, HiDotsVertical, HiOutlinePlusSm } from "react-icons/hi";
import { IoCalendar, IoEyeOutline } from "react-icons/io5";
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
import { Grid } from "@/components/templates/grid";
import { AddVisaAccompanyModal } from "./visaAccompanyModal";
import { VisaResponseProp } from "@/lib/types/response-models/dashboard";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { dependantsForm, dependantsFormSchema } from "@/lib/types/schema";
import { VisaService } from "@/lib/services/dashboard/visa.service";
import { useUserStore } from "@/lib/store/useStore";
import toast from "react-hot-toast";
import AccompanyPaymentModal from "../accompanyPayment";
import apiService from "@/lib/extensions/hook/apiService";
import { isVisaApplication } from "@/lib/extensions/helpers/type-guard";
import { OldVisaApplication } from "@/lib/types/visa";

const Logo = styled.div`
  height: 64px;
  width: 80px;
  border: 1px solid ${ttColors.primary};
  padding: 10px;
  border-radius: 8px;

  @media screen and (max-width: 1200px){
    height: 40px;
    width: 50px;
  }

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

  @media screen and (max-width: 1024px){
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const VisaStatus = styled.div`
  background: #fffeef;
  padding: 14px 18px;
  border-radius: 24px;
  // height: 45px;
  // width: 25%;
  text-align: center;

  @media screen and (max-width: 1024px) {
    padding: 10px 10px;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    font-size: 14px;
    padding: 10px 0px;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 30%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 274px;
  height: max-content;
  z-index: 9999999;
  overflow-y: auto;
  font-size: 16px;
  line-height: 19.2px;

  @media screen and (max-width: 900px){
    line-height: 10px;
    font-size: 14px;
  }
`;

const StyledOption = styled.div<{ hovered: boolean; lastChild: boolean; }>`
  display: flex;
  align-items: center;
  padding: 24px 18px;
  cursor: pointer;
  background-color: ${({ hovered }) => (hovered ? "#F3FAFD" : "transparent")};
  border-bottom: ${({ lastChild }) =>
    lastChild ? "none" : "1px solid #dedee3"};
`;

const OptionText = styled.div<{ hovered: boolean; }>`
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

function VisaDetail({ visa, refetch }: { visa: VisaResponseProp | OldVisaApplication; refetch: any; }) {
  const { user } = useUserStore((state) => state);
  const { isMobile, isTablet } = useScreenResolution();
  const [modalState, setModalState] = useState({
    open: false,
    type: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [dependantPaymentInfo, setDependantPaymentInfo] = useState<{ checkout_url: string, reference: string, price: number; }>({
    checkout_url: "",
    reference: "",
    price: 0
  });
  const router = useRouter();


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
      fn: () => { },
      disabled: false,
      intent: "",
    };
    switch (visa?.applicationStatus) {
      case "APPROVED":
        visaInformation = {
          text: "No action Required",
          fn: () => { },
          disabled: true,
          intent: "",
        };
        break;
      case "DECLINED":
        visaInformation = {
          text: "Re-apply Visa",
          fn: () => {
            router.push('/visa/apply');
          },
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
          fn: () => { },
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

  // ACCOMPANYING
  const renderAccompany = (status: string): { bg: string, color: string, border: string; } => {
    const setting = {
      bg: '',
      color: '',
      border: ''
    };

    switch (status) {
      case 'Pending':
        return { ...setting, bg: '#FFFFEA', color: '#BD9600', border: '#BD9600' };
      case 'SUCCESS':
      case 'APPROVED':
        return { ...setting, bg: '#F1FFF2', color: '#1A820A', border: '#1A820A' };
      default:
        return { ...setting, bg: '#FFFFEA', color: '#BD9600', border: '#BD9600' };
    }

    // return setting;
  };

  function getDependants() {

    if (isVisaApplication(visa)) {
      const data: VisaResponseProp = visa as VisaResponseProp;
      const allImmediateFamilyDependants = data?.familyInformation?.immediateFamilyInfo?.filter((immediateFamily) => (immediateFamily.accompanying === true));
      const allParentDependants = data?.familyInformation?.parentDetails?.filter((parent) => (parent.accompanying === true));
      const allSiblingDependants = data.familyInformation.siblingDetails.filter((sibling) => (sibling.accompanying === true));
      return [...allImmediateFamilyDependants, ...allParentDependants, ...allSiblingDependants];
    } else {
      const data: OldVisaApplication = visa as OldVisaApplication;
      const allImmediateFamilyDependants = data?.familyMembers.filter((family) => (family.accompanying === true));

      return [...allImmediateFamilyDependants];
    }

  }

  function renderDestinationLogo() {
    if (isVisaApplication(visa)) {
      return (
        <Logo>
          {visa?.destination?.code && (
            <img
              src={
                COUNTRY_FLAGS.find(
                  (x) => x?.code === visa?.destination?.code
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
      );
    } else {
      const data: OldVisaApplication = visa as OldVisaApplication;
      return (
        <Logo>
          {data?.primaryTraveller?.destination.code && (
            <img
              src={
                COUNTRY_FLAGS.find(
                  (x) => x?.code === data?.primaryTraveller?.destination?.code
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
      );
    }
  }

  function renderVisaStatus() {
    if (isVisaApplication(visa)) {
      return (
        <Flex direction="column" gap=".5rem">
          <Text
            type="p"
            weight={900}
            size={isMobile ? "14px" : "20px"}
            textAlign={isMobile ? "center" : "left"}
            text={`${visa?.homeCountry?.name}(${visa?.homeCountry?.code}) — ${visa?.destination?.name}(${(visa?.destination?.code)})`}
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
      );
    } else {
      const data: OldVisaApplication = visa as OldVisaApplication;
      return (
        <Flex direction="column" gap=".5rem">
          <Text
            type="p"
            weight={900}
            size={isMobile ? "14px" : "20px"}
            textAlign={isMobile ? "center" : "left"}
            text={`${data?.primaryTraveller?.homeCountry?.name}(${data?.primaryTraveller.homeCountry?.code}) — ${data?.primaryTraveller?.destination?.name}(${(data?.primaryTraveller?.destination?.code)})`}
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
      );
    }
  }

  function renderHomeToDestination(mobile: boolean) {
    if (mobile) {
      if (isVisaApplication(visa)) {
        return (
          <Flex justify="flex-start" gap="1rem" align="center">
            <Text
              type="h3"
              text={`${visa?.homeCountry?.name}(${visa?.homeCountry?.code}) — ${visa?.destination?.name}(${visa?.destination?.code})`}
              size={16}
              weight={600}
              width="max-content"
              color="#112211"
            />
          </Flex>
        );
      } else {
        const data: OldVisaApplication = visa as OldVisaApplication;
        return (
          <Flex justify="flex-start" gap="1rem" align="center">
            <Text
              type="h3"
              text={`${data?.primaryTraveller?.homeCountry?.name} — ${data?.primaryTraveller?.destination?.name}`}
              size={16}
              weight={600}
              width="max-content"
              color="#112211"
            />
          </Flex>
        );
      }
    } else {
      if (isVisaApplication(visa)) {
        const data: VisaResponseProp = visa as VisaResponseProp;
        return (
          <Text
            type="p"
            letterSpacing="1px"
            weight={900}
            size={isTablet ? "13px" : "1.3rem"}
            textAlign={isMobile ? "center" : "left"}
            text={`${data?.homeCountry?.name}(${data?.homeCountry?.code}) — ${data?.destination?.name}(${data?.destination?.code})`}
          />
        );
      } else {
        const data: OldVisaApplication = visa as OldVisaApplication;
        return (
          <Text
            type="p"
            letterSpacing="1px"
            weight={900}
            size={isTablet ? "13px" : "1.3rem"}
            textAlign={isMobile ? "center" : "left"}
            text={`${data?.primaryTraveller?.homeCountry?.name}(${data?.primaryTraveller?.homeCountry?.code}) — ${data?.primaryTraveller?.destination?.name}(${data?.primaryTraveller?.destination?.code})`}
          />
        );
      }
    }
  }

  function renderVisaPersonalInfo() {
    if (isVisaApplication(visa)) {
      return (
        <Flex align="center" margin=".5rem 0" gap=".5rem">
          <RxAvatar size={20} />
          <Text
            type="p"
            text={`${visa?.primaryTraveller?.personalDetails?.firstName} ${visa?.primaryTraveller?.personalDetails?.lastName}`}
            size={"15px"}
            transform="uppercase"
            weight={500}
          />
        </Flex>
      );
    } else {
      const data: OldVisaApplication = visa as OldVisaApplication;
      return (
        <Flex align="center" margin=".5rem 0" gap=".5rem">
          <RxAvatar size={20} />
          <Text
            type="p"
            text={`${data?.primaryTraveller?.firstName} ${data?.primaryTraveller?.lastName}`}
            size={"15px"}
            transform="uppercase"
            weight={500}
          />
        </Flex>
      );
    }
  }


  const accompanying = getDependants().length || 0;

  // function getLocationField(field: string) {
  //   return typeof visa?.primaryTraveller[field] === "string"
  //     ? visa?.primaryTraveller?.[field]

  //     : `${visa?.primaryTraveller?.[field]?.name} (${visa?.primaryTraveller?.[field]?.code})`;
  // }

  const sortOptions = [
    {
      value: "Option 1",
      label: "Add Accompanies",
      icon: <HiOutlinePlusSm size="1rem" />,
      action: () => {
        setModalState((prev) => {
          return {
            ...prev,
            open: true,
            type: 'add-accompany'
          };
        });
        setIsDropdownOpen(false);
      },
      disabled: false,
    },
    {
      value: 'Option 2',
      label: 'Upload Document',
      icon: <IoEyeOutline size={16} />,
      action: () => {
        setModalState({ open: true, type: "upload" });
        setIsDropdownOpen(false);
      }
    },
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

  // DEPENDANTS FORMIK 
  const dependantsFormik = useFormik({
    initialValues: dependantsForm,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: dependantsFormSchema,
    onSubmit: async (values, helpers) => {
      // some code
      // CALL THE API FROM HERE AND EVEN RESET THE FORM

      // console.log(values.dependants);

      // const dependantsData = values.dependants.map((dependant) => ({
      //   membersEmail: dependant.memberEmail,
      //   accompanying: true,
      //   address: dependant.memberAddress,
      //   gender: dependant.gender,
      //   membersPhoneNumber: dependant.phoneNumber,
      //   relationshipToPrimary: dependant.relationship,
      //   membersName: dependant.memberName,
      //   dateOfBirth: format(new Date(dependant.dateOfBirth), 'yyyy-MM-dd'),
      //   expiryYear: Number(dependant.expiryDate.split("/")[2]),
      //   issueYear: Number(dependant.issueDate.split("/")[2]),
      //   passportNumber: dependant.passportNumber
      // }));

      // console.log({ dependantsData });

      // console.log(values.dependants);
      apiService(`/visa/application/${visa._id}/add-accompanying`, 'POST', values.dependants.map((dependant) => ({
        membersEmail: dependant.memberEmail,
        accompanying: true,
        address: dependant.memberAddress,
        gender: dependant.gender,
        membersPhoneNumber: dependant.phoneNumber,
        relationshipToPrimary: dependant.relationship,
        membersName: dependant.memberName,
        dateOfBirth: format(new Date(dependant.dateOfBirth), 'yyyy-MM-dd'),
        expiryYear: Number(dependant.expiryDate.split("/")[2]),
        issueYear: Number(dependant.issueDate.split("/")[2]),
        passportNumber: dependant.passportNumber
      }))).then((response) => {
        if (response?.message === 'success') {
          setDependantPaymentInfo({
            checkout_url: response?.data?.data?.checkout_url,
            reference: response?.data?.data?.reference,
            price: values.dependants.length * 500000
          });
          toast.success(response?.data?.message);

          setModalState({ open: false, type: "add-dependant" });
          helpers.resetForm();
        }
        setModalState({ open: true, type: "dependant-payment" });

        router.push(`?reference=${response?.data?.data.reference}&checkout_url=${response?.data?.data?.checkout_url}`, { scroll: false });
      }).catch((err) => {
        throw err;
      });
    }
  });

  return (
    <>

      <Section
        styles={{
          border: "1px solid #E7E7E7",
          borderRadius: "16px",
        }}
        padding="24px"
        margin={isMobile ? ".5rem 0" : "2rem 0"}
      >
        {/* ACCOMPANY / DEPENDANTS PAYMENT MODAL */}
        <AccompanyPaymentModal
          onClose={() => { }}
          open={modalState.open && modalState.type === 'dependant-payment'}
          koraLink={dependantPaymentInfo.checkout_url}
          price={dependantPaymentInfo.price}
          reference={dependantPaymentInfo.reference}
        />

        {/* VISA PAYMENT MODAL */}
        <VisaPaymentModal
          open={modalState.open && modalState.type === "payment"}
          onClose={() => setModalState({ open: false, type: "" })}
          visaDetails={{
            id: visa?._id,
            intent: getButtonInformation().intent,
            accompanying: accompanying || 0,
            refetch,
          }}
        />

        {/* VISA UPLOAD DOCUMENT MODAL */}
        <VisaUploadDocModal
          onClose={() => setModalState({ open: false, type: "" })}
          open={modalState.open && modalState.type === "upload"}
          visa={visa && visa}
          refetch={refetch}
        />

        {/* ADD DEPENDANTS / ACCOMPANIES MODAL */}
        <AddVisaAccompanyModal
          open={modalState.open && modalState.type === 'add-accompany'}
          setState={setModalState}
          formik={dependantsFormik}
          persistForm={() => { }}
          index={1}
          steps={[""]}
        />

        {isMobile ? (
          <Flex
            gap="1.5rem"
            justify="space-between"
            align="center"
            styles={{ position: "relative" }}
          >
            {renderDestinationLogo()}

            {renderVisaStatus()}

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
                <Flex align="center" justify="flex-end">
                  <GrFormClose
                    size={30}
                    color="#848484"
                    cursor="pointer"
                    onClick={() => {
                      setBottomDrawerOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  />
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  margin="1rem 0 .6rem"
                >
                  {renderHomeToDestination(true)}
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
                        visa?.updatedAt
                          ? format(new Date(visa?.updatedAt), "dd MMM, yyyy")
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
                        visa?.payments?.length
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

                    <Flex width="60%">
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
                  </Flex>

                  <Flex>
                    <Text type="p" text="Added Dependants" weight={600} />
                  </Flex>
                  <Section>
                    {getDependants().length === 0 && <Text type="p" text="Add Accompanies to see them here" color={ttColors.lighterGray} />}
                    {getDependants().map((dependant: any) => {
                      return (
                        <Flex align="center" justify="space-between" key={dependant?.membersName}>
                          <Text type="p" text={dependant?.membersName} />
                          <Text type="p" text={dependant?.status?.length > 1 ? dependant?.status : 'PENDING'} />
                        </Flex>
                      );
                    })}
                  </Section>
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
                        weight={500}
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
            <Grid
              columns=''
              gap={isTablet ? "10px" : "24px"}
              style={{ gridTemplateColumns: isTablet ? "50px 2fr 1fr 27%" : '80px 1fr 25% 20%' }}
              align="center"
            >
              {/* <Logo>
                {visa?.destination?.code && (
                  <img
                    src={
                      COUNTRY_FLAGS.find(
                        (x) =>
                          x?.code === visa?.destination?.code
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
              </Logo> */}
              {renderDestinationLogo()}

              <Flex
                justify="flex-start"
                // width={isMobile ? "100%" : "32%"}
                direction={isMobile ? "column" : "row"}
                gap={isMobile ? "7px" : "0rem"}
              >
                <Flex
                  margin={isMobile ? "0" : "0px"}
                  gap={isMobile ? "2rem" : "1rem"}
                  direction="column"
                  styles={{ display: isMobile ? "none" : "flex" }}
                >
                  {/* <Text
                    type="p"
                    letterSpacing="1px"
                    weight={900}
                    size={isTablet ? "13px" : "1.3rem"}
                    textAlign={isMobile ? "center" : "left"}
                    text={`${visa?.homeCountry?.name}(${visa?.homeCountry?.code}) — ${visa?.destination?.name}(${visa?.destination?.code})`}
                  /> */}
                  {renderHomeToDestination(false)}

                  <Flex justify="flex-start" gap="0px">
                    <Flex
                      justify="space-between"
                      gap="10px"
                      margin="0px 0px 10px 0px"
                      width="90%"
                    >
                      <DateIcon>
                        <IoCalendar color="#8DD3BB" size={isTablet ? 18 : "1.5rem"} />
                      </DateIcon>
                      <Section>
                        <Text
                          type="p"
                          text="Application Date"
                          color="#112211"
                          size={isTablet ? 11 : 12}
                          weight={600}
                          opacity="60%"
                        />
                        <Text
                          type="h5"
                          text={format(new Date(visa.updatedAt), "dd MMM, yyyy")}
                          color="#112211"
                          size={isTablet ? 12 : 14}
                          weight={500}
                        />
                      </Section>
                    </Flex>

                    <Flex justify="flex-start" gap="10px">
                      <DateIcon>
                        <HiClock color="#8DD3BB" size={isTablet ? 18 : "1.5rem"} />
                      </DateIcon>
                      <section>
                        <Text
                          type="p"
                          text="Payment Fee"
                          whiteSpace="nowrap"
                          color="#112211"
                          size={isTablet ? 11 : 12}
                          weight={600}
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
                          size={isTablet ? 12 : 14}
                          weight={500}
                        />
                      </section>
                    </Flex>
                  </Flex>
                </Flex>

              </Flex>

              <Flex justify="center" align="center">
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
                    size={isTablet ? '11px' : 14}
                    color={textAndBgColor.text}
                  />
                </VisaStatus>
              </Flex>

              <Flex
                // width={isMobile ? "100%" : "25%"}
                justify={isMobile ? "space-between" : "flex-end"}
                gap=".5rem"
                align="center"
              >
                <Button
                  // padding="8px 16px"
                  width={isMobile ? "300px !important" : "100px !important"}
                  background="#06062A"
                  height="48px"
                  styles={{
                    marginLeft: isMobile ? "0px" : "55px",
                    display: isMobile ? "flex" : "inline-flex",
                    maxWidth: "100%",
                    padding: "8px 8px !important"
                  }}
                  disabled={getButtonInformation().disabled}
                  onClick={getButtonInformation().fn}
                >
                  <Text
                    type="h5"
                    text={getButtonInformation().text}
                    weight={500}
                    size={isTablet ? 12 : 14}
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
                      border={isTablet ? "" : "1px solid #87CEEB"}
                      borderBottom="1px solid #87CEEB"
                      align="center"
                      justify="center"
                      padding={isTablet ? "0" : "8px"}
                      borderRadius="4px"
                      height="48px"
                      width={isTablet ? "30px" : "48px"}
                      styles={{ cursor: "pointer" }}
                      onClick={handleAccordionClick}
                    >
                      {isOpen ? (
                        isTablet ? (
                          <MdKeyboardArrowUp size="1.5rem" />
                        ) : (
                          <MdKeyboardArrowUp size="1.5rem" />
                        )
                      ) : (
                        isTablet ? (
                          <MdKeyboardArrowDown size="1.5rem" />
                        ) : (
                          <MdKeyboardArrowDown size="1.5rem" />
                        )
                      )}
                    </Flex>
                  </Section>

                )}
              </Flex>
            </Grid>

            {isOpen && (
              <Section width="auto" styles={{ transition: "all 3s" }}>
                {visa.applicationStatus === "FORM FEE REQUESTED" ? (
                  <Grid columns={""} gap="24px" style={{ gridTemplateColumns: "80px 2fr 1fr" }}>
                    {/* this div here is part of the ui */}
                    <div></div>
                    <Flex align="center" gap=".5rem">
                      <PiDotsThreeCircleLight size={20} color="red" />
                      <Text
                        type="p"
                        text={"THIS APPLICATION HAS NOT BEEN SUBMITTED"}
                        size={"15px"}
                      />
                    </Flex>
                  </Grid>
                ) : (
                  <Section>
                    <Grid columns={''} gap="24px" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }} width={isMobile ? "100%" : "100%"} align="flex-start" margin="2rem 0">
                      {/* this div here is part of the ui */}
                      <div></div>
                      <Section>
                        <Flex align="center" margin=".5rem 0" gap=".5rem">
                          <PiDotsThreeCircleLight size={20} fontWeight={500} />
                          <Text
                            type="p"
                            text={visa?.applicationStatus}
                            size={"15px"}
                            weight={500}
                          />
                        </Flex>
                        {visa?.usedFormFeeVoucher && (
                          <Flex align="center" margin=".5rem 0" gap=".5rem">
                            <PiWalletLight size={20} fontWeight={500} />
                            <Text
                              type="p"
                              text={"Application fee paid with Travel Voucher"}
                              size={"15px"}
                              weight={500}
                              transform="uppercase"
                            />
                          </Flex>
                        )}

                        {/* <Flex align="center" gap=".5rem">
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
                            weight={500}
                          />
                        </Flex> */}

                        {renderVisaPersonalInfo()}

                        <Flex align="center" margin=".5rem 0" gap=".5rem">
                          <MdOutlineFamilyRestroom size={20} />
                          <Text
                            type="p"
                            text={accompanying > 0 ? `Family${accompanying > 0 ? ` (${accompanying} travellers)` : ''}` : "Single"}
                            size={"15px"}
                            weight={500}
                            transform="uppercase"
                          />
                        </Flex>

                        <Flex align="center" gap=".5rem">
                          <MdNumbers size={20} />
                          <Text type="p" text={visa?.uniqueVisaId} size={"15px"} weight={500} transform="uppercase" />
                        </Flex>
                      </Section>
                      {/*OPEN SET ACCOMPANY MODAL */}
                      <div>
                        <Flex justify="flex-end">
                          <Button
                            width="fit-content"
                            styles={{
                              maxWidth: "max-content",
                            }}
                            background="transparent"
                            border="1px solid black"
                            color="black"
                            onClick={() => {
                              // console.log('add-accompany modal')
                              setModalState((prev) => {
                                return {
                                  ...prev,
                                  open: true,
                                  type: 'add-accompany'
                                };
                              });
                            }}
                          >
                            <Text
                              type="p"
                              text="+ Add Accompanies"
                              size={"14px"}
                              weight={500}
                            />
                          </Button>
                        </Flex>
                      </div>
                    </Grid>

                    <Grid columns="" align="center" gap="24px" margin="20px 20px 16px 0" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }}>
                      <div></div>
                      <Section>
                        <Text weight={600} size={20} type="h4" text="Document Requested" margin={"0 0 16px 0"} />
                        <Flex direction="column" align="center" gap=".5rem">
                          {/* <Text type="h3" text="Document Requested" /> */}
                          {visa?.infoRequests.map((info, index) => {
                            return (
                              info.isAnswered ? (
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
                                    weight={500}
                                  />
                                </Flex>
                              ) : (
                                <Section key={`info-request ${index}`} margin="0 0 0 20px">
                                  <ul>
                                    <li>
                                      <Text
                                        type="p"
                                        styles={{ textTransform: 'uppercase' }}
                                        text={info?.information?.[0]}
                                      />
                                    </li>
                                  </ul>
                                  {/* <Text
                                    type="p"
                                    styles={{ textTransform: 'uppercase' }}
                                    text={info?.description}
                                  /> */}
                                </Section>
                              )
                            );
                          })}
                        </Flex>
                      </Section>
                    </Grid>


                    <Grid columns="" align="center" gap="24px" margin="20px 20px 16px 0" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }}>
                      <div></div>
                      <Section>
                        <Text weight={600} size={20} type="h4" text="Added Dependant" />
                      </Section>
                    </Grid>
                    {getDependants().map((dependant: any) => {
                      return (
                        <Grid columns="" align="center" gap="24px" margin="20px 20px 16px 0" style={{ gridTemplateColumns: '80px 2fr 1fr', rowGap: '20px' }} key={dependant?.membersName}>
                          <div></div>
                          <Section>
                            <Flex>
                              <Text type="p" text={dependant?.membersName} weight={500} />
                            </Flex>
                          </Section>

                          <Flex justify="center">
                            <Flex
                              styles={{ backgroundColor: renderAccompany(dependant?.status || 'Pending').bg, color: renderAccompany(dependant?.status || 'Pending').color }}
                              border={`1px solid ${renderAccompany(dependant?.status || 'Pending').border}`}
                              width="fit-content"
                              padding="6px 14px"
                              borderRadius="24px"
                            >
                              <Text type="p" text={dependant?.status?.length > 1 ? dependant?.status : 'PENDING'} />
                              {/* <Text type="p" text={dependant?.status} weight={500} /> */}
                            </Flex>
                          </Flex>
                        </Grid>
                      );
                    })}

                  </Section>
                )}
              </Section>
            )}
          </>
        )}
      </Section>

    </>
  );
}
export default VisaDetail;
