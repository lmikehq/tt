import Flex from "@/components/templates/flex";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import DropdownButton from "./DropdownButton";
import { BsArrowRight } from "react-icons/bs";
import { ttColors } from "@/lib/theme/colors";

export default function PassengerCard() {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "grid",
        gridTemplateColumns: "100px 0.7fr 1fr 1fr",
      }}
    >
      <Box
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50px",
          height: "50px",
          border: "1px solid gray",
          backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
        }}
      />

      <Box>
        <Text type="p" text="Departure" />

        <Flex justify="space-between" align="center" gap="1rem">
          <Text type="p" text="Lagos" />
          <BsArrowRight />
          <Text type="p" text="Germany" />
        </Flex>
      </Box>

      <Box>
        <Text type="p" text="1x" color={ttColors.lighterGray} />
        <Button background={ttColors.primaryLight} borderRadius="30px">
          INCLUDED
        </Button>
      </Box>

      <DropdownButton title="Add Baggage">
        <Text type="p" text="Option 1" />
      </DropdownButton>
    </Box>
  );
}
