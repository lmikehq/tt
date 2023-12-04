import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import styled from "styled-components";

const CheckBoxSelect = styled.div`
  .MuiSelect-root {
    width: 100% !important;
    position: relative;
    outline-color: var(--primary-color) !important;
  }
  .MuiSelect-select {
    position: relative;
  }
`;

interface CheckboxOption {
  value: string;
  displayValue: string;
}

interface CheckboxDropdownProps {
  label?: string;
  options: CheckboxOption[];
  selectedValues: string[];
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  width?: string | number;
  height?: string | number;
  padding?: string | number;
  color?: string;
  border?: string;
  borderColor?: string;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({
  label,
  options,
  selectedValues,
  setSelectedValues,
  className,
  width,
  height,
  padding,
  color,
  border,
  borderColor,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <CheckBoxSelect>
      <FormControl className="formControl_width">
        <InputLabel id="mui_simple_select">{label}</InputLabel>
        <Select
          labelId="mui_simple_select"
          id="mui_simple_select"
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          className={className}
          sx={{
            width: width,
            height: height,
            padding: padding,
            border: border,
            color: color,
            borderColor: borderColor,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={selectedValues.indexOf(option.value) > -1} />
              <ListItemText primary={option.displayValue} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CheckBoxSelect>
  );
};

export default CheckboxDropdown;
