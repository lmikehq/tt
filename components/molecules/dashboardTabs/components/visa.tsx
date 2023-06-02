import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import styled from "styled-components";
// import CountryLogo from "@asset/flags/ng.svg";
import Button from "@atom/button";
import { Divider } from "@mui/material";
import { BsArrowDown } from "react-icons/bs";
import { HiClock } from "react-icons/hi";
import { IoCalendar } from "react-icons/io5";
import { ttColors } from "theme/colors";
import CountryLogo from "../../../../assets/flags/ng.svg";
import Center from "@atom/center";
import { MdKeyboardArrowDown } from "react-icons/md";
import Section from "@molecule/section";

const VisaWrapper = styled.div`
  height: 144px;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  background: ${ttColors.defaultColor};
  border-radius: 16px;
  padding: 32px 24px;
  align-items: center;
  display: flex;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }
`;
const CountrySide = styled.div`
  width: 50%;
`;
const Logo = styled.div`
  height: 64px;
  width: 80px;
  border: 1px solid ${ttColors.primary};
  padding: 10px;
  border-radius: 8px;
`;
const CountrySelected = styled.div``;
// const AwaitingApproval = styled.div`
//   width: 50% !important;
// `;
const DateSelected = styled.div`
  margin-left: 14px;
  align-items: start;
`;
const DateIcon = styled.div`
  //   background: EBF6F2;
  background: #ebf6f2 !important;
  padding: 10px;
  height: 45px;
  width: 46px;
  border-radius: 8px;
`;
const Date = styled.div`
  margin-left: 4px;
  width: 100% !important;
`;

const Visa = () => {
  return (
    <VisaWrapper>
      <Flex justify="space-between" gap="4rem">
        <Flex justify="space-between" width="50%">
          <Flex align="center" gap="1rem">
            <Logo>
              <Image
                src={CountryLogo}
                height={40}
                width={58.5}
                alt="country logo"
              />
            </Logo>

            <Text
              type="p"
              letterSpacing="1px"
              weight={400}
              size="1.3rem"
              text="Nigeria(NG) - Canada(CA)"
              // whiteSpace="nowrap"
            />
          </Flex>
          <Divider orientation="vertical" flexItem />
          <DateSelected>
            <Flex justify="space-between" gap="10px" margin="0px 0px 10px 0px">
              <DateIcon>
                <IoCalendar color="#8DD3BB" size="1.5rem" />
              </DateIcon>
              <Date>
                <Text type="p" text="Date" />
                <Text type="h5" text="12-10-23" />
              </Date>
            </Flex>

            <Flex justify="space-between" gap="10px">
              <DateIcon>
                <HiClock color="#8DD3BB" size="1.5rem" />
              </DateIcon>
              <Date>
                <Text type="p" text="Last Payment" whiteSpace="nowrap" />
                <Text type="h5" text="Visa Fee" />
              </Date>
            </Flex>
          </DateSelected>
        </Flex>

        <Flex align="center" width="50%" justify="space-between">
          <Text
            type="h5"
            text="AWAITING EMBASSY DECISION"
            weight={400}
            size={15}
          />
          <Flex
            width="50%"
            justify="space-between"
            gap="1rem"
            margin="0 -3.8rem 0 0"
          >
            <Button>
              <Text type="h5" text="Download Status" weight={100} />
            </Button>
            <Section width="140px">
              <Button
                background="${ttColors.primary}"
                color="${ttColors.dark}"
                border={`1px solid ${ttColors.primary}`}
                // width="10%"
              >
                <MdKeyboardArrowDown size="1.5rem" />
              </Button>
            </Section>
          </Flex>
        </Flex>
      </Flex>
    </VisaWrapper>
  );
};

export default Visa;
