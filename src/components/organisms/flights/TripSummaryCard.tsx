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

const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion sx={{ my: "2rem" }} {...props} />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: "500px",
  },
}));

export default function TripSummaryCard() {
  return (
    <Paper sx={{ padding: "1rem" }}>
      <Flex margin="1rem 0" align="center" justify="space-between">
        <Text text="Your Trip Summary" type="h1" />

        <Button variant="outline" padding="1rem">
          Change Flight
        </Button>
      </Flex>

      <Flex margin="1rem 0" align="center" justify="space-between">
        <Flex margin="1rem 0" align="center" gap="1rem">
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
        </Flex>

        <Text text={"24 Aug 2023"} type="p" size={"1.2rem"} />
      </Flex>

      <Flex margin="1rem 0" align="center" justify="space-between">
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

        <Box>
          <Text text={"9h 15'"} type="p" />
          <Text
            text={"Check-in bag included"}
            type="p"
            color={ttColors.primary}
          />
        </Box>
      </Flex>

      <hr style={{ border: "1px dotted #E7E7E7" }} />

      <StyledAccordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Show Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </Paper>
  );
}
