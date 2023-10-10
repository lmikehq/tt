import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import TripOverviewCard from "@/components/organisms/flights/TripOverviewCard";
import PaymentModal from "@/components/organisms/modal/components/paymentModal";
import Flex from "@/components/templates/flex";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { useState } from "react";

const OverviewAndPayment = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem", width: "100%" }}>
      <TripOverviewCard/>
      <Box sx={{ marginY: "3rem" }}>
        <Button background={ttColors.dark} width="100%" onClick={() => setIsOpen(true)}>
          <Text type="p" text="Make Payment" weight={600} />
        </Button>
      </Box>
      <PaymentModal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
      />
      <Flex direction="column" gap=".5rem">
        <Text type="h3" text="Cancellation policy" weight={600} />
        <Text type="p" text="This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on Thrillers are backed by our satisfaction guarantee, however cancellation policies vary by airline. "/>
      </Flex>
    </Box>
  );
};

export default OverviewAndPayment;
