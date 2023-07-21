"use client";

import Text from "@atom/text";
import styled from "styled-components";
import CustomTab from "@atom/tabs";
import Section from "@molecule/section";
import Visa from "./visa";
import { useScreenResolution } from "hook/useScreenResolution";
import Center from "@atom/center";
import RTQueryClient from "@components/layouts/rtqWrapper";

const SectionTabs = styled.div`
  padding: 2rem 0 0;
  .MuiButtonBase-root {
    width: 100% !important;
    max-width: 50% !important;
  }
  .MuiTabs-flexContainer {
    justify-content: space-between;
  }
`;

const Application = () => {
  const { isMobile } = useScreenResolution();

  const tabItem = [
    {
      label: "Visa",
      value: 0,
      content: <Visa />,
    },

    {
      label: "Flight",
      value: 1,
      content: <Center margin="2rem 0">Coming soon</Center>,
    },
  ];
  return (
    <Section margin="2rem 0">
      <Text
        type="h2"
        text="All applications"
        size={isMobile ? "16px" : "25px"}
      />

      <SectionTabs>
        <RTQueryClient>
          <CustomTab tabItems={tabItem} defaultIcons />
        </RTQueryClient>
      </SectionTabs>
    </Section>
  );
};

export default Application;
