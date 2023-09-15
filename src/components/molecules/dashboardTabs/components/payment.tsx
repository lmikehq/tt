import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { useQuery } from "@tanstack/react-query";
import currencyFormatter from "@lib/extensions/data/currencyFormatter";
import { format } from "date-fns";
import apiService from "@lib/extensions/hook/apiService";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import styled from "styled-components";
import { ttColors } from "@lib/theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";
import Payment from "@image/dashboard/payment.png";
import Image from "@atom/image";
import { PiEyeLight } from "react-icons/pi";
import CustomDrawer from "@molecule/drawers/customDrawer";
import { GrFormClose } from "react-icons/gr";
import { Divider } from "@atom/divider";

import { useVoucherStore } from "@lib/store/voucher.store";
import { useVisaApplicationVoucherStore } from "@lib/store/useStore";

const SectionTitle = styled.div`
  display: flex;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    margin: 20px 0px 15px;
    line-height: 48px;
    /* identical to box height */

    color: ${ttColors.dark};
    @media screen and (max-width: 390px) {
      margin: 0px 0px -4px !important;
    }
  }
`;

const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  height: fit-content;
  padding: 0px 10px;
  border: 1px solid #e7e7e7;
  border-radius: 14px;

  & div {
    // margin-left: 15px;

    @media screen and (max-width: 390px) {
      margin-left: 0px;
    }
  }

  & p {
    font-weight: 400;
    line-height: 20px;
    color: ${ttColors.dark};
    opacity: 0.7;
  }

  & h3 {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: ${ttColors.dark};
  }

  & button {
    width: 166px;
    height: 48px;
    marginleft: 55px;
  }
`;

const PaymentStatus = styled.div`
  display: grid;
  place-content: center;
  background: #fffeef;
  padding: 14px 18px;
  border-radius: 24px;
  height: 45px;
  width: 25%;

  @media screen and (max-width: 900px) {
    width: 92px;
    height: 35px;
    padding: 10px 16px;
  }
