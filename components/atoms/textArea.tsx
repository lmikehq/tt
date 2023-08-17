import React from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import Text from "./text";




const CustomTextareaWrapper = styled.div`
  position: relative;
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  height: 144px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e7e7e7;

  &:hover {
    // border-color: ;
  }

  &:focus-visible {
    outline: 0;
  }
`;

const Placeholder = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #929292;
  pointer-events: none;
`;

const TextArea: React.FC = () => {
  return (
    <CustomTextareaWrapper>
      <CustomTextarea aria-label="minimum height" rows={8} placeholder="" />
      <Placeholder>
        <Text type="p" text="Max 250 characters" />
      </Placeholder>
    </CustomTextareaWrapper>
  );
};

export default TextArea;
