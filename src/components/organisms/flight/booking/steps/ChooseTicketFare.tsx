import Text from "@/components/atoms/text";
import TicketFareTable from "@/components/organisms/flights/TicketFareTable";
import { Box, Paper } from "@mui/material";

const ChooseTicketFare = () => {
  return (
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
  );
};

export default ChooseTicketFare;
