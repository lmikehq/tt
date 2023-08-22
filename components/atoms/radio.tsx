import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import Flex from "@atom/flex";

interface Option {
  value: string;
  label: string;
}

interface CustomRadioGroupProps {
  defaultValue: string;
  options: Option[];
  onChange: (selectedValue: string) => void;
  justifyContent: string;
}

export function CustomRadioGroup({
  defaultValue,
  options,
  onChange,
  justifyContent,
}: CustomRadioGroupProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <FormControl
      sx={{
        
    }}>
      <RadioGroup
        sx={{
          
          padding: "0px",
          fontSize: "16px",
        }}
        name="custom-radio-buttons-group"
        value={value}
        onChange={handleChange}
        style={{
          justifyContent: justifyContent,
        }}
      >
        <Flex align="center" gap=".5rem">
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
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
