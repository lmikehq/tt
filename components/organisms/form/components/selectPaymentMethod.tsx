import Flex from "@atom/flex";
import SearchInput, { RoundFlag } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useScreenResolution } from "hook/useScreenResolution";
import { BiSolidInfoCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import ContinueButton from "@atom/continueButton";
import { FormikValues } from "formik";
import { useState } from "react";

export interface CurrencyType {
  currency: string;
  flag: string;
  currencyCode: string;
}

interface SelectPaymentMethodProps {
  isLoading: boolean;
  formik: FormikValues;
}
const SelectPaymentMethod = ({
  isLoading,
  formik,
}: SelectPaymentMethodProps) => {
  const { isMobile } = useScreenResolution();
  const [currency, setCurrency] = useState<CurrencyType>({
    currency: "Nigerian Naira",
    flag: COUNTRY_FLAGS.find((el) => el.code == "NG")?.flag.src,
    currencyCode: "NGN",
  });
  return (
    <Section>
      <Section margin="0 0 3.375rem 0">
        <Text
          text={"Select Visa Payment"}
          type={"h3"}
          weight={600}
          size={24}
          margin={"0 0 0.75rem 0"}
        />
        <Text
          text={"Select your preferred currency to make payment"}
          weight={400}
          size={18}
          color="#606060"
          type={"p"}
          margin={""}
        />
      </Section>
      <form onSubmit={formik.handleSubmit}>
        <Section>
          <Text
            text={"Select currency"}
            weight={400}
            size={18}
            type={"h5"}
            margin={"0 0 1.125rem 0"}
          />

          <Section margin="0 0 1.5rem 0">
            <SearchInput
              options={COUNTRY_FLAGS.filter((x) => x.code == "NG").map(
                (el) => ({
                  flag: el.flag,
                  code: el.currencyCode,
                  name: el.currency,
                })
              )}
              onChange={(x) => {
                setCurrency({
                  currency: x.name,
                  currencyCode: x.code,
                  flag: x.flag.src,
                });
              }}
            >
              <Flex gap="1.5rem" margin="0 .6rem" align="center">
                <RoundFlag flag={currency?.flag ?? ""} />
                <Flex
                  gap=".6rem"
                  justify="space-between"
                  align="center"
                  cursor="pointer"
                >
                  <Text
                    type="p"
                    text={`${currency?.currencyCode} - ${currency?.currency}`}
                    color="#1C1B1F"
                    weight={100}
                  />
                  <IoIosArrowDown size={20} />
                </Flex>
              </Flex>
            </SearchInput>
          </Section>
          <Section styles={{ display: "flex" }}>
            <BiSolidInfoCircle
              size={32}
              color={"#6092A7"}
              style={{ marginRight: "1.125rem" }}
            />
            <Section>
              <Text
                text="Only the Nigerian currency naira (Naira) is active for now. Other currencies will be made available soon."
                type="p"
              />
            </Section>
          </Section>
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {
          }}
          buttonText='Make Payment'
          disabled={!formik.isValid}
        />
      </form>
    </Section>
  );
};

export default SelectPaymentMethod;
