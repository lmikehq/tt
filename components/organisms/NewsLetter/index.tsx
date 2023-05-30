"use client";
import styled from "styled-components";
import Text from "../../atoms/text";
import Flex from "../../atoms/flex";
// import Link from "../../atoms/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import Barcode from "@image/barcode.png";
import AppLogo from "@image/appStore.png";
import PlayStore from "@image/playStore.png";

import { Grid } from "../../atoms/grid";

const SubscribeWrapper = styled.div`
  position: absolute;
  left: 7.5%;
  bottom: 90%;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  background: var(--semi-bg-color);
  z-index: -1;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 15.6rem;
  border-radius: 1.5rem;
  padding: 2.5rem;
`;

const Subcribe = styled.div`
  display: block;

  & h3 {
    margin: 0;
    padding-bottom: 1rem;
  }

  & p {
    padding-bottom: 1.5rem;
    font-size: 0.94rem;
  }

  & input {
    width: 100%;
    padding: 1.5rem;
    height: 3.6rem;
    border: none;
    margin-right: -0.15rem;
    border-radius: 0.3rem;

    &:focus {
      border: none;
    }

    &::placeholder {
      line-height: 1.3rem;
      font-size: 1rem;
      font-weight: 400;
      color: var(--placeholder-color);
    }
  }

  & button {
    background: var(--secondary-color);
    // color: var(--default-color);
    color: #fff;
    padding: 0.5rem 2rem;
    text-transform: capitalize;
    font-weight: 600;

    &:hover {
        background: var(--secondary-color);
    }
  }
`;

const NewsLetter = () => {
  return (
    <SubscribeWrapper>
      <Flex justify='space-between'>
        <Subcribe className="newsLetter">
          <Text
            type="h3"
            text="Subscribe to our newsletter"
            size="1.5rem"
            color="#06062A"
          />
          <Text
            type="p"
            text="Get inspired! Receive travel discounts, visa tips and behind the scenes stories."
            size="1rem"
            color="#06062A"
          />
          <Flex direction="row" gap="1rem">
            <input type="text" placeholder="Enter your email address" />
            <Button variant="contained" size="medium">
              Subscribe
            </Button>
          </Flex>
        </Subcribe>

        <Flex gap="1rem" align="flex-end" width='auto'>
          <Image src={Barcode} alt="visa" width="110" height="110" style={{marginLeft: '7rem', marginBottom: '1.2rem'}} />
          <Flex
            direction="column"
            gap="0.5rem"
            align="center"
            padding="0rem 0rem 1.5rem"
            width="10rem"
          >
            <Image src={AppLogo} alt="mastercard" height="50" />
            <Image
              src={PlayStore}
              alt="american-express"
              height="50"
            />
          </Flex>
        </Flex>
      </Flex>
    </SubscribeWrapper>
  );
};

export default NewsLetter;
