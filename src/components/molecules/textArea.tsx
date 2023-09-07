import { FocusEvent, useState } from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";
import Text from "@atom/text";

const MaxCharCount = 1000;

const CustomTextareaWrapper = styled.div`
  position: relative;
`;

const CustomTextarea = styled.textarea`
  width: 100%;
  resize: none;
  height: 144px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e7e7e7;

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
  onBlur: (e: FocusEvent<any, Element>) => void;
  name: string;
  value?: string;
}
const TextArea = ({ onChange, name, onBlur, value }: TextAreaProps) => {
  const [text, setText] = useState(value ?? "");
  const remainingChars = MaxCharCount - text?.length;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= MaxCharCount) {
      setText(newText);
    }
  };

  return (
    <CustomTextareaWrapper>
      <CustomTextarea
        aria-label="minimum height"
        rows={8}
        placeholder=""
        value={text}
        name={name}
        onBlur={onBlur}
        onChange={(e: any) => {
          if (onChange) {
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
