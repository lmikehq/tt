import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

import DropdownButton from "./DropdownButton";

export default function CabinButton() {
  return (
    <DropdownButton title="Departure Time">
      <Box sx={{ padding: "2rem" }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Economy"
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Premium Economy"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Business" />
          <FormControlLabel
            disabled
            control={<Checkbox />}
            label="First Class"
          />
        </FormGroup>
      </Box>
    </DropdownButton>
  );
}
