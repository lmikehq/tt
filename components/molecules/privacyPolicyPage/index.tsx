"use client";

import Breadcrumb from "@atom/breadcrumb";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";

const PrivacyPolicySection = styled.section`
  margin-top: 2.5rem;
`;

const PrivacyPolicy = styled.div``;

const PravacyPoliicyPage = () => {
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
  const { isMobile } = useScreenResolution();
  return (
    <PrivacyPolicySection>
      <Breadcrumb />
      <Grid
        gap={isMobile ? "1rem" : "3rem"}
        columns={isMobile ? "100%" : "25% 75%"}
        margin="2rem auto"
      >
              <UsefulLinks navigationLinks={customNavigationLinks} />
              <PrivacyPolicy>
                  <h1>Privacy Policy Section</h1>
              </PrivacyPolicy>
      </Grid>
    </PrivacyPolicySection>
  );
};

export default PravacyPoliicyPage;
