import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";

const SelectBox = styled.div`
  .react-select-container {
    width: 100%;
    position: relative;
    outline-color: var(--primary-color) !important;
  }
`;

interface DropdownProps {
  label?: string;
  options: { value: string; label: string }[];
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
  const handleChange = (selectedOption: any) => {
    setSelectedValue(selectedOption.value);
  };

  return (
    <SelectBox>
      <label id="react_select_label">{label}</label>
      <Select
        inputId="react_select_input"
        value={options.find((option) => option.value === selectedValue)}
        options={options}
        onChange={handleChange}
        className={className}
        styles={{
          container: (provided) => ({
            ...provided,
            width: width,
            minWidth: minWidth,
            height: height,
            minHeight: minHeight,
            padding: padding,
            border: border,
            color: color,
            borderColor: borderColor,
          }),
        }}
        aria-labelledby="react_select_label"
      />
    </SelectBox>
  );
};

export default Dropdown;
