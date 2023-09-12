import Flex from "@components/templates/flex";
import SearchInput, { RoundFlag } from "@organism/searchInput";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { BiSolidErrorCircle, BiSolidInfoCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

import ContinueButton from "@organism/continueButton";
import { FormikValues } from "formik";
import { useState } from "react";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import { Mode } from "@lib/types";
import { BsFillCheckCircleFill, BsTrash } from "react-icons/bs";
import { useVoucherStore } from "@lib/store/voucher.store";
import Button from "@atom/button";
import Input from "@atom/input";
import { toast } from "react-hot-toast";
import CustomConfirmationModal from "@organism/visaApplicationModal";
import { PaymentCompleteSection } from "@organism/paymentConfirmationModal";
import { useRouter } from "next/navigation";

export interface CurrencyType {
  currency: string;
  flag: string;
  currencyCode: string;
}

interface SelectPaymentMethodProps {}
const SelectPaymentMethod = () => {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const { createFormFeeCharge, createVisaApplicationResponse, mode } =
    useApplicationFormStore((state) => state);
  const {
    applied,
    voucher,
    errorMessage,
    checkVoucher,
    useVoucher,
    mode: voucherMode,
    useVoucherMode,
    deleteVoucher,
  } = useVoucherStore((state) => state);
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
          <Flex
            gap="1rem"
            margin={`${isMobile ? "1rem" : "4rem"} 0 .5rem`}
            direction={isMobile ? "column" : "row"}
          >
            <Input
              placeholder="Enter a valid voucher code"
              width="100%"
              flexGrow={1}
              onChange={(e) => setPromoCode(e.target.value)}
              value={promoCode}
              border={`1px solid ${
                voucherMode == Mode.error ? "#A0001D" : "#bdbdbd"
              }`}
              height="50px"
              styles={{ outline: "none" }}
            />
            <Button
              onClick={() => {
                if (voucherMode == Mode.loading) return;

                checkVoucher({ promoCode }).then((response) => {
                  toast.success("Travel voucher applied");
                  setPromoCode("");
                });
              }}
              disabled={!promoCode}
              width={isMobile ? "100%" : "25%"}
              borderRadius="4px"
            >
              <Text
                type="p"
                text={voucherMode == Mode.loading ? "Loading..." : "Apply"}
                weight={600}
                size="1rem"
              />
            </Button>
          </Flex>
          {voucherMode == Mode.error && (
            <Flex gap="1rem">
              <BiSolidErrorCircle size={25} color="#A0001D" />
              <Text
                text={errorMessage || ""}
                weight={400}
                size={16}
                color="#A0001D"
                type={"p"}
                margin={""}
              />
            </Flex>
          )}
          {voucher && (
            <Flex
              gap="1rem"
              margin="1rem 0 0"
              width={isMobile ? "100%" : "50%"}
            >
              <Flex gap=".5rem" align="center">
                <BsFillCheckCircleFill size={20} color="#6092A7" />
                <Text type="p" text={voucher} />
              </Flex>
              <Flex
                align="center"
                gap=".5rem"
                cursor="pointer"
                onClick={() => {
                  deleteVoucher();
                  setPromoCode("");
                }}
              >
                <BsTrash size={20} color="#A0001D" />
                <Text type="p" text={"Delete Code"} color="#A0001D" />
              </Flex>
            </Flex>
          )}
        </Section>
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
                  window.open(response.data.data.checkout_url, "_self");
                });
          }}
          buttonText="Make Payment"
        />
      </Section>
    </>
  );
};

export default SelectPaymentMethod;
