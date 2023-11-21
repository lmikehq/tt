import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import styled from "styled-components";

const SelectBox = styled.div`
  #demo-simple-select {
    outline-color: var(--primary-color) !important;
  }
  .MuiSelect-root {
    width: 100% !important;
    position: relative;
    outline-color: var(--primary-color) !important;
  }
  .MuiSelect-select {
    position: relative;
  }
`;

interface DropdownProps {
  label?: string;
  options: { value: string; displayValue: string }[];
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  width?: string | number;
  minWidth?: string | number;
  height?: string | number;
  minHeight?: string | number;
  padding?: string | number;
  color?: string;
  border?: string;
  borderColor?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  setSelectedValue,
  className,
  width,
  minWidth,
  height,
  minHeight,
  padding,
  color,
  border,
  borderColor,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(String(event.target.value));
  };

  return (
    <SelectBox>
      <InputLabel id="mui_simple_select">{label}</InputLabel>
      <Select
        labelId="mui_simple_select"
        id="mui_simple_select"
        value={selectedValue}
        label={label}
        onChange={handleChange}
        className={className}
        sx={{
          width: width,
          minWidth: minWidth,
          height: height,
          minHeight: minHeight,
          padding: padding,
          border: border,
          color: color,
          borderColor: borderColor,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.displayValue}
          </MenuItem>
        ))}
      </Select>
    </SelectBox>
  );
};

export default Dropdown;
