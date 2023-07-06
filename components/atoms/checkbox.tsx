"use client";

import { FormControlLabel, Checkbox as MUIChecky } from "@mui/material";
import React from "react";

function CheckBox({
  children,
  onChange,
  checked,
}: {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) {
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };
  return (
    <div>
      <FormControlLabel
        control={
          <MUIChecky
            checked={checked}
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
