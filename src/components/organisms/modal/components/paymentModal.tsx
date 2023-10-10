"use client";
import Text from "@atom/text";
import Lottie from "lottie-react";
import { IoCloseSharp } from "react-icons/io5";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import Link from "@atom/link";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { styled } from "styled-components";
import Modal from "..";
import Input from "@/components/atoms/input";
import { HiOutlineXMark } from "react-icons/hi2";
import { ttColors } from "@/lib/theme/colors";
import { ChangeEvent, useState } from "react";
import { DatePicker } from "../../datepicker";
import dayjs from "dayjs";

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
  const [cvv, setCvv] = useState("");

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 3) {
      setCvv(value.slice(0, 3));
    } else {
      setCvv(value);
    }
  };

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
                type="email"
                border="1px solid #E7E7E7"
                padding="1rem"
                placeholder="Enter Card Name"
              />
            </Flex>
            <Flex direction="column" gap=".5rem">
              <Text type="p" text="Card Number" />
              <Input
                type="text"
                border="1px solid #E7E7E7"
                padding="1rem"
                placeholder="Enter Card Number"
              />
            </Flex>
            <Flex gap="2rem">
              <Flex direction="column" gap=".5rem">
                <Text type="p" text="Expiry Date" />
                <DatePicker
                  placeholder="MM/YY"
                  minDate={dayjs()}
                  views={["month", "year"]}
                  height="40px"
                  format="MM/YY"
                />
              </Flex>
              <Flex direction="column" gap=".5rem">
                <Text type="p" text="CVV" />
                <Input
                  type="number"
                  border="1px solid #E7E7E7"
                  padding="1rem"
                  placeholder="Enter CVV"
                  min={3}
                  max={3}
                  value={cvv}
                  onChange={handleInput}
                />
              </Flex>
            </Flex>
          </Flex>
          <Button
            padding="2rem"
            width="100%"
            background={ttColors.blackishBlue}
          >
            <Text type="p" text="Add to List" size={16} weight={500} />
          </Button>
        </Flex>
      </Wrapper>
    </Modal>
  );
}

export default PaymentModal;
