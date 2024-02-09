"use client"
import { isoLangs } from "@lib/extensions/data/isoLangs"
import { ttColors } from "@lib/theme/colors"
import { Autocomplete, Box, TextField as MUITextField } from "@mui/material"
import {
  CSSProperties,
  KeyboardEventHandler,
  ReactNode,
  useState,
} from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import styled from "styled-components"

const StyledInput = styled.input`
  background-color: transparent;
  border: 1px solid #bdbdbd;
  outline: none;
  &:hover {
    border: 1px solid ${ttColors.primary};
  }

  &.error {
    border: 0;
    outline: 1px solid red;
  }
  &::placeholder {
    color: #929292 !important;
    font-weight: 400 !important;
  }
`

const StyledMuiTextField = styled(MUITextField)`
  background-color: transparent;
  width: 100%;

  .MuiOutlinedInput-input {
    font-size: 1rem;
    color: #1c1b1f;
  }
  .MuiFormLabel-root {
    color: #1c1b1f;
    font-size: 1rem;
  }

  &:focus-visible {
    outline: none;
    border: transparent;
  }

  &:hover {
    border: transparent;
  }
`

export interface InputProps {
  onChange?: (e: any) => void
  onClick?: (e: any) => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
  onPaste?: () => void
  placeholder?: string
  onBlur?: (e: any) => void
  onFocus?: (e: any) => void
  margin?: CSSProperties["margin"]
  padding?: CSSProperties["padding"]
  touchedError?: boolean
  type?:
  | "text"
  | "number"
  | "file"
  | "textArea"
  | "password"
  | "email"
  | "tel"
  | "address"
  | "checkbox"
  value?: string
  defaultValue?: string
  name?: string
  id?: string
  step?: string
  readOnly?: boolean
  legend?: string
  border?: string
  width?: string
  height?: string
  size?: string
  color?: string
  weight?: string
  br?: string
  addon?: ReactNode
  min?: number
  max?: number
  flexGrow?: number
  parentWidth?: string
  styles?: CSSProperties
  error?: boolean
  ref?: any
  autoFocus?: boolean
}

const Input = ({
  onClick,
  onChange,
  onKeyDown,
  onFocus,
  onPaste,
  placeholder,
  value,
  onBlur,
  margin,
  type = "text",
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
  min,
  max,
  flexGrow,
  parentWidth,
  styles,
  step,
  error,
  defaultValue,
  ref,
  autoFocus
}: InputProps) => {
  const [miniType, setMiniType] = useState(type)
  if (type === "textArea") {
    return (
      <textarea
        aria-label="Your message"
        rows={5}
        placeholder={placeholder}
        style={{
          margin,
          padding: padding || ".5rem 2rem 0 1rem",
          border,
          width: width || "100%",
          fontSize: size || "1rem",
          color: color || "#1C1B1F",
          fontWeight: weight || "100",
          fontFamily: "var(--font-family)",
          borderRadius: br || "4px",
          ...styles,
        }}
        onChange={onChange}
      ></textarea>
    )
  }

  return (
    <div style={{ position: "relative", flexGrow, width: parentWidth }}>
      <StyledInput
        ref={ref}
        autoFocus={autoFocus}
        onClick={onClick}
        onFocus={onFocus}
        className={`custom-form-input ${error ? "error" : ""}`}
        type={miniType}
        onBlur={onBlur}
        placeholder={placeholder}
        onPaste={onPaste}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id={id}
        readOnly={readOnly}
        name={name}
        disabled={readOnly}
        min={min}
        max={max}
        step={step}
        style={{
          margin,
          padding: padding || "0 1rem 0 1rem",
          border,
          width: width || "100%",
          height: height || "45px",
          fontSize: size || "1rem",
          color: color || "#1C1B1F",
          fontWeight: weight || "400",
          fontFamily: "var(--font-family)",
          borderRadius: br || "4px",
          ...styles,
        }}
      />
      {type === "password" && value && (
        <Box sx={{ position: "absolute", right: "15px", top: "13px" }}>
          {miniType === "password" ? (
            <AiOutlineEye
              size={20}
              cursor="pointer"
              onClick={() => setMiniType("text")}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={20}
              cursor="pointer"
              onClick={() => setMiniType("password")}
            />
          )}
        </Box>
      )}
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
  )
}

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
  type,
}: InputProps) => {
  return (
    <>
      <StyledMuiTextField
        required
        type={type || "text"}
        // onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="new-password"
        autoCorrect="off"
        // onPaste={onPaste}
        // value={value}
        onChange={onChange}
        label={legend}
        id={id}
        // name={name}
        disabled={readOnly}
        style={{
          margin,
          border: border,
          borderRadius: "4px",
        }}
        sx={{
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      />
    </>
  )
}

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
  const [inputValue, setInputValue] = useState("")
  return (
    <Autocomplete
      id="combo-box-demo"
      options={isoLangs.map((option) => option.label)}
      sx={{ width: 300 }}
      renderInput={(params) => <MUITextField {...params} label="Movie" />}
    />
  )
}

export default Input
