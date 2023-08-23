import React, { ChangeEvent, FocusEvent } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Flex from "@atom/flex";

interface Option {
  value: boolean;
  label: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  name: string;
  onChange: (selectedValue: ChangeEvent<any>) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  justifyContent: string;
}

export function CustomRadioGroup({
  options,
  onChange,
  onBlur,
  name,
  justifyContent,
}: CustomRadioGroupProps) {
  return (
    <FormControl sx={{}}>
      <RadioGroup
        sx={{
          padding: "0px",
          fontSize: "16px",
        }}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          justifyContent: justifyContent,
        }}
      >
        <Flex align="center" gap=".5rem">
          {options.map((option) => (
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </Flex>
      </RadioGroup>
    </FormControl>
  );
}
