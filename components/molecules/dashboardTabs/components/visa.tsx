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
  // height: 144px;
  // box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  background: ${ttColors.defaultColor};
  border-radius: 16px;
  // padding: 32px 24px;
  align-items: center;
  // display: flex;
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
  return (
    <VisaWrapper>
      {visas?.length > 0 ? (
        visas?.map((visa: any, i: number) => (
          <Flex
            justify="space-between"
            gap={isMobile ? ".5rem" : "4rem"}
            direction={isMobile ? "column" : "row"}
            margin="2rem 0"
            key={i}
            borderBottom="1px solid #E5E5E5"
            padding="22px 14px"
          >
            <Flex
              justify="center"
              width={isMobile ? "100%" : "50%"}
              direction={isMobile ? "column" : "row"}
              gap={isMobile ? "7px" : "0rem"}
            >
              <Flex align="center" gap={isMobile ? "2rem" : "1rem"}>
                <Logo>
                  <Image
                    src={CountryLogo}
                    height={isMobile ? 20 : 40}
                    width={isMobile ? 40 : 58.5}
                    alt="country logo"
                  />
                </Logo>

                <Text
                  type="p"
                  letterSpacing="1px"
                  weight={400}
                  size={isMobile ? "1rem" : "1.3rem"}
                  // text="Nigeria(NG) - Canada(CA)"
                  text={`${visa?.homeCountry} - ${visa?.destination}`}
                  // whiteSpace="nowrap"
                />
              </Flex>
              <Divider orientation="vertical" flexItem />
              <DateSelected>
                <Flex
                  justify="space-between"
                  gap="10px"
                  margin="0px 0px 10px 0px"
                >
                  <DateIcon>
                    <IoCalendar color="#8DD3BB" size="1.5rem" />
                  </DateIcon>
                  <Section>
                    <Text type="p" text="Updated" />
                    <Text
                      type="h5"
                      text={format(new Date(visa?.date), "dd MMM, yyyy")}
                    />
                  </Section>
                </Flex>

                <Flex justify="space-between" gap="10px">
                  <DateIcon>
                    <HiClock color="#8DD3BB" size="1.5rem" />
                  </DateIcon>
                  <Section>
                    <Text type="p" text="Last Payment" whiteSpace="nowrap" />
                    <Text type="h5" text="Visa Fee" />
                  </Section>
                </Flex>
              </DateSelected>
            </Flex>

            <Flex
              align="center"
              width={isMobile ? "100%" : "50%"}
              justify={isMobile ? "space-between" : "center"}
            >
              <Text
                type="h5"
                text={visa.status}
                weight={400}
                size={isMobile ? 13 : 15}
              />
              <Flex
                width="50%"
                justify="space-between"
                gap="1rem"
                margin="0 -3.8rem 0 0"
                align="center"
              >
                <Button
                  width="166px"
                  height="48px"
                  styles={{
                    marginLeft: isMobile ? "0px" : "55px",
                    display: isMobile ? "none" : "block",
                  }}
                >
                  <Text type="h5" text="Download Status" weight={100} />
                </Button>
                <Button
                  styles={{
                    display: isMobile ? "block" : "none",
                    marginLeft: isMobile ? "17px" : "55px",

                    color: "rgb(255, 255, 255)",
                    width: "59px",
                    height: "37px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <FaFileDownload size="1rem" />
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
                    height="28px"
                  >
                    <MdKeyboardArrowDown size="1.5rem" />
                  </Button>
                </Section>
              </Flex>
            </Flex>
          </Flex>
        ))
      ) : (
        <Center margin="2rem 0" height="5rem">No Visa Application Found</Center>
      )}
    </VisaWrapper>
  );
};

export default Visa;
