import CircleProgress from "@molecule/circleProgress";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { styled } from "styled-components";

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
  background: ${({ isPassed }) => (isPassed ? "#6092A7" : "#929292")};
`;

function FlightBookingProgress({
  phase,
  highestPhase,
  setStep,
}: ComponentProps) {
  const { isMobile } = useScreenResolution();
  return (
    <Flex
      padding={isMobile ? "0" : "0 1.5rem"}
      margin={isMobile ? "0" : "0 0 5rem 0"}
    >
      <Grid columns="4" gap="0">
        <Flex align="center">
          <CircleProgress
            index="1"
            title="Search Flight"
            active={phase === 1}
            isPassed={phase > 1}
            disabled={highestPhase < 2}
            onClick={() => {
              if (highestPhase >= 2) setStep({ step: 2 });
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
            disabled={highestPhase < 3}
            onClick={() => {
              if (highestPhase >= 3) setStep({ step: 3 });
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
            disabled={highestPhase < 4}
            onClick={() => {
              if (highestPhase >= 4) setStep({ step: 4 });
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
            disabled={highestPhase < 5}
            onClick={() => {
              if (highestPhase >= 5) setStep({ step: 5 });
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
        disabled={highestPhase < 6}
        onClick={() => {
          if (highestPhase >= 6) setStep({ step: 6 });
          // setStep({ step: 6 });
        }}
      />
    </Flex>
  );
}

export default FlightBookingProgress;
