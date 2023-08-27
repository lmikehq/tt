"use client";

import Breadcrumb from "@atom/breadcrumb";
import { Grid } from "@atom/grid";
import UsefulLinks from "@molecule/contactPage/components/usefulLink";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";

import Text from "@atom/text";
import { customNavigationLinks } from "data/customNavigationLinks";
import { PRIVACY_POLICY } from "data/privacyPolicy";
import PrivacyPolicyDetails from "./prvacyPolicyDetails";

const PrivacyPolicySection = styled.section`
  margin-top: 2.5rem;
`;

const PrivacyPolicy = styled.div``;

const PrivacyPolicyCard = styled.div`
  height: fit-content;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.5rem 2rem;
`;

const PravacyPoliicyPage = () => {
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
