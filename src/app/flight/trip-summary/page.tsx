"use client";
import Section from "@/components/molecules/section";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import PriceSumary from "@/components/organisms/flights/PriceSummary";
import TripSteps from "@/components/organisms/flights/TripSteps";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import Navbar from "@/components/organisms/Navbar";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";

export default function Page() {
  return (
    <Section>
      <Navbar page="flights" />

      <Container
        sx={{
          margin: "2rem auto",
        }}
        maxWidth="lg"
      >
        <Box sx={{ marginY: "3rem" }}>
          <TripSteps />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            columnGap: "3rem",
            marginY: "4rem",
          }}
        >
          <Box>
            <Box marginBottom="2rem">
              <TripSummaryCard />
            </Box>
            <ContactDetails />
          </Box>

          <Box>
            <PriceSumary />
            <img src="/assets/images/flights/baggage.png" alt="Baggage" />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
