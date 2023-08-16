import CircleProgress from "@atom/circleProgress";

interface ComponentProps {
  setPhase: ({ number }: { number: number }) => void;
  phase: number;
}

function VisaProgress({ phase, setPhase }: ComponentProps) {
  return (
    <div>
      <CircleProgress
        index="1"
        title="Personal Information"
        active={phase == 1}
        isPassed={phase > 1}
        onClick={() => setPhase({ number: 2 })}
      />
      <CircleProgress
        index="2"
        title="Education Details"
        active={phase == 2}
        isPassed={phase > 2}
        onClick={() => setPhase({ number: 3 })}
      />
      <CircleProgress
        index="3"
        title="Employment Details"
        active={phase == 3}
        isPassed={phase > 3}
        onClick={() => setPhase({ number: 4 })}
      />
      <CircleProgress
        index="4"
        title="Family Information"
        active={phase == 4}
        isPassed={phase > 4}
        onClick={() => setPhase({ number: 5 })}
      />
      <CircleProgress
        index="5"
        title="Upload Document"
        active={phase == 5}
        isPassed={phase > 5}
        onClick={() => setPhase({ number: 6 })}
      />
    </div>
  );
}

export default VisaProgress;
