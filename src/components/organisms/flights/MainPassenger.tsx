import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { FormLabel, OutlinedInput } from "@mui/material";
import Alert from "../Alert";
import PassengerCard from "./PassengerCard";

export default function MainPassenger() {
  const [age, setAge] = useState<string>("18");

  const handleNameChange = (event: SelectChangeEvent) => {
    const target = event.target as HTMLSelectElement;

    setAge(target?.value);
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text type="h2" text="Main Passenger" />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleNameChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"18"}>Adult (18+ year)</MenuItem>
            <MenuItem value={"20"}>Child (3 to 18 years)</MenuItem>
            <MenuItem value={"30"}>Infant (0 to 3 years)</MenuItem>
          </Select>
        </FormControl>
      </Flex>

      <Box>
        <Box sx={{ marginY: "2rem" }}>
          <Alert>
            To avoid boarding complications, enter all names and surnames
            exactly as they appear in your passport/ID.
          </Alert>
        </Box>

        <Box
          sx={{
            marginY: "2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "1rem",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="last-name" required>
              Last Name
            </FormLabel>
            <OutlinedInput id="last-name" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="first-name" required>
              First Name
            </FormLabel>
            <OutlinedInput id="first-name" />
          </FormControl>
        </Box>

        <Box>
          <Text type="h2" text="Add extra check-in bags" />
          <Text
            type="p"
            text="Choose an option. Various airlines have varying restrictions concerning the dimensions of baggage, thus we're presenting you with the maximum acceptable size based on your travel plans"
          />

          <Box sx={{ marginY: "1rem" }}>
            <PassengerCard />
            <PassengerCard />
          </Box>
        </Box>
      </Box>
    </>
  );
}
