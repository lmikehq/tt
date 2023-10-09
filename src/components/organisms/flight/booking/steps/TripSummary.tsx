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
  const { checkFlights } = useFlightBookingStore((state) => state);
  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

  const params = new URLSearchParams(window.location.search);

  const checkFlightsThreeSecondsInterval = (sessionId: string) => {
    console.log(sessionId);
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId,
      },
    })
      .then(async (response) => {
        if (
          response.flights_checked == true &&
          response.price_change == false &&
          response.flights_invalid == false
        )
          return checkFlightsFifteenSecondsInterval(sessionId);
        await sleep(3000);
        return checkFlightsThreeSecondsInterval(sessionId);
      })
      .catch(() => {});
  };

  const checkFlightsFifteenSecondsInterval = (sessionId: string) => {
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId,
      },
    })
      .then(async () => {
        await sleep(15000);
        return checkFlightsFifteenSecondsInterval(sessionId);
      })
      .catch(() => {});
  };
  useEffect(() => {
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
      },
    }).then((response) =>
      checkFlightsThreeSecondsInterval(response.session_id)
    );
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
