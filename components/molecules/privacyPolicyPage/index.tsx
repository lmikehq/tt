"use client";

import Breadcrumb from "@atom/breadcrumb";
import { Grid } from "@atom/grid";

import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";
import PrivacyPolicyDetails from "./prvacyPolicyDetails";
import { PRIVACY_POLICY } from "data/privacyPolicy";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
import Text from "@atom/text";

const PrivacyPolicySection = styled.section`
  margin-top: 2.5rem;
`;

const PrivacyPolicyCard = styled.div`
  height: fit-content;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.5rem 2rem;

 
`;

const PravacyPoliicyPage = () => {
  const customNavigationLinks = [
    {
      number: "01",
      text: "Security",
      href: "#security",
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
        gap={isMobile ? "1rem" : "2rem"}
        columns={isMobile ? "100%" : "23% 75%"}
        margin="2rem auto"
      >
        <UsefulLinks navigationLinks={customNavigationLinks} />
        <PrivacyPolicyCard>
          <Text
            type="h3"
            text="Last Updated: July 27th, 2023"
            size={isMobile ? ".8rem" : "1rem"}
            margin="0 0 2rem"
            color="#475569"
          />
          <PrivacyPolicyDetails details={PRIVACY_POLICY} />
        </PrivacyPolicyCard>
      </Grid>
    </PrivacyPolicySection>
  );
};

export default PravacyPoliicyPage;
