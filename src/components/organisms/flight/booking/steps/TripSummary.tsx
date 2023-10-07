import Button from "@/components/atoms/button";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import MainPassenger from "@/components/organisms/flights/MainPassenger";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import { Box } from "@mui/material";
import { useEffect } from "react";

const TripSummary = () => {
  const { checkFlights, sessionId } = useFlightBookingStore((state) => state);
  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

  const checkFlightsThreeSecondsInterval = () => {
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId ?? "",
      },
    })
      .then((response) => {
        if (
          response.flights_checked == true &&
          response.price_change == false &&
          response.flights_invalid == false
        )
          return checkFlightsFifteenSecondsInterval();
        sleep(3000);
        checkFlightsThreeSecondsInterval();
      })
      .catch(() => {});
  };

  const checkFlightsFifteenSecondsInterval = () => {
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId ?? "",
      },
    })
      .then(() => {
        sleep(15000);
        checkFlightsFifteenSecondsInterval();
      })
      .catch(() => {});
  };
  useEffect(() => {
    checkFlightsThreeSecondsInterval();
  }, []);
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
