import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";

const Section = styled.div``;
const SectionTitle = styled.div`
  display: flex;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    margin: 20px 0px 15px;
    line-height: 48px;
    /* identical to box height */

    color: ${ttColors.dark};
  }
`;

const History = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  //   padding: 32px 24px;
  //   gap: 32px;

  width: 100%;
  height: 303px;

  /* Neutrals */

  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;

  & div {
    margin-left: 15px;
  }

  & p {
    font-weight: 400;
    font-size: 16px;
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
        marginLeft: 55px;
    }
`;

const PaymentHistory = () => {
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
    ]
  return (
    <div>
      <Section>
        <SectionTitle>
          <Text type="h2" text="Payment History" />
        </SectionTitle>
        <History>
          <Grid
            columns="60% 20% 20%"
            width="100%"
            gap="20px"
            align="center"
            textAlign="left"
            padding="15px 20px"
          >
            {paymentRecords.map((record) => (
                <>
                <div key={record.id}>
                    <Text type="p" text={record.date} />
                    <Text
                type="h3"
                text={record.description}
              />
            </div>
            <Text type="p" text={record.amount} />
            <Button width="166px" height="48px" styles={{ marginLeft: "55px" }}>
              {record.receipt}
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


            {/* <div>
              <Text type="p" text="23/04/2023" />
              <Text
                type="h3"
                text="Application fee for Canada - Employment visa"
              />
            </div>
            <Text type="p" text="NGN 20,000" />
            <Button width="166px" height="48px" styles={{ marginLeft: "55px" }}>
              Download receipts
            </Button> */}
