import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import DropdownButton from "./DropdownButton";
import { BsArrowRight } from "react-icons/bs";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import { ttColors } from "@/lib/theme/colors";

export default function PassengerCard() {
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "50px 1fr 0.8fr 0.8fr",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50px",
          height: "50px",
          border: "1px solid gray",
          borderRadius: "50px",
          backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
        }}
      />

      <Box>
        <Text type="p" text="Departure" />

        <Flex align="center" gap="1rem">
          <Text type="p" text="Lagos" />
          <BsArrowRight />
          <Text type="p" text="Germany" />
        </Flex>
      </Box>

      <Flex justify="space-between" align="center">
        <Text type="p" text="1x" color={ttColors.lighterGray} />
        <LuggageOutlinedIcon color={"disabled"} />
        <Button
          width="100px"
          height="35px"
          background={ttColors.primaryLight}
          borderRadius="30px"
        >
          INCLUDED
        </Button>
      </Flex>

      <DropdownButton title="Add Baggage">
        <Text type="p" text="Option 1" />
      </DropdownButton>
    </Box>
  );
}
