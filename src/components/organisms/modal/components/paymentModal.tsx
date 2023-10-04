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

function PaymentModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal open={open} handleClose={handleClose}>
      <Wrapper>
        <Flex direction="column" align="center">
          <Flex justify="flex-end">
            {/* <CloseMark fontSize={40} onClick={props.setOpen} /> */}
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
              <Input
                type="email"
                border="1px solid #E7E7E7"
                padding="1rem"
                placeholder="Enter Card Name"
              />
            </Flex>
            <Flex direction="column" gap=".5rem">
              <Text type="p" text="CVV" />
              <Input
                type="text"
                border="1px solid #E7E7E7"
                padding="1rem"
                placeholder="Enter CVV"
              />
            </Flex>
            </Flex>
          </Flex>
          <Button padding="2rem" width="100%">
            <Text type="p" text="Add to List" size={16} weight={500} />
          </Button>
        </Flex>
      </Wrapper>
    </Modal>
  );
}

export default PaymentModal;
