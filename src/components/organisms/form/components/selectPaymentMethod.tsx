import Text from "@atom/text";
import Flex from "@components/templates/flex";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import SearchInput, { RoundFlag } from "@organism/searchInput";
import { BiSolidInfoCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Section from "src/components/molecules/section";

import { useApplicationFormStore } from "@lib/store/application-form.store";
import { useVoucherStore } from "@lib/store/voucher.store";
import { Mode } from "@lib/types";
import ContinueButton from "@organism/continueButton";
import { PaymentCompleteSection } from "@organism/paymentConfirmationModal";
import CustomConfirmationModal from "@organism/visaApplicationModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VoucherForm from "./voucherForm";

export interface CurrencyType {
  currency: string;
  flag: string;
  currencyCode: string;
}

const SelectPaymentMethod = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const { createFormFeeCharge, createVisaApplicationResponse, mode } =
    useApplicationFormStore((state) => state);
  const { applied, voucher, useVoucher, useVoucherMode } = useVoucherStore(
    (state) => state
  );
  const [currency, setCurrency] = useState<CurrencyType>({
    currency: "Nigerian Naira",
    flag: COUNTRY_FLAGS.find((el) => el.code == "NG")?.flag ?? "",
    currencyCode: "NGN",
  });
  return (
    <>
      <CustomConfirmationModal
        handleClose={() => {
          setModalOpen(false);
          router.push("/dashboard");
        }}
        open={modalOpen}
        child={
          <PaymentCompleteSection
            handleModalClose={() => {
              setModalOpen(false);
              router.push("/dashboard");
            }}
            title="Application Successful"
            description="Your application has been submitted successfully, and a travel voucher was used to pay for your application. Thank you for trusting Thrillers Travels."
          />
        }
      />

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
        <VoucherForm />
        <ContinueButton
          isLoading={mode == Mode.loading || useVoucherMode == Mode.loading}
          onClick={() => {
            if (!createVisaApplicationResponse) return;
            applied && voucher
              ? // eslint-disable-next-line react-hooks/rules-of-hooks
                useVoucher({
                  promoCode: voucher,
                  serviceId: createVisaApplicationResponse.visa,
                }).then((response) => {
                  setModalOpen(true);
                })
              : createFormFeeCharge({
                  data: createVisaApplicationResponse,
                }).then((response) => {
                  window.open(response.data.checkout_url, "_self");
                });
          }}
          buttonText={
            applied && voucher ? "Complete application" : "Make payment"
          }
        />
      </Section>
    </>
  );
};

export default SelectPaymentMethod;
