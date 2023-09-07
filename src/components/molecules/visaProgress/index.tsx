import CircleProgress from "@molecule/circleProgress";
import Flex from "src/components/atoms/flex";
import { Grid } from "@components/templates/grid";
import { useScreenResolution } from "hook/useScreenResolution";
import { styled } from "styled-components";

interface ComponentProps {
  setPhase: (number: number) => Promise<void>;
  phase: number;
  highestPhase: number;
}
const HorizontalLine = styled.div<{
  isPassed: boolean;
}>`
  height: 1px;
  flex-grow: 1;
  background: ${({ isPassed }) => (isPassed ? "#6092A7" : "#929292")};
`;

function VisaProgress({ phase, setPhase, highestPhase }: ComponentProps) {
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
            title="Personal Details"
            active={phase === 1}
            isPassed={phase > 1}
            disabled={highestPhase < 2}
            onClick={() => {
              if (highestPhase >= 2) setPhase(2);
            }}
          />
          <HorizontalLine isPassed={phase > 1} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="2"
            title="Education Details"
            active={phase === 2}
            isPassed={phase > 2}
            disabled={highestPhase < 3}
            onClick={() => {
              if (highestPhase >= 3) setPhase(3);
              // setPhase(3);
            }}
          />
          <HorizontalLine isPassed={phase > 2} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="3"
            title="Employment Details"
            active={phase === 3}
            isPassed={phase > 3}
            disabled={highestPhase < 4}
            onClick={() => {
              if (highestPhase >= 4) setPhase(4);
              // setPhase(4);
            }}
          />
          <HorizontalLine isPassed={phase > 3} />
        </Flex>
        <Flex align="center">
          <CircleProgress
            index="4"
            title="Family Information"
            active={phase === 4}
            isPassed={phase > 4}
            disabled={highestPhase < 5}
            onClick={() => {
              if (highestPhase >= 5) setPhase(5);
              // setPhase(5);
            }}
          />
          <HorizontalLine isPassed={phase > 4} />
        </Flex>
      </Grid>
      <CircleProgress
        index="5"
        title="Upload Document"
        active={phase === 5}
        isPassed={phase > 5}
        disabled={highestPhase < 6}
        onClick={() => {
          // if (highestPhase >= 6) setPhase(6);
          setPhase(6);
        }}
      />
    </Flex>
  );
}

export default VisaProgress;
