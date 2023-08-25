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
  //   background: EBF6F2;
  background: #ebf6f2 !important;
  padding: 10px;
  height: 45px;
  width: 46px;
  border-radius: 8px;
`;

const Visa = () => {
  const { isMobile } = useScreenResolution();
  // async function getVisas() {
  //   return await apiService("/visa", "GET");
  // }

  // const {
  //   data: fetchedVisa,
  //   isLoading,
  //   error,
  // } = useQuery(["visas"], getVisas) as any;
  // if (isLoading) return <div>loading</div>;
  // if (error) return <div>error loading visas, please try again</div>;
  // const { data: visas } = fetchedVisa;
  return (
    <VisaWrapper>
      {/* {visas?.length > 0 ? (
        visas?.map((visa: any, i: number) => ( */}
      <Flex
        justify="space-around"
        gap={isMobile ? ".5rem" : "0rem"}
        direction={isMobile ? "column" : "row"}
        margin="2rem 0"
        // key={i}
        border="1px solid #E7E7E7"
        padding="32px 24px"
        borderRadius="16px"
        align="center"
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
              // text="Nigeria(NG) — Canada(CA)"
              // text={`${visa?.homeCountry} — ${visa?.destination}`}
              text="Nigeria(NG) — Canada(CA)"
              // whiteSpace="nowrap"
            />

            <Flex justify="flex-start" gap="1rem">
              <Flex
                justify="space-between"
                gap="10px"
                margin="0px 0px 10px 0px"
                width="100%"
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
                    text="12th May, 2021"
                    color="#112211"
                    size={14}
                    weight={500}
                    // text={format(new Date(visa?.date), "dd MMM, yyyy")}
                    //  `${format(new Date(row.createdAt), "dd MMM, yyyy")}`,
                  />
                </Section>
              </Flex>

              <Flex justify="space-between" gap="10px">
                <DateIcon>
                  <HiClock color="#8DD3BB" size="1.5rem" />
                </DateIcon>
                <Section>
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
                    text="$ 2000"
                    color="#112211"
                    size={14}
                    weight={500}
                  />
                </Section>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <VisaStatus>
          <Text
            type="h5"
            // text={visa.status}
            text="AWAITING CONFIRMATION"
            weight={800}
            size={isMobile ? 13 : 14}
          />
        </VisaStatus>

        <Flex
          width="30%"
          justify="space-between"
          gap="1rem"
          margin="0 -2.8rem 0 0"
          align="center"
        >
          <Button
            padding="8px 16px"
            width="100px !important"
            height="48px"
            styles={{
              marginLeft: isMobile ? "0px" : "55px",
              display: isMobile ? "none" : "block",
            }}
          >
            <Text type="h5" text="Download Status" weight={400} size={14} />
          </Button>
          

          <Section
            width="140px"
            styles={{
              display: isMobile ? "none" : "block",
            }}
          >
            <Button
              background="${ttColors.primary}"
              color="${ttColors.dark}"
              border={`1px solid ${ttColors.primary}`}
              height="48px"
              width="48px"
            >
              <MdKeyboardArrowDown size="1.5rem" />
            </Button>
          </Section>
        </Flex>
      </Flex>
      {/* ))
      ) : (
        <Center margin="2rem 0" height="5rem">
          No Visa Application Found
        </Center>
      )} */}
    </VisaWrapper>
  );
};

export default Visa;
