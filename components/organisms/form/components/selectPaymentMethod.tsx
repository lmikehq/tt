"use client";

import Flex from "@atom/flex";
import SearchInput, { RoundFlag } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useScreenResolution } from "hook/useScreenResolution";
import { BiSolidErrorCircle, BiSolidInfoCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import Button from "@atom/button";
import ContinueButton from "@atom/continueButton";
import Input from "@atom/input";
import { FormikValues } from "formik";
import apiService from "hook/apiService";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useVisaApplicationVoucherStore } from "store/useStore";
import { BsFillCheckCircleFill, BsTrash } from "react-icons/bs";

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
  const [currency, setCurrency] = useState<CurrencyType>({
    currency: "Nigerian Naira",
    flag: COUNTRY_FLAGS.find((el) => el.code == "NG")?.flag.src,
    currencyCode: "NGN",
  });
  const [promoCode, setPromoCode] = useState("");
  const [promoState, setPromoState] = useState({
    loading: false,
    error: "",
  });
  const { setVoucherApplied, applied, voucher } =
    useVisaApplicationVoucherStore((state) => state);
  async function handlePromoCode(e: any) {
    e.preventDefault();
    if (promoState.loading) return;
    setPromoState({
      loading: true,
      error: "",
    });
    if (!promoCode) {
      return setPromoState({
        ...promoState,
        error: "Enter a valid travel voucher",
        loading: false,
      });
    }
    const response = await apiService(`/voucher/${promoCode}`, "GET");
    if (response.statusCode === 200) {
      toast.success("Travel voucher applied");
      setPromoCode("");
      setVoucherApplied({
        voucher: promoCode,
        applied: true,
      });
      return setPromoState({
        ...promoState,
        loading: false,
        error: "",
      });
    } else {
      return setPromoState({
        ...promoState,
        error: response.message,
        loading: false,
      });
    }
  }

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
        <Section margin="3rem  0 0">
          <Text
            text={"Enter Travel Voucher"}
            type={"h3"}
            weight={600}
            size={20}
            margin={"0 0 0.75rem 0"}
          />
          <Text
            text={
              "Enter a travel voucher to unlock a free ticket to complete your visa application "
            }
            weight={400}
            size={15}
            color="#606060"
            type={"p"}
            margin={""}
          />
          <form>
            <Flex gap="1rem" margin="4rem 0 .5rem">
              <Input
                placeholder="Enter Promo Code"
                width="100%"
                flexGrow={1}
                onChange={(e) => setPromoCode(e.target.value)}
                value={promoCode}
                border={`1px solid ${promoState.error ? "#A0001D" : "#bdbdbd"}`}
                height="50px"
                styles={{ outline: "none" }}
              />
              <Button
                type="submit"
                onClick={handlePromoCode}
                width="25%"
                borderRadius="4px"
              >
                <Text
                  type="p"
                  text={promoState.loading ? "Loading..." : "Apply"}
                  weight={600}
                  size="1rem"
                />
              </Button>
            </Flex>
            {promoState.error && (
              <Flex gap="1rem">
                <BiSolidErrorCircle size={25} color="#A0001D" />
                <Text
                  text={promoState?.error || ""}
                  weight={400}
                  size={16}
                  color="#A0001D"
                  type={"p"}
                  margin={""}
                />
              </Flex>
            )}
            {voucher && (
              <Flex gap="1rem" margin="1rem 0 0" width="50%">
                <Flex gap=".5rem" align="center">
                  <BsFillCheckCircleFill size={20} color="#6092A7" />
                  <Text type="p" text={voucher} />
                </Flex>
                <Flex
                  align="center"
                  gap=".5rem"
                  cursor="pointer"
                  onClick={() => {
                    setVoucherApplied({
                      voucher: "",
                      applied: false,
                    });
                    setPromoCode("");
                  }}
                >
                  <BsTrash size={20} color="#A0001D" />
                  <Text type="p" text={"Delete Code"} color="#A0001D" />
                </Flex>
              </Flex>
            )}
          </form>
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {}}
          buttonText="Complete Application"
          disabled={!formik.isValid}
        />
      </form>
    </Section>
  );
};

export default SelectPaymentMethod;