`;

const PaymentWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 5px;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(78.5% + 5px);
  right: 33px;
  background-color: #ffffff;
  border: 1px solid #e7e7e7;
  border-radius: 12px;
  // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 274px;
  height: max-content;
  z-index: 09999999;
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

const PaymentHistory = () => {
  const { isMobile } = useScreenResolution();
  const [isMobileEdit, setIsMobileEdit] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);


function PaymentIcon() {
  return <Image src={Payment} alt="" width={17.2} height={12.4} />;
}

  const { applied, voucher } = useVoucherStore((state) => state);
  async function getAllPayments() {
    return await apiService("/payment", "GET");
  }
  const {
    data: fetchedPayment,
    isLoading,
    error,
  } = useQuery(["payments"], getAllPayments) as any;
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error loading payments, please try again</div>;
  const { data: payments } = fetchedPayment;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setHoveredOption(null);
  };

  const sortOptions = [
    {
      value: "Option 1",
      label: "Make Payment",
      icon: <PaymentIcon />,
      action: () => {},
    },
    {
      value: "Option 2",
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
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: isMobile ? ".5rem" : "1rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Payment History" />

      <PaymentWrapper>
        {isMobileEdit ? (
        <History>
          <Flex
            justify="space-between"
            width="100%"
            align="center"
            padding="18px 14px"
          >
            <Flex direction="column" gap="1rem">
              <Text
                type="p"
                text="Application fee for Canada - Employment visa"
                size={14}
                weight={400}
              />
              <Flex gap="1.5rem" align="center" justify="flex-start">
                <Text
                  type="p"
                  text="23/04/2023"
                  color="#112211"
                  size={12}
                  styles={{ opacity: "75%" }}
                />
                <PaymentStatus style={{ background: "#FFFEEF" }}>
                  <Text
                    type="p"
                    text="PENDING"
                    styles={{ width: isMobile ? "100%" : "20%" }}
                    whiteSpace="nowrap"
                    size={12}
                  />
                </PaymentStatus>
              </Flex>
            </Flex>
            <BiDotsVerticalRounded
              color="#040404"
              size="1.5rem"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <DropdownContent>
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
            <CustomDrawer
              anchor="bottom"
              open={bottomDrawerOpen}
              onClose={() => setBottomDrawerOpen(false)}
            >
              <Section
                height="unset"
                padding={"1.125rem 1.125rem 3.5rem 1.125rem"}
                styles={{
                  background: ttColors.light,
                }}
              >
                <Flex justify="space-between" align="center">
                  <Flex justify="flex-start" gap="1rem" align="center">
                    <Text
                      type="h3"
                      text="Application fee for Canada - Employment visa"
                      size={16}
                      weight={600}
                      width="max-content"
                      color="#112211"
                      styles={{
                        width: "80%",
                      }}
                    />
                  </Flex>
                  <GrFormClose />
                </Flex>
                <Divider direction="horizontal" margin="0px 0px 1rem" />
                <Flex gap="1rem" direction="column">
                  <Flex justify="space-between" align="center">
                    <Text
                      type="h3"
                      text="Email"
                      size={16}
                      weight={500}
                      width="max-content"
                      color="#000000"
                    />
                    <Text
                      type="h3"
                      text="Jonathanadah @gmail.com"
                      size={isMobile ? 14 : 16}
                      weight={400}
                      width="max-content"
                      color="#5C5C5C"
                    />
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text
                      type="h3"
                      text="Date"
                      size={16}
                      weight={500}
                      width="max-content"
                      color="#000000"
                    />
                    <Text
                      type="h3"
                      text="Date"
                      size={isMobile ? 14 : 16}
                      weight={400}
                      width="max-content"
                      color="#5C5C5C"
                    />
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text
                      type="h3"
                      text="Amount"
                      size={16}
                      weight={500}
                      width="max-content"
                      color="#000000"
                    />
                    <Text
                      type="h3"
                      text="NGN 20,000"
                      size={isMobile ? 14 : 16}
                      weight={400}
                      width="max-content"
                      color="#5C5C5C"
                    />
                  </Flex>

                  <Flex justify="space-between" align="center">
                    <Text
                      type="h3"
                      text="Referral Status"
                      size={16}
                      weight={500}
                      width="max-content"
                      color="#000000"
                    />
                    <Button
                      width="max-content"
                      height="48px"
                      padding="5px 20px"
                      styles={{
                        marginLeft: "55px",
                        background: "#FFF1C2",
                        borderRadius: "24px",
                        color: "#614909",
                        display: isMobile ? "block" : "none",
                      }}
                    >
                      <Text type="p" text="PENDING" size={14} weight={600} />
                    </Button>
                  </Flex>
                </Flex>
              </Section>
            </CustomDrawer>
          </Flex>
        </History>
        ) : ( 
        <Flex direction="column" gap="1rem">
          {payments?.length > 0 ? (
            payments?.map((payment: any, i: number) => (
              <History key={i}>
                <Flex
                  justify="space-between"
                  width="100%"
                  align="center"
                  padding="28px 24px"
                  direction={isMobile ? "column" : "row"}
                  gap="1rem"
                >
                  <Flex
                    gap=".3rem"
                    direction="column"
                    width={isMobile ? "100%" : "50%"}
                  >
                    <Text
                      type="p"
                      text={format(
                        new Date(payment?.updatedAt),
                        "dd MMM, yyyy"
                      )}
                      color="#112211"
                      size={14}
                      styles={{ opacity: "75%" }}
                    />
                    <Text
                      type="h3"
                      size={18}
                      text={payment?.paymentIntent}
                      color="#112211"
                    />
                  </Flex>

                  <Text
                    type="p"
                    text={currencyFormatter(payment?.totalAmount)}
                    styles={{ width: isMobile ? "100%" : "20%" }}
                  />
                  <PaymentStatus style={{ background: "#FFFEEF" }}>
                    <Text
                      type="p"
                      text={payment.status}
                      styles={{ width: isMobile ? "100%" : "20%" }}
                      whiteSpace="nowrap"
                    />
                  </PaymentStatus>

                  <Button
                    width="166px"
                    height="48px"
                    styles={{ marginLeft: isMobile ? 0 : "55px" }}
                  >
                    Download receipts
                  </Button>
                </Flex>
              </History>
            ))
          ) : (
            <Flex
              justify="space-between"
              width="100%"
              align="center"
              padding="28px 24px"
            >
              <Text
                type="p"
                text="No payment history"
                color="#112211"
                size={14}
                styles={{ opacity: "75%" }}
              />
            </Flex>
          )}
        </Flex>
        )} 
      </PaymentWrapper>
    </Section>
  );
};

export default PaymentHistory;
