"use client";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { ttColors } from "theme/colors";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { useState } from "react";
import styled from "styled-components";

const HelpfulWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;

  & h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
`;

const HelpfulOrNot = () => {
  const [thumbsUpSelected, setThumbsUpSelected] = useState(false);
  const [thumbsDownSelected, setThumbsDownSelected] = useState(false);

  const handleThumbsUpClick = () => {
    setThumbsUpSelected(true);
    setThumbsDownSelected(false);
  };

  const handleThumbsDownClick = () => {
    setThumbsUpSelected(false);
    setThumbsDownSelected(true);
  };

  return (
    <div>
      <HelpfulWrapper>
        <Text type="h2" text="Was the page helpful?" />
        <Flex margin="10px auto" justify="center" gap="10px">
          <BsHandThumbsUp
            size="1.5rem"
            cursor={thumbsUpSelected ? "default" : "pointer"}
            color={thumbsUpSelected ? `${ttColors.primary}` : "inherit"}
            onClick={handleThumbsUpClick}
          />
          <BsHandThumbsDown
            size="1.5rem"
            cursor={thumbsDownSelected ? "default" : "pointer"}
            color={thumbsDownSelected ? `${ttColors.slamon}` : "inherit"}
            onClick={handleThumbsDownClick}
          />
        </Flex>
      </HelpfulWrapper>
    </div>
  );
};

export default HelpfulOrNot;
