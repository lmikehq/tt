import { CSSProperties } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid #bdbdbd;

  &:focus {
    outline: none;
  }

  &.error {
    border: 0;
    outline: 1px solid red;
  }
`;

interface InputProps {
  onChange?: () => void;
  onPaste?: () => void;
  placeholder?: string;
  onBlur?: () => void;
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  type: "text" | "number" | "file";
  value: string;
  name: string;
  id?: string;
  readOnly?: boolean;
}

const Input = ({
  onChange,
  onPaste,
  placeholder,
  value,
  onBlur,
  margin,
  type,
  id,
  name,
  readOnly,
  padding,
}: InputProps) => {
  return (
    <StyledInput
      type={type || "text"}
      onBlur={onBlur}
      placeholder={placeholder}
      onPaste={onPaste}
      value={value}
      onChange={onChange}
      id={id}
      readOnly={readOnly}
      name={name}
      disabled={readOnly}
      style={{
        margin,
        padding,
      }}
    />
  );
};

export default Input;
