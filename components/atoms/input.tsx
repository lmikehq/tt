"use client";

import { Autocomplete, Box, TextField as MUITextField } from "@mui/material";
import { isoLangs } from "data/isoLangs";
import {
  CSSProperties,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from "react";
import styled from "styled-components";
import { ttColors } from "theme/colors";

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

const StyledMuiTextField = styled(MUITextField)`
  background-color: transparent;
  width: 100%;
  // border: 1px solid #bdbdbd;
  &.error {
    border: 0;
    outline: 1px solid red;
  }

  .MuiOutlinedInput-input {
    font-size: 1rem;
    color: #1c1b1f;
  }
  .MuiFormLabel-root {
    color: #1c1b1f;
    font-size: 1rem;
  }
`;

export interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  onPaste?: () => void;
  placeholder?: string;
  onBlur?: () => void;
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  type?: "text" | "number" | "file";
  value?: string;
  name?: string;
  id?: string;
  readOnly?: boolean;
  legend?: string;
  border?: string;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  weight?: string;
  br?: string;
  addon?: ReactNode;
  min?: number;
  max?: number;
}

const Input = ({
  onChange,
  onKeyDown,
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
  border,
  width,
  height,
  size,
  color,
  weight,
  br,
  addon,
  min,max
}: InputProps) => {
  return (
    <div style={{ position: "relative" }}>
      <StyledInput
        type={type || "text"}
        onBlur={onBlur}
        placeholder={placeholder}
        onPaste={onPaste}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id={id}
        readOnly={readOnly}
        name={name}
        disabled={readOnly}
        min={min}
        max={max}
        style={{
          margin,
          padding: padding || "0 2rem 0 1rem",
          border,
          width: width || "100%",
          height: height || "50px",
          fontSize: size || "1rem",
          color: color || "#1C1B1F",
          fontWeight: weight || "100",
          fontFamily: "var(--font-family)",
          borderRadius: br || "4px",
        }}
      />
      {addon && (
        <Box
          sx={{
            position: "absolute",
            right: "5%",
            top: "35%",
          }}
        >
          {addon}
        </Box>
      )}
    </div>
  );
};

export const TextField = ({
  onChange,
  onKeyDown,
  onPaste,
  placeholder,
  value,
  onBlur,
  margin,
  id,
  name,
  readOnly,
  padding,
  legend,
  border,
  width,
}: InputProps) => {
  return (
    <StyledMuiTextField
      required
      // onBlur={onBlur}
      defaultValue={placeholder}
      // onPaste={onPaste}
      // value={value}
      // onChange={onChange}
      label={legend}
      id={id}
      // name={name}
      // disabled={readOnly}
      // style={{
      //   margin,
      //   padding,
      // }}
      // label="not requreid"
    />
  );
};

export const AutoComplete = ({
  onChange,
  onKeyDown,
  onPaste,
  placeholder,
  value,
  onBlur,
  margin,
  id,
  name,
  readOnly,
  padding,
  legend,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Autocomplete
      id="combo-box-demo"
      options={isoLangs.map((option) => option.label)}
      sx={{ width: 300 }}
      renderInput={(params) => <MUITextField {...params} label="Movie" />}
    />
  );
};

export default Input;
