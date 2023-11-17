import React from "react";
import { Header, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Box } from "@mui/material";
import BookingDetails from "./BookingDetails";
import CheckingIn from "./CheckingIn";
import Payment from "./Payment";
import ImprovedCondition from "./ImprovedContion";
import FreeCancellation from "./FreeCancellation";
import HotelDetail from "./HotelDetail";
import PriceDetail from "./PriceDetail";

function Booking() {
  const { isMobile } = useScreenResolution();

  return (
    <Span>
      <Header>
        <Flex align="center" gap="10px">
          <ArrowBackIosNewIcon />
          <Text type="h3" text="Secure your booking"></Text>
        </Flex>
      </Header>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile ? "100%" : "67.3% 30%",
          gap: "30px",
        }}
      >
        <Span>
          <CheckingIn />
          <ImprovedCondition />
          <BookingDetails />
          <Payment />
        </Span>
        <Span>
          <HotelDetail />
          <PriceDetail />
          <FreeCancellation />
        </Span>
      </Box>
    </Span>
  );
}

export default Booking;
