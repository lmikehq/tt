"use client";

import { FormControlLabel, Checkbox as MUIChecky } from "@mui/material";
import React, { CSSProperties } from "react";

function CheckBox({
  children,
  onChange,
  checked,
  value,
    name,
  style
}: {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value?: boolean;
  name?: string;
  style?: CSSProperties;
}) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  return (
    <div style={style}>
      <FormControlLabel
        control={
          <MUIChecky
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
                ".MuiFormControlLabel-label": {
                    fontSize: '14px'
                }
            }}
          />
        }
        label={children}
      />
    </div>
  );
}

export default CheckBox;
