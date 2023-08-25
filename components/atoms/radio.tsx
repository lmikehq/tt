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
  value: any;
  label: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  name: string;
  value?: string;
  onChange: (selectedValue: ChangeEvent<any>) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  justifyContent: string;
}

export function CustomRadioGroup({
  options,
  onChange,
  onBlur,
  name,
  value,
  justifyContent,
}: CustomRadioGroupProps) {
  return (
    <FormControl>
      <RadioGroup
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          justifyContent: justifyContent,
        }}
        value={value}
      >
        <Flex align="center" gap="1rem">
          {options.map((option) => (
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                '.MuiFormControlLabel-label': {
                  fontFamily: 'Poppins',
                  fontWeight: '400 !important'
                },
              }}
            />
          ))}
        </Flex>
      </RadioGroup>
    </FormControl>
  );
}