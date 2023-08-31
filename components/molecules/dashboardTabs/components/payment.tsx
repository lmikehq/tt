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
import { useQuery } from "@tanstack/react-query";
import apiService from "hook/apiService";
import { format } from "date-fns";
import currencyFormatter from "data/currencyFormatter";

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
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "14px",
        padding: "1rem 1.5rem",
      }}
    >
      <VisaDashboardHeader headerText="Payment History" />

      <PaymentWrapper>
        <Flex direction="column" gap="1rem">
          {payments?.length > 0 ? (
            payments?.map((payment: any) => (
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
                    styles={{ width: "20%" }}
                  />
                  <PaymentStatus style={{ background: "#FFFEEF" }}>
                    <Text
                      type="p"
                      text={payment.status}
                      styles={{ width: "20%" }}
                      whiteSpace="nowrap"
                      // color="#7A7422"
                    />
                  </PaymentStatus>

                  <Button
                    width="166px"
                    height="48px"
                    styles={{ marginLeft: "55px" }}
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
      </PaymentWrapper>
    </Section>
  );
};

export default PaymentHistory;
