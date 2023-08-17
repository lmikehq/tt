import Flex from "@atom/flex";
import Text from "@atom/text";
import Div from "@molecule/div";
import Section from "@molecule/section";
import { BiSolidUser } from "react-icons/bi";
import { styled } from "styled-components";

const Container = styled.div`
  border: solid 1px #e7e7e7;
  border-radius: 6px;
  margin-bottom: 2rem;
`;
interface PaymentSummaryPanePops {
  numberOfPersons: number;
  visaApplicationType: string;
  fee: string;
  totalFee: string;
}
const PaymentSummaryPane = ({
  numberOfPersons,
  visaApplicationType,
  fee,
  totalFee,
}: PaymentSummaryPanePops) => {
  return (
    <Section>
      <Container>
        <Flex
          height="4.875rem"
          align="center"
          justify="space-between"
          padding="0 1rem"
          background="#F5F5F5"
        >
          <Text text="Visa Application Type" type="p" weight={600} size={20} />
          <Flex width="fit-content" gap="0.5rem">
            <BiSolidUser size={24} color="#06062A" />{" "}
            <Text
              text={`${numberOfPersons} person${
                numberOfPersons == 1 ? "" : "s"
              }`}
              type="p"
              weight={400}
              size={18}
              color="#06062A"
            />
          </Flex>
        </Flex>
        <Flex
          height="4.875rem"
          align="center"
          justify="space-between"
          padding="0 1rem"
        >
          <Text text={visaApplicationType} type="p" weight={600} size={20} />

          <Text text={fee} type="p" weight={400} size={18} />
        </Flex>
      </Container>
      <Flex height="4.875rem" align="center" justify="space-between">
        <Text text="Total" type="p" weight={400} size={22} />

        <Text text={totalFee} type="p" weight={600} size={36} />
      </Flex>
    </Section>
  );
};

export default PaymentSummaryPane;
