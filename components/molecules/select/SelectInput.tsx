import { Select } from "@mui/material";
import React, { CSSProperties, ElementType } from "react";

interface SelectInputProps {
  style?: CSSProperties;
  iconComponent?: ElementType<any>;
  defaultValue: string | number;
  children: React.ReactNode;
}

const SelectInput = ({
  style,
  iconComponent,
  defaultValue,
  children,
}: SelectInputProps) => {
  return (
    <Select
      style={{ ...style }}
      IconComponent={iconComponent}
      defaultValue={defaultValue}
    >
      {children}
    </Select>
  );
};

export default SelectInput;
