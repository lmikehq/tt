"use client";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import PriceSumary from "@/components/organisms/flights/PriceSummary";
import TicketFareTable from "@/components/organisms/flights/TicketFareTable";
import TripSteps from "@/components/organisms/flights/TripSteps";
import Navbar from "@/components/organisms/Navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
            flexDirection: { xs: "column", md: "row" },
            columnGap: "3rem",
            rowGap: "2rem",
            marginY: "4rem",
          }}
        >
          <Box>
            <Paper sx={{ padding: "2rem", width: "100%" }}>
              <Box marginBottom={"2rem"}>
                <Text type="h2" text="Choose Ticket Fare" />
                <Text
                  type="p"
                  text="Switch to the Advanced level now to feel secure in case your plans end up changing."
                />
              </Box>

              <TicketFareTable />
            </Paper>
          </Box>

          <Box>
            <PriceSumary />
          </Box>
        </Box>
      </Container>
    </Section>
  );
}
