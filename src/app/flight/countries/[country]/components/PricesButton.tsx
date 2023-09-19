import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import DropdownButton from "./DropdownButton";

export default function PricesButton() {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const valueLabelFormat = (value: number) => `$${value}`;

  return (
    <DropdownButton title="Prices">
      <Box
        sx={{
          padding: "1rem",
        }}
      >
        <Box sx={{ mb: "1.5rem" }}>
          <p>Any Price</p>
        </Box>
        <Box sx={{ width: "200px" }}>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <Slider
              aria-label="small"
              valueLabelDisplay="auto"
              valueLabelFormat={valueLabelFormat}
              value={value}
              min={0}
              step={1}
              max={500}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: "20px",
                width: "70px",
                padding: "0.5rem",
              }}
            >
              $0
            </Box>
            <span>-</span>
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: "20px",
                width: "70px",
                padding: "0.5rem",
              }}
            >
              $500
            </Box>
          </Box>
        </Box>
      </Box>
    </DropdownButton>
  );
}
