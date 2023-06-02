import styled from "styled-components";
import Text from "@atom/text";
import { ttColors } from "theme/colors";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import Button from "@atom/button";
import { BsClipboard } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import toast from "react-hot-toast";

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

    color: ${ttColors.dark};
  }

  & div {
    display: flex;
    gap: 2px;
  }
`;

const Referral = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 460px;

  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  border-radius: 16px;

  & div {
    margin-left: 15px;

    // & .title {
    //     margin-left: 15px !important;
    //     display: flex;
    // }
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
    width: 57px !important;
    // height: 38px;
    margin-left: 10px !important;
  }
`;

// const Referrals = ({ referralLink }) => {
const Referrals = () => {
  const referralLink =
    "https://thrillerstravels.com/register?ref=john_doe.2332";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard");
      });

  };
  const referralRecord = [
    {
      id: 1,
      date: "23/04/2023",
      name: "Michael R Kelly",
      bonus: "NGN 20,000",
      status: "claimed",
      receipt: <MdKeyboardArrowDown size="2rem" />,
    },

    {
      id: 2,
      date: "23/04/2023",
      name: "Michael R Kelly",
      bonus: "NGN 20,000",
      status: "claimed",
      receipt: <MdKeyboardArrowDown size="2rem" />,
    },

    {
      id: 3,
      date: "23/04/2023",
      name: "Michael R Kelly",
      bonus: "NGN 20,000",
      status: "claimed",
      receipt: <MdKeyboardArrowDown size="2rem" />,
    },

    {
      id: 4,
      date: "23/04/2023",
      name: "Michael R Kelly",
      bonus: "NGN 20,000",
      status: "claimed",
      receipt: <MdKeyboardArrowDown size="2rem" />,
    },
  ];

  return (
    <div>
      <Section>
        <SectionTitle>
          <Flex justify="space-between" align="center">
            <Text type="h2" size="25px" text="Referrals" />
            <Flex justify="flex-end" onClick={copyToClipboard} cursor="pointer">
              <Text
                type="h5"
                size="19px"
                decoration="underline"
                text={referralLink}
              />
              <BsClipboard size="1.2rem" />
            </Flex>
          </Flex>
        </SectionTitle>
        <Referral>
          <Grid
            columns="50% 20% 20% 10%"
            width="100%"
            gap="20px"
            align="center"
            textAlign="left"
            padding="15px 20px"
          >
            <Text type="p" text="Name/Date" />
            <Text type="p" text="Referral bonus" />
            <Text type="p" text="bonus status" />
            <Text type="p" text="" />
          </Grid>
          <Grid
            columns="50% 20% 20% 10%"
            width="100%"
            gap="20px"
            align="center"
            textAlign="left"
            padding="15px 20px"
          >
            {referralRecord.map((record) => (
              <>
                <div key={record.id}>
                  <Text type="p" text={record.date} />
                  <Text type="h5" weight="400" size="19px" text={record.name} />
                </div>
                <Text type="h5" weight="400" size="19px" text={record.bonus} />
                <Text type="h5" weight="400" size="19px" text={record.status} />
                <Button
                  width="166px"
                  height="48px"
                  styles={{ marginLeft: "55px" }}
                >
                  {record.receipt}
                </Button>
              </>
            ))}
          </Grid>
        </Referral>
      </Section>
    </div>
  );
};

export default Referrals;

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
