"use client";
import Text from "@atom/text";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { styled } from "styled-components";
import Modal from "../../../modal";
import Input from "@/components/atoms/input";
import { HiOutlineXMark } from "react-icons/hi2";
import { ttColors } from "@/lib/theme/colors";
import { ChangeEvent, useRef, useState } from "react";
import { DatePicker } from "../../../datepicker";
import dayjs from "dayjs";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import validator from "validator";
import { validateCardType } from "@/lib/extensions/helpers/validateCard";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { Mode } from "@/lib/types";
import Section from "@/components/molecules/section";
import { useCreditCardValidator, images } from "react-creditcard-validator";

const Wrapper = styled.div`
  background: white;
  padding: 2rem 4rem;
  border-radius: 10px;
  width: 40vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

export const CloseMark = styled(HiOutlineXMark)`
  background: #f3f3ff;
  border-radius: 4px;
  width: 3rem;
  height: 3rem;
  padding: 0.75rem;
  cursor: pointer;
`;

function PaymentModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardValidator();

  const { mode } = useFlightBookingStore((state) => state);
  const isLoading = mode == Mode.loading;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");

  const { isMobile } = useScreenResolution();


  const handleCVV = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.replace(/\D/g, "");
    const formattedNumber = formattedValue.match(/.{1,4}/g)?.join(" ");

    if (formattedValue.length <= 3) {
      setCvv(formattedNumber || "");
    }
  };

  let isValid = validator.isCreditCard(cardNumber);
  console.log(isValid);
  console.log(validateCardType(cardNumber));

  return (
    <Modal open={open} handleClose={handleClose}>
      <Wrapper>
        <Flex direction="column" align="center">
          <Flex justify="flex-end">
            <CloseMark fontSize={40} onClick={handleClose} />
          </Flex>
          <Flex direction="column" gap=".2rem" justify="center" align="center">
            <Text type="h2" text="Insert Card" size={30} weight={600} />
            <Text
              type="p"
              text="Enter the your card detail for payment."
              color="#929292"
            />
          </Flex>
          <Flex
            direction="column"
            align="flex-start"
            gap="1.5rem"
            padding="2rem 0"
          >
            <Flex direction="column" gap=".5rem">
              <Text type="p" text="Card Name" />
              <Input
                type="text"
                border="1px solid #E7E7E7"
                padding="1rem"
                placeholder="Enter Card Name"
              />
            </Flex>
            <Flex direction="column" gap=".5rem">
              <Text type="p" text="Card Number" />
              <Section
                styles={{
                  border: "1px solid #E7E7E7",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                width="100%"
              >
                <input {...getCardNumberProps()} />
                <svg {...getCardImageProps({ images })} />
              </Section>
            </Flex>
            <Flex
              direction={isMobile ? "column" : "row"}
              gap="2rem"
              align="center"
            >
              <Flex direction="column" gap=".5rem">
                <Text type="p" text="Expiry Date" />
                <DatePicker
                  placeholder="MM/YY"
                  minDate={dayjs()}
                  views={["month", "year"]}
                  height="30px"
                  format="MM/YY"
                />
              </Flex>
              <Flex direction="column" gap=".5rem">
                <Text type="p" text="CVV" />
                <Input
                  type="text"
                  border="1px solid #E7E7E7"
                  padding="1rem"
                  placeholder="Enter CVV"
                  max={3}
                  value={cvv}
                  onChange={handleCVV}
                />
              </Flex>
            </Flex>
          </Flex>
          <Button
            padding="2rem"
            width="100%"
            background={ttColors.blackishBlue}
          >
            <Text type="p" text="Pay Now" size={16} weight={500} />
          </Button>
        </Flex>
      </Wrapper>
    </Modal>
  );
}

export default PaymentModal;
