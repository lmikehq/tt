"use client";

import { Autocomplete, TextField as MUITextField } from "@mui/material";
import { isoLangs } from "data/isoLangs";
import { CSSProperties, useState } from "react";
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
  onChange?: () => void;
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

export const TextField = ({
  onChange,
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
