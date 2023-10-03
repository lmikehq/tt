"use client";
import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Flex from "@/components/templates/flex";
import { styled } from "@mui/material/styles";
import { ttColors } from "@/lib/theme/colors";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TripSummaryDetails from "./TripSummaryDetails";

const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} {...props} />
))(() => ({
  "&::before": {
    content: '""',
    border: "none",
    borderTop: `3px dotted ${ttColors.lightestGray}`,
    backgroundColor: "transparent",
  },
}));

export default function TripSummaryCard() {
  return (
    <>
      <Flex margin="1rem 0" align="center" justify="space-between">
        <Text text="Your Trip Summary" type="h1" />

        <Button variant="outline" padding="1rem">
          Change Flight
        </Button>
      </Flex>

      <Flex margin="1rem 0" align="center" justify="space-between">
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
          margin="1rem 0"
        >
          <Box
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "50px",
              height: "50px",
              backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
            }}
          />

          <Text text={"Departure"} type="p" weight={"bold"} />
          <Text text={"EgyptAir"} type="p" />
        </Box>

        <Text text={"24 Aug 2023"} type="p" size={"1rem"} />
      </Flex>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          margin: "1rem 0",
          gap: "1rem",
        }}
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Text type="p" text={"22:00 LAG"} size={"1.3rem"} weight="bold" />
            <Text type="p" text={"Sat, 26 Aug"} />
            <Text type="p" text={"Murtala Muhammed, TI"} />
            <Text type="p" text={"Lagos (Nigeria)"} />
          </Box>

          <Box>
            <Box>
              <img src="/assets/images/flights/departure-right.png" alt="" />
            </Box>
            <Text type="p" text="2 Stops" />
          </Box>

          <Box>
            <Text type="p" text={"22:00 LAG"} size={"1.3rem"} weight="bold" />
            <Text type="p" text={"Sat, 26 Aug"} />
            <Text type="p" text={"Murtala Muhammed, TI"} />
            <Text type="p" text={"Lagos (Nigeria)"} />
          </Box>
        </Flex>

        <Box>
          <Text text={"9h 15'"} type="p" />
          <Text
            text={"Check-in bag included"}
            type="p"
            color={ttColors.primary}
          />
        </Box>
      </Box>

      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="flight-details-content"
          id="flight-details-header"
        >
          <Text color={ttColors.primary} type="p" text={"Show Details"} />
        </AccordionSummary>

        <AccordionDetails>
          <TripSummaryDetails />
        </AccordionDetails>
      </StyledAccordion>
    </>
  );
}
