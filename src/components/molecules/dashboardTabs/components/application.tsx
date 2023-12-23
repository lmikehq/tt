"use client"

import CustomTab from "@atom/tabs"
import Section from "src/components/molecules/section"
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution"
import styled from "styled-components"
import Flight from "./flight"
import Visa from "./visa"

const SectionTabs = styled.div`
    .MuiButtonBase-root {
        width: 100% !important;
        max-width: 50%;
        padding: 0px 24px;
    }
    .MuiTabs-flexContainer {
        justify-content: space-between;
    }
`

const Application = () => {
  const { isMobile } = useScreenResolution()

  const tabItem = [
    {
      label: "Visa",
      value: 0,
      content: <Visa />,
    },

    {
      label: "Flight",
      value: 1,
      content: <Flight />,
      disabled: true,
    },
  ]
  return (
    <Section
      margin="2rem 0"
      styles={{
        background: "#fff",
        borderRadius: "20px",
        padding: isMobile ? "0" : "2.5rem 1.5rem",
      }}
    >
      {/* <Text
        type="h2"
        text="All applications"
        size={isMobile ? "16px" : "25px"}
        margin="0px 0px 1.5rem 0px"
      /> */}

      <SectionTabs>
        <CustomTab
          tabItems={tabItem}
          shadowShow
          defaultIcons
          addBackgroundColor
          addColor
          variant="fullWidth"
        />
      </SectionTabs>
    </Section>
  )
}

export default Application
