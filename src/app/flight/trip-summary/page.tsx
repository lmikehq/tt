"use client";
import Image from "@/components/atoms/image";
import Section from "@/components/molecules/section";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import MainPassenger from "@/components/organisms/flights/MainPassenger";
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
            flexDirection: { xs: "column", md: "column" },
            columnGap: "3rem",
            rowGap: "2rem",
            marginY: "4rem",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}
          >
            <Box>
              <TripSummaryCard />
            </Box>
            <Box>
              <ContactDetails />
            </Box>
            <Box>
              <MainPassenger />
            </Box>
          </Box>

          <Box>
            <PriceSumary />
            <Image
              width={384}
              height={525}
              src="/assets/images/flights/baggage.png"
              alt="Baggage"
            />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
