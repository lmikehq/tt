import React, { ChangeEvent, FocusEvent } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Flex from "@atom/flex";
import { useScreenResolution } from "hook/useScreenResolution";

interface Option {
  value: any;
  label: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  name: string;
  onChange: (selectedValue: ChangeEvent<any>) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  justifyContent: string;
  direction?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end";
  value?: any;
}

export function CustomRadioGroup({
  options,
  onChange,
  onBlur,
  name,
  justifyContent,
  align = "center",
  direction = "row",
  value,
}: CustomRadioGroupProps) {
  const { isMobile } = useScreenResolution();
  return (
    <FormControl>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          justifyContent: justifyContent,
        }}
      >
        <Flex align={align} gap="1rem" direction={direction}>
          {options.map((option) => (
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                ".MuiFormControlLabel-label": {
                  fontFamily: "Poppins",
                  fontWeight: "400 !important",
                  fontSize: isMobile ? "1rem" : "1rem",
                },
              }}
            />
          ))}
        </Flex>
      </RadioGroup>
    </FormControl>
  );
}
