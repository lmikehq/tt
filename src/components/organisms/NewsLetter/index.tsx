"use client";
import styled from "styled-components";
import Text from "@atom/text";
import Flex from "@components/templates/flex";
// import Link from "@atom/link";
import Image from "@atom/image";
import Button from "@atom/button";

import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Input from "@atom/input";
import Section from "@molecule/section";
//import { FieldInput } from "../fieldInput";
//import { Formik } from "formik";
import { useState } from "react";
import { ttColors } from "@/lib/theme/colors";
import Spinner from "@/components/molecules/icons/spinner";
import { validateEmail } from "@/lib/utilFns";
import apiService from "@/lib/extensions/hook/apiService";
import { toast } from "react-hot-toast";

const SubscribeWrapper = styled.div<{ isMobile?: boolean }>`
  box-shadow: 0px 4px 16px rgba(17, 34, 17, 0.05);
  background-image: url(${"/assets/images/newsLetterbg.png"});
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 5rem auto;
  border-radius: 1.5rem;
  padding: 0rem 3.5rem;
  margin-bottom: 5rem;
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
  const [email, setEmail] = useState("");

  const [submissionState, setSubmissionState] = useState({
    loading: false,
    error: "",
  });

  const handleSubmit = async () => {
    if (submissionState.loading) return;
    if (!email || !validateEmail(email))
      return setSubmissionState({
        loading: false,
        error: "Please enter a valid email address",
      });

    setSubmissionState({ loading: true, error: "" });
    const res = await apiService(
      "/mail/list/newsletter@mails.thrillers.travel/add-member",
      "POST",
      {
        address: email,
        name: email.split("@")[0],
      }
    );
    if (res.subscribed) {
      setSubmissionState({ loading: false, error: "" });
      setEmail("");
      return toast.success(
        "You have successfully subscribed to our newsletter"
      );
    } else {
      setSubmissionState({ loading: false, error: res.message });
      return toast.error(res.message);
    }
  };

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
            text="Want travel deals?"
            weight={700}
            size={isMobile ? "1.28rem" : "2.5rem"}
            color="#06062A"
            opacity="80%"
          />
          <Text
            type="p"
            text="Be the first know when our next promo starts, or when we publish new article. Stay updated with all latest news and events."
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
              styles={{
                backgroundColor: "#FFFFFF",
                border: submissionState.error.includes("email")
                  ? "1px solid red"
                  : "none",
              }}
              placeholder="Your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmissionState({ ...submissionState, error: "" });
              }}
            />

            <Button
              height="52px"
              padding="0 1.5rem"
              width={isMobile ? "100%" : "fit-content"}
              background="#06062A"
              borderRadius="4px"
              styles={{ justifyContent: "center", alignItems: "center" }}
              onClick={handleSubmit}
            >
              {submissionState.loading ? (
                <Spinner size="40px" fill={ttColors.primary} />
              ) : (
                <Text
                  color="#FFFFFF"
                  text="Subscribe"
                  type={"span"}
                  weight={600}
                  size={16}
                />
              )}
            </Button>
          </Flex>
          {submissionState.error && (
            <Text
              type="p"
              text={submissionState.error}
              color="red"
              margin="0.5rem 0 0 0"
              size="1rem"
              textAlign={isMobile ? "center" : "left"}
            />
          )}
        </Subcribe>

        <Flex
          gap="1rem"
          align="center"
          width="auto"
          // direction={isMobile ? "column" : "row"}
          styles={{ display: isMobile ? "none" : "flex" }}
        >
          <Image
            src={"/assets/images/walink.png"}
            alt="visa"
            width={isMobile ? 80 : 160}
            height={isMobile ? 80 : 160}
          />
          <Flex
            direction="column"
            gap="0.5rem"
            align={isMobile ? "flex-start" : "center"}
          // padding={isMobile ? '0' : "1.5rem 0 1.5rem 1.85rem"}
          >
            <Section
              height={isMobile ? "36.28px" : "65px"}
              width={isMobile ? "120px" : "215px"}
              styles={{ position: "relative" }}
            >
              <Image src={"/assets/images/app-store.svg"} alt="app-store" />
            </Section>
            <Section
              width={isMobile ? "120px" : "215px"}
              height={isMobile ? "36.28px" : "65px"}
              styles={{ position: "relative" }}
            >
              <Image src={"/assets/images/google-play.svg"} alt="play-store" />
            </Section>
          </Flex>
        </Flex>
      </Flex>
    </SubscribeWrapper>
  );
};

export default NewsLetter;
