import CircleProgress from "@atom/circleProgress";

interface ComponentProps {
  setPhase: (number: number) => Promise<void>;
  phase: number;
  highestPhase: number;
}

function VisaProgress({ phase, setPhase, highestPhase }: ComponentProps) {
  return (
    <div>
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
      <CircleProgress
        index="2"
        title="Education Details"
        active={phase === 2}
        isPassed={phase > 2}
        disabled={highestPhase < 3}
        onClick={() => {
          // if (highestPhase >= 3) setPhase(3);
          setPhase(3);
        }}
      />
      <CircleProgress
        index="3"
        title="Employment Details"
        active={phase === 3}
        isPassed={phase > 3}
        disabled={highestPhase < 4}
        onClick={() => {
          // if (highestPhase >= 4) setPhase(4);
          setPhase(4);
        }}
      />
      <CircleProgress
        index="4"
        title="Family Information"
        active={phase === 4}
        isPassed={phase > 4}
        disabled={highestPhase < 5}
        onClick={() => {
          // if (highestPhase >= 5) setPhase(5);
          setPhase(5);
        }}
      />
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
    </div>
  );
}

export default VisaProgress;
