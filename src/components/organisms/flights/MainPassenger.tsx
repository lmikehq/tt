import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function MainPassenger() {
  const [age, setAge] = useState<string>("");

  const handleNameChange = (event: SelectChangeEvent) => {
    const target = event.target as HTMLSelectElement;

    setAge(target?.value);
  };

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Text type="h2" text="Main Passenger" />
      </Flex>

      <Text
        type="p"
        text="To avoid boarding complications, enter all names and surnames exactly as they appear in your passport/ID."
      />

      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleNameChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"18"}>Eighteen</MenuItem>
            <MenuItem value={"20"}>Twenty</MenuItem>
            <MenuItem value={"30"}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
