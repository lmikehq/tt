import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

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
  onButtonClick: () => void;
}

const TitleSec: React.FC<SectionTitleProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <SectionTitleContainer>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      {/* <Button ></Button> */}
      <Button onClick={onButtonClick} variant="outlined">
        {buttonText}
      </Button>
    </SectionTitleContainer>
  );
};

export default TitleSec;
