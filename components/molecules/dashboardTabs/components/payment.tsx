import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";
import VisaDashboardHeader from "./visaDashboardHeader";
import Section from "@molecule/section";

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

const HistoryItems = styled.div`
  border: 1px solid #e7e7e7;
  padding: 20px;
  width: 100%;
  border-radius: 28px;
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
    padding: 20px 16px;
  }
`;

const PaymentHistory = () => {
  const { isMobile } = useScreenResolution();

  const paymentRecords = [
    {
      id: 1,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 2,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 3,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },

    {
      id: 4,
      date: "23/04/2023",
      description: "Application fee for Canada - Employment visa",
      amount: "NGN 20,000",
      receipt: "Download receipts",
    },
  ];
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: "2.5rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Payment History" />

      <PaymentWrapper>
        <Flex direction="column" gap="1rem">
          <History>
            <Flex
              justify="space-between"
              width="100%"
              align="center"
              padding="28px 24px"
            >
              <Flex gap=".3rem" direction="column" width="50%">
                <Text
                  type="p"
                  text="23/04/2023"
                  color="#112211"
                  size={14}
                  styles={{ opacity: "75%" }}
                />
                <Text
                  type="h3"
                  size={18}
                  text="Application fee for Canada - Employment visa"
                  color="#112211"
                />
              </Flex>

              <Text type="p" text="NGN 20,000" styles={{ width: "20%" }} />

              <Button
                width="166px"
                height="48px"
                styles={{ marginLeft: "55px" }}
              >
                Download receipts
              </Button>
            </Flex>
          </History>

          <History>
            <Flex
              justify="space-between"
              width="100%"
              align="center"
              padding="28px 24px"
            >
              <Flex gap=".3rem" direction="column" width="50%">
                <Text
                  type="p"
                  text="23/04/2023"
                  color="#112211"
                  size={14}
                  weight={400}
                  styles={{ opacity: "75%" }}
                />
                <Text
                  type="h3"
                  text="Application fee for Canada - Employment visa"
                />
              </Flex>

              <Text type="p" text="NGN 20,000" styles={{ width: "20%" }} />

              <Button
                width="166px"
                height="48px"
                styles={{ marginLeft: "55px" }}
              >
                Download receipts
              </Button>
            </Flex>
          </History>
        </Flex>
      </PaymentWrapper>
    </Section>
  );
};

export default PaymentHistory;
