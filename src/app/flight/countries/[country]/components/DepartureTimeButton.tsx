import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Typography } from "@mui/material";

import DropdownButton from "./DropdownButton";
import { ttColors } from "@lib/theme/colors";

export default function DepartureTimeButton() {
  const [departureTimes, setDepartureTimes] = useState([
    {
      label: "Morning",
      time: "5:00am - 11:59am",
      isChecked: false,
    },
    {
      label: "Afternoon",
      time: "12:00pm - 5:59pm",
      isChecked: false,
    },
    {
      label: "Evening",
      time: "6:00pm - 11:59pm",
      isChecked: false,
    },
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDepartureTimes = departureTimes.map((departureTime) => {
      if (event.target.name === departureTime.label) {
        return {
          ...departureTime,
          isChecked: !departureTime.isChecked,
        };
      }
      return departureTime;
    });
    setDepartureTimes(newDepartureTimes);
  };

  return (
    <DropdownButton title="Departure Time">
      <Box sx={{ padding: "1rem 4rem 1rem 1rem" }}>
        <FormGroup>
          {departureTimes.map((departureTime) => (
            <>
              <FormControlLabel
                key={departureTime.label}
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={departureTime.isChecked}
                    name={departureTime.label}
                  />
                }
                label={departureTime.label}
              />
              <Typography color={ttColors.gray} marginLeft={"2rem"}>
                {departureTime.time}
              </Typography>
            </>
          ))}
        </FormGroup>
      </Box>
    </DropdownButton>
  );
}
