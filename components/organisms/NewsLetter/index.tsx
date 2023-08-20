"use client";
import styled from "styled-components";
import Text from "../../atoms/text";
import Flex from "../../atoms/flex";
// import Link from "../../atoms/link";
import Image from "next/image";
import Button from "@atom/button";
import Barcode from "@image/walink.png";
import AppLogo from "@image/app-store.svg";
import PlayStore from "@image/google-play.svg";
import newsLetterBg from "@image/newsLetterbg.png";

import { Grid } from "../../atoms/grid";
import { useScreenResolution } from "hook/useScreenResolution";
import Input from "@atom/input";

const SubscribeWrapper = styled.div`
  // position: absolute;
  // left: 7.5%;
  // bottom: 90%;
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  // background: var(--semi-bg-color);
  // background: rgba(135, 206, 235, 0.6);
  background-image: url(${newsLetterBg.src});
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: -8rem 0;
  // z-index: -1;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: auto;
  height: 29.5rem;
  border-radius: 1.5rem;
  padding: 0rem 2.5rem;
  margin-bottom: 5rem;
  @media (max-width: 1300px) {
    background-position: -8rem 0;
  }
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
  const { isMobile } = useScreenResolution();
  return (
    <SubscribeWrapper
      className="newsLetter"
      style={{
        width: isMobile ? "90%" : "85%",
        left: isMobile ? "5%" : "7.5%",
        padding: isMobile ? "1.1rem" : "8rem 2.5rem",
        bottom: isMobile ? "91.5%" : "90%",
      }}
    >
      <Flex justify="space-between" direction={isMobile ? "column" : "row"}>
        <Subcribe className="newsLetter">
          <Text
            type="h3"
            text="Subscribe to our newsletter"
            size={isMobile ? "1.28rem" : "2.5rem"}
            color="#06062A"
          />
          <Text
            type="p"
            text="Discover a world of inspiration! Unlock exclusive travel discounts, gain invaluable visa tips, and immerse yourself in captivating behind-the-scenes stories"
            size="1rem"
            color="#06062A"
          />
          <Flex
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? ".5rem" : "1rem"}
          >
            <Input
              type="text"
              height="52px"
              width="100%"
              parentWidth="100%"
              styles={{ backgroundColor: "#FFFFFF" }}
              placeholder="Your email address"
            />
            <Button
              height="52px"
              padding="0 1.5rem"
              width="fit-content"
              borderRadius="4px"
              styles={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text
                color="#FFFFFF"
                text="Subscribe"
                type={"span"}
                weight={600}
                size={16}
              />
            </Button>
          </Flex>
        </Subcribe>

        <Flex
          gap="1rem"
          align="center"
          width="auto"
          styles={{ visibility: isMobile ? "hidden" : "visible" }}
        >
          <Image
            src={Barcode}
            alt="visa"
            width="110"
            height="110"
            style={{ marginLeft: "7rem", marginBottom: "1.2rem" }}
          />
          <Flex
            direction="column"
            gap="0.5rem"
            align="center"
            padding="0rem 0rem 1.5rem"
            width="10rem"
          >
            <Image src={AppLogo} alt="mastercard" />
            <Image src={PlayStore} alt="american-express" />
          </Flex>
        </Flex>
      </Flex>
    </SubscribeWrapper>
  );
};

export default NewsLetter;
