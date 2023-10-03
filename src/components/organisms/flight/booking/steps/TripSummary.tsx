import Button from "@/components/atoms/button";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import MainPassenger from "@/components/organisms/flights/MainPassenger";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";

const TripSummary = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <TripSummaryCard />
      <ContactDetails />
      <MainPassenger />
      <Box sx={{ marginY: "3rem" }}>
        <Button background={ttColors.dark} width="100%">
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default TripSummary;
