import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import styled from "styled-components";
// import CountryLogo from "@asset/flags/ng.svg";
import Button from "@atom/button";
import Section from "@molecule/section";
import { Divider } from "@mui/material";
import { HiClock } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ttColors } from "theme/colors";
import CountryLogo from "../../../../assets/flags/ng.svg";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";
import apiService from "hook/apiService";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Center from "@atom/center";
import Input from "@atom/input";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { CiSearch } from "react-icons/ci";
import { Grid } from "@atom/grid";
import { BiSort } from "react-icons/bi";
import VisaData from "./visaDetails";
import { useState } from "react";
import ReusableModal from "./dashboardModal";
import checkIcon from "@image/checkIcon.png"
import VisaDashboardHeader from "./visaDashboardHeader";
import VisaPaymentModal from "../visaPayment";

const VisaWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

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

const VisaStatus = styled.div`
  display: grid;
  place-content: center;
  background: #fffeef;
  padding: 14px 18px;
  border-radius: 24px;
  height: 45px;
  width: 25%;
`;

const DateSelected = styled.div`
  margin-left: 14px;
  align-items: start;

  @media screen and (max-width: 900px) {
    display: flex;
    margin-left: 0px;
  }
`;
const DateIcon = styled.div`
  background: #ebf6f2 !important;
  padding: 10px;
  height: 45px;
  width: 46px;
  border-radius: 8px;
`;

 interface VisaProps {
   countryLogoSrc: string;
   applicationDate: string;
   paymentFee: string;
   visaStatus: string;
   onDownloadStatusClick: () => void;
 }

const Visa = () => {
  const { isMobile } = useScreenResolution();
   const [openModal, setOpenModal] = useState(false);
   const [modalStatus, setModalStatus] = useState<string | null>(null);


   const handleOpenModal = (status: string) => {
     setModalStatus(status);
     setOpenModal(true);
   };

   const handleCloseModal = () => {
     setOpenModal(false);
     setModalStatus(null);
   };
  
  // end here

  // const [openMakePaymentModal, setOpenMakePaymentModal] = useState(false);
  // const [openUploadDocumentModal, setUploadDocumentModal] = useState(false);
  // const [openDocumentUploadedModal, setDocumentUploadedModal] = useState(false);

  // const handleOpenPaymentModal = () => {
  //   setOpenMakePaymentModal(true);
  // }
  // const handleClosePaymentModal = () => {
  //   setOpenMakePaymentModal(false);
  // }

  // const handleUploadDocumentModal = () => { 
  //   setUploadDocumentModal(true);
  // }

  // const handleCloseUploadDocumentModal = () => {
  //   setUploadDocumentModal(false);
  // }

  // const handleDocumentUploadedModal = () => { 
  //   setDocumentUploadedModal(true);
  // }

  // const handleCloseDocumentUploadedModal = () => { 
  //   setDocumentUploadedModal(false);
  // }








 const countryLogoSrc = "../../../../assets/flags/ng.svg";
 const applicationDate = "12th May, 2021";
 const paymentFee = "$ 2000";
  const visaStatus = "AWAITING CONFIRMATION";

   const handleDownloadStatusClick = () => {
     // Handle the download status click event
   };
  
  const getModalContent = (status: string) => {
    switch (status) {
      case "APPLICATION IN PROGRESS":
        return <VisaPaymentModal open={openModal} onClose={handleCloseModal} />;
      case "VISA FEES REQUIRED":
      case "PROCESSING FEES REQUIRED":
      case "COURIER FEES REQUIRED":
      case "PASSPORT PHYSICALLY REQUIRED":
      case "ADDITIONAL DOCUMENTS REQUIRED":
        return <VisaPaymentModal open={openModal} onClose={handleCloseModal} />;
      case "AWAITING CONFIRMATION":
      case "AWAITING EMBASSY DECISION":
      case "AWAITING BIO METRIC":
        return <VisaPaymentModal open={openModal} onClose={handleCloseModal} />;
      // Add more cases for other status modals
      default:
        return null;
    }
  };

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" />

      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="AWAITING EMBASSY DECISION"
        onDownloadStatusClick={() => handleOpenModal("APPLICATION IN PROGRESS")}
        downloadButtonText="Download Status"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="APPLICATION IN PROGRESS"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Re-apply Visa"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="VISA FEES REQUIRED"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Pay Visa Fees"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="AWAITING PASSPORT COLLECTION"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Download Status"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="APPROVED"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Make Payment"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus={visaStatus}
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Make Payment"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="DECLINED"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Download Status"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus="PASSPORT PHYSICALLY REQUIRED"
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Make Payment"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus={visaStatus}
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Download Status"
      />
      <VisaData
        countryLogoSrc={countryLogoSrc}
        applicationDate={applicationDate}
        paymentFee={paymentFee}
        visaStatus={visaStatus}
        onDownloadStatusClick={handleDownloadStatusClick}
        downloadButtonText="Upload Document"
      />
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        headerText="Upload Document"
        description="Kindly Upload the required Document as it will help continue your application"
      >
        <Image src={checkIcon} alt="" width={190} height={190} />
        
        <Text
          type="p"
          text="Proof of Address, International Passport, National ID Needed"
          styles={{
            textAlign: "center",
          }}
        />
        {modalStatus && getModalContent(modalStatus)}
      </ReusableModal>
    </VisaWrapper>
  );
};

export default Visa;
