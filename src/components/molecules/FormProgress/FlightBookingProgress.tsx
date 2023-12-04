import CircleProgress from "@molecule/circleProgress";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { styled } from "styled-components";
import { ttColors } from "@/lib/theme/colors";
import { formatDate, translateCabin } from "@/lib/utilFns";
import dayjs from "dayjs";
import { FlightContext, OneFlightType } from "@/lib/extensions/context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

interface ComponentProps {
  phase: number;
  highestPhase: number;
  setStep: ({ step }: { step: number }) => void;
}
const HorizontalLine = styled.div<{
  isPassed: boolean;
}>`
  height: 1px;
  flex-grow: 1;
  background: ${({ isPassed }) => (isPassed ? ttColors.primary600 : "#929292")};
`;

function FlightBookingProgress({
    phase,
    highestPhase,
    setStep,
}: ComponentProps) {
    const { isMobile } = useScreenResolution();
    const flightContext = useContext(FlightContext);
    const flightState = flightContext?.state
    const { push } = useRouter()
    
    const flight = flightState?.fleet[0];
    
    const formatSearchFlight = (flight?: OneFlightType) => {
        const dateFrom = formatDate(flight?.departureDate ?? dayjs());
        const returnFrom = formatDate(flight?.returnDate ?? dayjs());
        // const dateTo = formatDate(flight?.returnDate ?? dayjs());
        const departure = flight?.departureCountry;
        const arrival = flight?.arrivalCountry;
        const adults = flight?.adults;
        const children = flight?.children;
        const infants = flight?.infants;
        const cabin = translateCabin(flight?.flightClass);
        const cabinBags = flight?.cabinBaggage;
        const checkedBags = flight?.checkedBaggage;

        const alt = `/flight/listings`

        if (departure && arrival && adults) {
            return `/flight/listings?fly_from=${departure?.code}&fly_to=${
                arrival?.code
            }&date_from=${dateFrom}${
                flight?.returnDate ? `&return_from=${returnFrom}` : ""
            }&stops=${flightState?.stops}&cabin=${cabin}&adults=${adults}&children=${children}&infants=${infants}&cabinBags=${cabinBags}&checkedBags=${checkedBags}`;
        } else return alt
    };

  return (
    <Flex
      padding={isMobile ? "0" : "0 0rem"}
      margin={isMobile ? "0" : "0 0 2.5rem 0"}
    >
      <Grid columns="4" gap="0">
        <Flex align="center">
          <CircleProgress
            index="1"
            title="Search Flight"
            active={phase === 1}
            isPassed={phase > 1}
            disabled={true}
            onClick={() => {
                push(formatSearchFlight(flight))
              // if (highestPhase >= 1) setStep({ step: 1 });
            }}
          />
          <HorizontalLine isPassed={phase > 1} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="2"
            title="Passengers & baggage"
            active={phase === 2}
            isPassed={phase > 2}
            disabled={highestPhase < 2}
            onClick={() => {
              if (highestPhase >= 2) setStep({ step: 2 });
              // setStep(3);
            }}
          />
          <HorizontalLine isPassed={phase > 2} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="3"
            title="Choose Ticket Fare"
            active={phase === 3}
            isPassed={phase > 3}
            disabled={highestPhase < 3}
            onClick={() => {
              if (highestPhase >= 3) setStep({ step: 3 });
              // setStep(4);
            }}
          />
          <HorizontalLine isPassed={phase > 3} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="4"
            title="Seat Selection"
            active={phase === 4}
            isPassed={phase > 4}
            disabled={highestPhase < 4}
            onClick={() => {
              if (highestPhase >= 4) setStep({ step: 4 });
              // setStep(5);
            }}
          />
          <HorizontalLine isPassed={phase > 4} />
        </Flex>
      </Grid>
      <CircleProgress
        index="5"
        title="Overview & Payment"
        active={phase === 5}
        isPassed={phase > 5}
        disabled={highestPhase < 5}
        onClick={() => {
          if (highestPhase >= 5) setStep({ step: 5 });
          // setStep({ step: 6 });
        }}
      />
    </Flex>
  );
}

export default FlightBookingProgress;
