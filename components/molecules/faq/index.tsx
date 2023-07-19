"use client";
import React from 'react'
import CustomizedAccordions from './components/customizedAccordion'
import styled from 'styled-components';
import Breadcrumb from '@atom/breadcrumb';
import { Grid } from '@atom/grid';
import { useScreenResolution } from 'hook/useScreenResolution';
import UsefulLinks from '@molecule/contactPage/components/usefulLink';

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
      <Grid
        gap={isMobile ? "1rem" : "3rem"}
        columns={isMobile ? "100%" : "25% 75%"}
        margin="2rem auto"
      >
        <UsefulLinks navigationLinks={customNavigationLinks} />
        <CustomizedAccordions />
      </Grid>
    </FaqsSection>
  );
}

export default FaqSection;