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

import { useScreenResolution } from "hook/useScreenResolution";
import Input from "@atom/input";

const SubscribeWrapper = styled.div<{ isMobile?: boolean }>`
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  background-image: url(${newsLetterBg.src});
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 5rem auto;
  border-radius: 1.5rem;
  padding: 0rem 3.5rem;
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
      color: #1c1b1f;
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
        padding: isMobile ? "1.1rem" : "0rem 3.5rem",
        display: isMobile ? "block" : "flex",
        alignItems: "center",
        justifyContent: "center",
        height: isMobile ? "100%" : "29.5rem",
      }}
    >
      <Flex
        justify="space-between"
        gap={isMobile ? "1rem" : "7.1875rem"}
        direction={isMobile ? "column" : "row"}
      >
        <Subcribe className="newsLetter">
          <Text
            type="h3"
            text="Subscribe to our newsletter"
            weight={700}
            size={isMobile ? "1.28rem" : "2.5rem"}
            color="#06062A"
            opacity="80%"
          />
          <Text
            type="p"
            text="Discover a world of inspiration! Unlock exclusive travel discounts, gain invaluable visa tips, and immerse yourself in captivating behind-the-scenes stories"
            size="1rem"
            color="#06062A"
            margin={isMobile ? "0" : "-1.1rem 0 .7rem 0"}
            opacity="70%"
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
          // direction={isMobile ? "column" : "row"}
          // styles={{ display: isMobile ? "none" : "block" }}
        >
          <Image
            src={Barcode}
            alt="visa"
            width={isMobile ? "80" : "160"}
            height={isMobile ? "80" : "160"}
          />
          <Flex
            direction="column"
            gap="0.5rem"
            align={isMobile ? "flex-start" : "center"}
            // padding={isMobile ? '0' : "1.5rem 0 1.5rem 1.85rem"}
          >
            <Image width={isMobile ? 120 : 215} src={AppLogo} alt="app-store" />
            <Image
              width={isMobile ? 120 : 215}
              src={PlayStore}
              alt="play-store"
            />
          </Flex>
        </Flex>
      </Flex>
    </SubscribeWrapper>
  );
};

export default NewsLetter;
