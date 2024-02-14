"use client";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useVoucherStore } from "@/lib/store/voucher.store";
import { ttColors } from "@/lib/theme/colors";
import { Mode } from "@lib/types";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BiSolidErrorCircle } from "react-icons/bi";
import { BsFillCheckCircleFill, BsTrash } from "react-icons/bs";

function VoucherForm({ modal = false }: { modal?: boolean; }) {
  const { isMobile } = useScreenResolution();
  const [promoCode, setPromoCode] = useState("");
  const {
    voucher,
    errorMessage,
    checkVoucher,
    mode: voucherMode,
    deleteVoucher,
  } = useVoucherStore((state) => state);
  return (
    <Section margin={isMobile ? '3rem 0 0' : "3rem 0 0"}>
      <Text
        text={"Enter Coupon Code"}
        type={"h3"}
        weight={600}
        size={20}
        margin={"0 0 0.75rem 0"}
        textAlign={isMobile ? 'center' : 'left'}
      />
      <Text
        text={
          "Enter a coupon code to unlock a free ticket to complete your visa application."
        }
        weight={400}
        size={15}
        color="#606060"
        type={"p"}
        margin={""}
        textAlign={isMobile ? 'center' : 'left'}
      />
      <form onSubmit={(e) => e.preventDefault()}>
        <Flex
          gap="1rem"
          margin={`${isMobile ? "1rem" : modal ? "1rem" : "2rem"} 0 .5rem`}
          direction={isMobile ? "column" : "row"}
        >
          <Input
            placeholder="Enter a valid voucher code"
            width="100%"
            flexGrow={1}
            onChange={(e) => setPromoCode(e.target.value)}
            value={promoCode}
            border={`1px solid ${voucherMode == Mode.error ? "#A0001D" : "#bdbdbd"
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
            background={ttColors.dark}
          >
            <Text
              type="p"
              text={voucherMode == Mode.loading ? "Loading..." : "Apply"}
              weight={600}
              size="1rem"
            />
          </Button>
        </Flex>
      </form>
      {voucherMode == Mode.error && (
        <Flex gap="1rem" align="center">
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
        <Flex gap="2rem" margin="1rem 0 0" >
          <Flex gap=".5rem" align="center" width="fit-content">
            <BsFillCheckCircleFill size={20} color="#6092A7" />
            <Text type="p" text={voucher} />
          </Flex>
          <Flex
            align="center"
            gap=".5rem"
            cursor="pointer"
            width="fit-content"
            onClick={() => {
              deleteVoucher();
              setPromoCode("");
            }}
          >
            <BsTrash size={20} color="#A0001D" />
            <Text type="p" text={"Delete Code"} color="#A0001D" whiteSpace="nowrap" />
          </Flex>
        </Flex>
      )}
    </Section>
  );
}

export default VoucherForm;
