import React from "react";
import styled from "styled-components";
import Button from "./button";
import { ttColors } from "theme/colors";

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
  description: string;
  buttonText: string;
  showButton?: boolean;
  onButtonClick?: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
  showButton,
}) => {
  return (
    <SectionTitleContainer>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>

      <Button
        onClick={onButtonClick}
        background="transparent"
        color={ttColors.dark}
        border={`1px solid ${ttColors.primary}`}
        width='180px'
        fontSize="1rem"
      >
        {buttonText}
      </Button>
    </SectionTitleContainer>
  );
};

export default SectionTitle;
