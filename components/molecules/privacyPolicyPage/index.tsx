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
import Section from "@molecule/section";
import SectionLayout from "@components/layouts/sectionLayout";

const PrivacyPolicySection = styled.section`
  margin-top: 2.5rem;
`;

const PrivacyPolicy = styled.div`
  margin-bottom: 2rem;
`;

const PrivacyPolicyCard = styled.div`
  height: fit-content;
  width: 100%;
  background: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.5rem 2rem;
`;

const PrivacyPoliicyPage = () => {
  const { isMobile } = useScreenResolution();
  return (
    <SectionLayout {...(isMobile && { padding: "0" })}>
      {/* <PravacyPoliicyPage /> */}
      <PrivacyPolicySection>
        <Grid
          gap={isMobile ? "1rem" : "3rem"}
          columns={isMobile ? "100%" : "25% 75%"}
          margin="2rem auto"
        >
          <UsefulLinks navigationLinks={customNavigationLinks} />
          <Section>
            <PrivacyPolicy>
              <h1>Privacy Policy Section</h1>
            </PrivacyPolicy>
            {/* <PrivacyPolicyCard>
              <Text
                type="h3"
                text={`Last Updated: ${new Date().toLocaleDateString()}`}
                size={isMobile ? ".8rem" : "1rem"}
                margin="0 0 2rem"
                color="#475569"
              /> */}
              <PrivacyPolicyDetails details={PRIVACY_POLICY} />
            {/* </PrivacyPolicyCard> */}
          </Section>
        </Grid>
      </PrivacyPolicySection>
    </SectionLayout>
  );
};

export default PrivacyPoliicyPage;
