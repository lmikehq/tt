"use client";

import { FormControlLabel, Checkbox as MUIChecky } from "@mui/material";
import React from "react";

function CheckBox({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <FormControlLabel
        control={
          <MUIChecky
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label={children}
      />
    </div>
  );
}

export default CheckBox;
