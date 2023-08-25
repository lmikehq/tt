"use client";

import { FormControlLabel, Checkbox as MUIChecky } from "@mui/material";
import React from "react";

function CheckBox({
  children,
  onChange,
  checked,
  value,
  name,
}: {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value?: boolean;
  name: string;
}) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  return (
    <div>
      <FormControlLabel
        control={
          <MUIChecky
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={children}
      />
    </div>
  );
}

export default CheckBox;
