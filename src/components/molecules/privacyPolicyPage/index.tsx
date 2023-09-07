"use client";

import { Grid } from "@components/templates/grid";
import UsefulLinks from "src/components/molecules/contactPage/components/usefulLink";
import { useScreenResolution } from "hook/useScreenResolution";
import styled from "styled-components";
import SectionLayout from "src/components/layouts/sectionLayout";
import Section from "src/components/molecules/section";
import { customNavigationLinks } from "data/customNavigationLinks";
import { PRIVACY_POLICY } from "data/privacyPolicy";
import PrivacyPolicyDetails from "./prvacyPolicyDetails";
import Flex from "src/components/atoms/flex";

const PrivacyPolicySection = styled.section`
  margin-top: 2.5rem;
`;

const PrivacyPolicy = styled.div`
  margin-bottom: 2rem;
`;

const PrivacyPoliicyPage = () => {
  const { isMobile } = useScreenResolution();
  return (
    <SectionLayout {...(isMobile && { padding: " 0 1rem" })}>
      {/* <PravacyPoliicyPage /> */}
      <PrivacyPolicySection>
        <Flex
          gap={isMobile ? "1rem" : "3rem"}
          direction={isMobile ? "column" : "row"}
          margin="2rem auto"
        >
          <Section width={isMobile ? "100%" : "25%"}>
            <UsefulLinks navigationLinks={customNavigationLinks} />
          </Section>
          <Section width={isMobile ? "100%" : "75%"}>
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
        </Flex>
      </PrivacyPolicySection>
    </SectionLayout>
  );
};

export default PrivacyPoliicyPage;
