import Flex from "@atom/flex";
import Image from "@atom/image";
import Text from "@atom/text";
import styled from "styled-components";
// import CountryLogo from "@asset/flags/ng.svg";
import CountryLogo from "../../../../assets/flags/ng.svg";
import { Grid } from "@atom/grid";
import { ttColors } from "theme/colors";
import { Divider } from "@mui/material";
import { IoCalendar } from "react-icons/io5";
import { HiClock } from "react-icons/hi";
import Button from "@atom/button";
import { BsArrowDown } from "react-icons/bs";

const VisaWrapper = styled.div`
  height: 144px;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  background: ${ttColors.defaultColor};
  border-radius: 16px;
  padding: 32px 24px;
  align-items: center;
  display: flex;
  margin-top: 15px;
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
const AwaitingApproval = styled.div`
  width: 50% !important;
`;
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
  border: 1px solid red;
`;
const Date = styled.div`
  margin-left: 4px;
  width: 100% !important;
`;

const Visa = () => {
  return (
    <VisaWrapper>
      <Flex justify="space-between">
        <CountrySide>
          <Flex justify="space-between">
            <Flex justify="space-evenly" align="center" gap="5px">
              <Logo>
                <Image
                  src={CountryLogo}
                  height={40}
                  width={58.5}
                  alt="country logo"
                />
              </Logo>
              <CountrySelected>
                <Text
                  type="p"
                  letterSpacing="1px"
                  opacity="0.7px"
                  weight="400"
                  size="22px"
                  text="Nigeria(NG) - Canada(CA)"
                />
              </CountrySelected>
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
                  <Text type="p" text="Last Payment" />
                  <Text type="h5" text="Visa Fee" />
                </Date>
              </Flex>
            </DateSelected>
          </Flex>
        </CountrySide>
        <AwaitingApproval>
          <Flex>
            <Text type="h5" text="AWAITING EMBASSY DECISION" />
            <Flex>
              <Button
                background="var(--secondary-color)"
                color="var(--default-color)"
              >
                <Text type="h5" text="Download Status" />
              </Button>
              <Button background="${ttColors.primary}" color="${ttColors.dark}">
                <BsArrowDown />
              </Button>
            </Flex>
          </Flex>
        </AwaitingApproval>
      </Flex>
    </VisaWrapper>
  );
};

export default Visa;
