import Flex from "@atom/flex";
// import Image from "@atom/image";
import Text from "@atom/text";
import styled from "styled-components";
// import CountryLogo from "@asset/flags/ng.svg";
// import Button from "@atom/button";
import Section from "@molecule/section";
// import { Divider } from "@mui/material";
// import { HiClock } from "react-icons/hi";
// import { IoCalendar } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ttColors } from "theme/colors";
// import CountryLogo from "../../../../assets/flags/ng.svg";
import { useScreenResolution } from "hook/useScreenResolution";
// import { FaFileDownload } from "react-icons/fa";
// import apiService from "hook/apiService";
// import { useQuery } from "@tanstack/react-query";
// import { format } from "date-fns";
// import Center from "@atom/center";
import Input from "@atom/input";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import IconButton from "@mui/material/IconButton";
import { CiSearch } from "react-icons/ci";
import { Grid } from "@atom/grid";
import { BiSort } from "react-icons/bi";
import VisaData from "@molecule/dashboardTabs/components/visaDetails";
import React, { useState } from "react";
import { Divider } from "@atom/divider";
import Center from "@atom/center";
import NoVisaApplication from "./noVisaApplication";
import { useQuery } from "@tanstack/react-query";
import apiService from "hook/apiService";
import VisaDashboardHeader from "./visaDashboardHeader";
import NoVisa from "@image/noVisa.png";



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

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0; /* Align to the right */
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-top: none;
  border-radius: 12px;
  padding: 10px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 370px;
  height: 367px;
  z-index: 09999999;
  overflow-y: scroll;
  font-size: 16px;
  font-weight: 400;
  color: #7c7c7a;
  line-height: 19.2px;
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

// interface VisaProps {
//   countryLogoSrc: string;
//   applicationDate: string;
//   paymentFee: string;
//   visaStatus: string;
//   onDownloadStatusClick: () => void;
// }

const Visa = () => {
  const countryLogoSrc = "../../../../assets/flags/ng.svg";
  const applicationDate = "12th May, 2021";
  const paymentFee = "$ 2000";
  const visaStatus = "AWAITING CONFIRMATION";

  const handleDownloadStatusClick = () => {
    // Handle the download status click event
  };



  async function getVisas() {
    return await apiService("/visa", "GET");
  }

  const {
    data: fetchedVisa,
    isLoading,
    error,
  } = useQuery(["visas"], getVisas) as any;
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error loading visas, please try again</div>;
  const { data: visas } = fetchedVisa;

  const content = {
    title: "You’ve got no Visa Application - Let’s help you get Started",
    links: [
      { text: "Apply for Visa", url: "/apply/visa" },
      { text: "Book flight", url: "/flight" },
    ],
  };

  return (
    <VisaWrapper>
      <VisaDashboardHeader headerText="All Visa Applications" />

      <div>
        {visas?.length > 0 ? (
          visas?.map((visa: any, i: number) => (
            <React.Fragment key={i}>
              <VisaData
                countryLogoSrc={countryLogoSrc}
                applicationDate={applicationDate}
                paymentFee={paymentFee}
                visaStatus={visa.visaStatus}
                onDownloadStatusClick={handleDownloadStatusClick}
                downloadButtonText="Download Status"
              />
            </React.Fragment>
          ))
        ) : (
          <Center margin="10rem 0" height="25rem">
            <NoVisaApplication noVisaImage={NoVisa} content={content} />
          </Center>
        )}
      </div>

      {/* // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="AWAITING EMBASSY DECISION"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Download Status"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="APPLICATION IN PROGRESS"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Re-apply Visa"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="VISA FEES REQUIRED"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Pay Visa Fees"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="AWAITING PASSPORT COLLECTION"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Download Status"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="APPROVED"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Make Payment"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus={visaStatus}
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Make Payment"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="DECLINED"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Download Status"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus="PASSPORT PHYSICALLY REQUIRED"
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Make Payment"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus={visaStatus}
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Download Status"
      // />
      // <VisaData */}
      {/* //   countryLogoSrc={countryLogoSrc}
      //   applicationDate={applicationDate}
      //   paymentFee={paymentFee}
      //   visaStatus={visaStatus}
      //   onDownloadStatusClick={handleDownloadStatusClick}
      //   downloadButtonText="Upload Document"
      // /> */}
    </VisaWrapper>
  );
};

export default Visa;
