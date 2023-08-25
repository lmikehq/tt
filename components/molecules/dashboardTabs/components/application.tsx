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
  // padding: 2rem 0 0;

  .MuiButtonBase-root {
    width: 100% !important;
    max-width: 50% !important;
    padding: 0px 24px;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
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
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "20px",
        padding: "2.5rem 1.5rem",
      }}
    >
      <Text
        type="h2"
        text="All applications"
        size={isMobile ? "16px" : "25px"}
        margin="0px 0px 1.5rem 0px"
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
