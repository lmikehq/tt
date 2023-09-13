import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { BiSolidUser } from "react-icons/bi";
import { useVoucherStore } from "@lib/store/voucher.store";
import { styled } from "styled-components";
import { useVisaApplicationVoucherStore } from "@lib/store/useStore";

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
  const { applied, voucher } = useVoucherStore((state) => state);

  return (
    <Section>
      <Container>
        <Flex
          styles={{ minHeight: "4.875rem" }}
          align="center"
          justify="space-between"
          padding="1.5rem 1rem"
          background="#F5F5F5"
        >
          <Text text="Visa Application Type" type="p" weight={600} size={18} />
          <Flex width="fit-content" align="center" gap="0.25rem">
            <BiSolidUser size={18} color="#06062A" />{" "}
            <Text
              text={`${numberOfPersons} person${
                numberOfPersons == 1 ? "" : "s"
              }`}
              type="p"
              weight={400}
              size={16}
              color="#06062A"
            />
          </Flex>
        </Flex>
        <Flex
          styles={{ minHeight: "4.875rem" }}
          align="center"
          justify="space-between"
          padding="0 1rem"
        >
          <Text text={visaApplicationType} type="p" weight={600} size={18} />

          <Text
            text={fee}
            type="p"
            weight={400}
            size={16}
            decoration={applied && voucher ? "line-through" : ""}
          />
        </Flex>
      </Container>
      <Flex
        styles={{ minHeight: "4.875rem" }}
        align="center"
        justify="space-between"
      >
        <Text text="Total" type="p" weight={400} size={20} />

        <Text
          text={totalFee}
          type="p"
          weight={600}
          size={30}
          decoration={applied && voucher ? "line-through" : ""}
        />
      </Flex>
    </Section>
  );
};

export default PaymentSummaryPane;
