import { useState } from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import Text from "./text";

const MaxCharCount = 1000;

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
  pointer-events: none;
  color: ${ttColors.gray};
`;
interface TextAreaProps {
  onChange?: (e: any) => void;
}
const TextArea = ({ onChange }: TextAreaProps) => {
  const [text, setText] = useState("");
  const remainingChars = MaxCharCount - text.length;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= MaxCharCount) {
      setText(newText);
    }
    console.log(remainingChars);
  };

  return (
    <CustomTextareaWrapper>
      <CustomTextarea
        aria-label="minimum height"
        rows={8}
        placeholder=""
        value={text}
        onChange={(e) => {
          if (onChange) {
            console.log(e);
            onChange(e);
          }
          handleTextChange(e);
        }}
      />
      <Placeholder>
        <Text
          type="p"
          text={
            remainingChars < 1000
              ? `${remainingChars} characters left`
              : "Max 1000 characters"
          }
          color={remainingChars >= 0 ? ttColors.gray : ttColors.red}
        />
      </Placeholder>
    </CustomTextareaWrapper>
  );
};

export default TextArea;
