import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { useScreenResolution } from "hook/useScreenResolution";
import { FaFileDownload } from "react-icons/fa";

const Section = styled.div``;
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

  width: 100%;
  height: fit-content;
  padding: 0px 10px;

  background: #ffffff;
  //   box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 16px;

  & div {
    margin-left: 15px;

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
    <div>
      <Section>
        <SectionTitle>
          <Text
            type="h2"
            size={isMobile ? "16px" : "25px"}
            text="Payment History"
          />
        </SectionTitle>
        <History>
          <Grid
            columns={isMobile ? "55% 30% 15%" : "60% 15% 25%"}
            width="100%"
            gap="20px"
            align="center"
            textAlign="left"
            padding="30px 25px"
          >
            {paymentRecords.map((record) => (
              <>
                <div key={record.id}>
                  <Text
                    type="p"
                    size={isMobile ? "11px" : "16px"}
                    text={record.date}
                  />
                  <Text
                    type="h5"
                    weight="400"
                    size={isMobile ? "12px" : "19px"}
                    text={record.description}
                  />
                </div>
                <Text
                  type="p"
                  size={isMobile ? "12px" : "16px"}
                  text={record.amount}
                />
                <Button
                  width="166px"
                  height="48px"
                  styles={{
                    marginLeft: isMobile ? "0px" : "55px",
                    display: isMobile ? "none" : "block",
                  }}
                >
                  {record.receipt}
                </Button>
                <Button
                  width="40px"
                  height="40px"
                  styles={{
                    display: isMobile ? "block" : "none",
                    marginLeft: isMobile ? "0px" : "55px",
                  }}
                >
                  <FaFileDownload size="1rem" />
                </Button>
              </>
            ))}
          </Grid>
        </History>
      </Section>
    </div>
  );
};

export default PaymentHistory;

{
  /* <div>
              <Text type="p" text="23/04/2023" />
              <Text
                type="h3"
                text="Application fee for Canada - Employment visa"
              />
            </div>
            <Text type="p" text="NGN 20,000" />
            <Button width="166px" height="48px" styles={{ marginLeft: "55px" }}>
              Download receipts
            </Button> */
}
