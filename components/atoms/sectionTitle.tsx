"use client";

import React from "react";
import styled from "styled-components";
import Button from "./button";
import { ttColors } from "theme/colors";
import { useScreenResolution } from "hook/useScreenResolution";
import Link from "./link";
import Text from "./text";

const SectionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  line-heigth: 2.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #888888;
  font-weight: 400;
  line-height: 1.2rem;
`;

interface SectionTitleProps {
  title: string;
  href?: string;
  description: string;
  buttonText?: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  href,
  description,
  buttonText,
  onButtonClick,
  showButton = true,
}) => {
  const { isMobile, isTablet } = useScreenResolution();
  const router = useRouter();

  const handleButtonClick = () => {
    if (href) {
      router.push(href);
    } else if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <SectionTitleContainer
      style={{
        display: isMobile ? "block" : "flex",
        alignItems: isMobile ? "left" : "center",
      }}
    >
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>

      {showButton && (
        <Link
          color={ttColors.dark}
          style={{ marginTop: isMobile ? "15px" : "0px"}}
          href=""
          onClick={onButtonClick}
        >
          {buttonText}
        </Link>
      )}
    </SectionTitleContainer>
  );
};

export default SectionTitle;
