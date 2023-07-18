"use client";

import React from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import Link from "@atom/link";

const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  line-heigth: 2.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  margin-bottom: 1rem;

  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #888888;
  font-weight: 400;
  line-height: 1.2rem;

  @media screen and (max-width: 900px) {
    font-size: 0.755rem;
    margin-top: -5px;
  }
`;

interface SectionTitleProps {
  title: string;
  href?: string;
  description: string;
  buttonText?: string;
  showButton?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  href,
  description,
  buttonText,
  showButton = true,
}) => {
  const { isMobile } = useScreenResolution();
  showButton = isMobile ? false : showButton;
  const router = useRouter();

  const sectionTitleBtn = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <SectionTitleContainer
      style={{
        display: isMobile ? "grid" : "flex",
        gap: isMobile ? "1rem" : "0.5rem",
        alignItems: isMobile ? "left" : "center",
      }}
    >
      <div style={{width: isMobile ? "100%" : "80%"}}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>

      {showButton && (
        <Link
          color={ttColors.dark}
          style={{
            marginTop: isMobile ? "0px" : "0px",
            fontSize: "1rem",
            fontWeight: "400",
          }}
          href={href || ""}
          onClick={sectionTitleBtn}
          decoration="underline"
        >
          {buttonText}
        </Link>
      )}
    </SectionTitleContainer>
  );
};

export default SectionTitle;
