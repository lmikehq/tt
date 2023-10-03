import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { ChangeEvent, useState } from "react";
import DropdownButton from "./DropdownButton";

export default function SortButton() {
  const options = ["All", "Cheapest", "Best", "Quickest"];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  };

  return (
    <DropdownButton
      title="Sort by"
      leftIcon={<SortIcon />}
      rightIcon={null}
      backgroundColor="transparent"
    >
      <Box sx={{ padding: "2rem" }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Sort By</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={selectedOption}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            {options.map((key) => (
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
