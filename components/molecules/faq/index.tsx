"use client";
import React from "react";
import CustomizedAccordions from "./components/customizedAccordion";
import styled from "styled-components";
import Breadcrumb from "@atom/breadcrumb";
import { Grid } from "@atom/grid";
import { useScreenResolution } from "hook/useScreenResolution";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
import Flex from "@atom/flex";
import Text from "@atom/text";

const FaqsSection = styled.section`
  margin-top: 1rem;
`;

function FaqSection() {
  const { isMobile } = useScreenResolution();
  const customNavigationLinks = [
    {
      number: "01",
      text: "Chat with our AI",
      href: "",
    },
    {
      number: "02",
      text: "Chat with an Agent",
      href: "",
    },
    {
      number: "03",
      text: "Chat with our travel guide",
      href: "",
    },
    {
      number: "04",
      text: "Testimony",
      href: "",
    },
    {
      number: "05",
      text: "Testimony",
      href: "",
    },
    {
      number: "06",
      text: "Testimony",
      href: "",
    },
    {
      number: "07",
      text: "Testimony",
      href: "",
    },
    {
      number: "08",
      text: "Testimony",
      href: "",
    },
    {
      number: "09",
      text: "Testimony",
      href: "",
    },
    {
      number: "10",
      text: "Testimony",
      href: "",
    },
  ];

  return (
    <FaqsSection>
      <Breadcrumb />
      <Flex direction="column" justify="center" align="center" margin={isMobile ? "0px" : "0px 0px 6.5rem 0px"}>
        <Text type="h1" text="Frequently Asked Questions" size={isMobile ? "1rem" : "2rem"} />
        <Text
          margin={isMobile ? "1rem 0px" : "2rem 0px"}
          size={isMobile ? "0.8rem" : "1rem"}
          styles={{
            width: `${isMobile ? "100%" : "50%"}`,
            textAlign: "center",
          }}
          type="p"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quis
          ullam debitis quod illum recusandae aliquid praesentium excepturi
          soluta rerum."
        />
      </Flex>
      <Grid
        gap={isMobile ? "2rem" : "5rem"}
        columns={isMobile ? "100%" : "25% 70%"}
        margin="2rem auto"
      >
        <UsefulLinks navigationLinks={customNavigationLinks} />
        <Flex direction="column">
          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text type="h2" text="How it works" size={isMobile ? "1.2rem" : "1.5rem"} />
            <CustomizedAccordions items={howWeWork} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text type="h2" text="How it we make things happeing" size={isMobile ? "1.2rem" : "1.5rem"} />
            <CustomizedAccordions items={makeItHappening} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text type="h2" text="Booking your visa" size={isMobile ? "1.2rem" : "1.5rem"} />
            <CustomizedAccordions items={bookingYourVisa} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text type="h2" text="Payment and Budget" size={isMobile ? "1.2rem" : "1.5rem"} />

            <CustomizedAccordions items={paymentAndBudget} />
          </Flex>

          <Flex direction="column" gap=".7rem" margin="0px auto 3rem">
            <Text type="h2" text="How it we make things happeing" size={isMobile ? "1.2rem" : "1.5rem"} />

            <CustomizedAccordions items={makeItHappening} />
          </Flex>
        </Flex>
      </Grid>
    </FaqsSection>
  );
}

export default FaqSection;

const howWeWork = [
  {
    header: "Collapsible Group Item #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    header: "Collapsible Group Item #4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    header: "Collapsible Group Item #5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const makeItHappening = [
  {
    header: "Collapsible Group Item #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

const bookingYourVisa = [
  {
    header: "Collapsible Group Item #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    header: "Collapsible Group Item #4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const paymentAndBudget = [
  {
    header: "Collapsible Group Item #1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
  {
    header: "Collapsible Group Item #3",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    header: "Collapsible Group Item #4",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    header: "Collapsible Group Item #5",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
