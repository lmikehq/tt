import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import DropdownButton from "./DropdownButton";

export default function StopsButton() {
  const stops = ["Any", "NonStop", "Up to 1 stop", "Up to 2 stops"];

  const [selectedValue, setSelectedValue] = useState(stops[0]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue((event.target as HTMLInputElement).value);
  };

  return (
    <DropdownButton title="Stops">
      <Box sx={{ padding: "2rem" }}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={selectedValue}
            onChange={handleChange}
          >
            {stops.map((key) => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={key}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </DropdownButton>
  );
}
