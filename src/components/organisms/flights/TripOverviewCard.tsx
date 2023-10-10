import Text from "@/components/atoms/text";
import SearchFlagInput from "@/components/molecules/searchInputs/searchFlagInput";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { ttColors } from "@/lib/theme/colors";
import { AiFillInfoCircle } from "react-icons/ai";
import SearchInput from "../searchInput";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

type PaymentProps = {
    countryCode: string,
    code: string,
    name: string
}

function TripOverviewCard() {
  const [payment, setPayment] = useState({
    countryCode: "NG",
    code: "NGN",
    currency: "Nigerian Naira",
  });

  const handlePayment = (x: PaymentProps) => {
    console.log(x)
    setPayment((prev) => ({
        ...prev,
        countryCode: x.countryCode,
        code: x.code,
        currency: x.name
    }))
  }

  return (
    <Section>
      <Flex direction="column" gap=".75rem">
        <Text text="Trip Overview & Payment" type="h2" weight={700} />
        <Text
          text="Make payment for your flight booking"
          type="p"
          color="#606060"
        />
      </Flex>

      <Flex direction="column" gap="1rem" padding="3rem 0">
        <Text text="Select Payment" type="h3" />
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.currency,
            flag: x.flag,
            code: x.currencyCode,
            countryCode: x.code
          }))}
          onChange={(x) => handlePayment(x)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer" align="center">
            <Flex gap="2rem" align="center">
              <img
                src={
                  COUNTRY_FLAGS.find((x) => x.code === payment.countryCode)
                    ?.flag
                }
                alt="flag"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Text
                type="p"
                text={`${payment.code} - ${payment.currency}`}
              />
            </Flex>
            <IoIosArrowDown size={25} />
          </Flex>
        </SearchInput>
        <Flex gap="1rem">
          <AiFillInfoCircle color={ttColors.primary} size="2.5rem" />
          <Text
            text="Only the Nigerian currency naira (Naira) is active for now. Other currencies will be made available soon."
            type="p"
            color="#606060"
          />
        </Flex>
      </Flex>
    </Section>
  );
}

export default TripOverviewCard;
