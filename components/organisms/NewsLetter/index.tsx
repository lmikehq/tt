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
  left: 10%;
  bottom: 85%;
  // background: var(--semi-bg-color);
  background: red;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 16.6rem;
  border-radius: 1.5rem;
  padding: 3rem;
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
  }
`;

const NewsLetter = () => {
  return (
    <SubscribeWrapper>
      <Grid columns="repeat(2, 1fr)">
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
            <Button
              variant="contained"
              size="medium"
              style={{
                color: "#06062A",
              }}
            >
              Subscribe
            </Button>
          </Flex>
        </Subcribe>

        <Flex direction="row" gap="1rem">
          <Image src={Barcode} alt="visa" width="50" height="50" />
          <Flex direction="column" gap="0.5rem">
            <Image src={AppLogo} alt="mastercard" width="50" height="50" />
            <Image
              src={PlayStore}
              alt="american-express"
              width="50"
              height="50"
            />
          </Flex>
        </Flex>
      </Grid>
    </SubscribeWrapper>
  );
};

export default NewsLetter;
