import { MenuItem, Select } from "@mui/material";
import { CSSProperties } from "react";

export interface InputProps {
  onChange?: (e: any) => void;
  placeholder?: string;
  onBlur?: () => void;
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  children: React.ReactNode;
  value?: string;
  name?: string;
  id?: string;
  labelId?: string;
  label?: string;
  readOnly?: boolean;
  legend?: string;
  border?: string;
  width?: string;
  height?: string;
  size?: string;
  color?: string;
  weight?: string;
  br?: string;
  flexGrow?: number;
  parentWidth?: string;
  styles?: CSSProperties;
}

const SelectInput = ({
  children,
  onChange,
  placeholder,
  value,
  onBlur,
  margin,
  id,
  labelId,
  label,
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
  flexGrow,
  parentWidth,
  styles,
}: InputProps) => {
  return (
    <Select labelId={labelId} id={id} label={label} onChange={onChange}>
      {children}
    </Select>
  );
};

export default SelectInput;
