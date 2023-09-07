import Button from "@atom/button";
import Link from "@atom/link";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import Image from "@atom/image";
import { ttColors } from "@lib/theme/colors";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "@lib/hook/useScreenResolution";
interface formProps {
  steps: string[];
  index: number;
  setPhase?: (n: number) => void;
}

export function PaymentStatusSuccess({ steps, index }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section>
      <FormStepTitle steps={steps} index={index} />
      <Section styles={{ textAlign: "center", margin: "6rem 0" }}>
        <Image
          src={"/assets/images/success-coveti.svg"}
          alt="success"
          width={300}
          height={200}
        />
        <Text
          type="p"
          text="Your payment was successful"
          size="1.5rem"
          weight={800}
          margin="2rem 0 1rem"
        />
        <Link href="/dashboard">
          <Button border={`1px solid ${ttColors.primary}`} width="100%">
            <Text type="p" text="Go to your dashboard" size="1.1rem" />
          </Button>
        </Link>
      </Section>
    </Section>
  );
}
export function PaymentStatusFail({ steps, index, setPhase }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />
      <Section styles={{ textAlign: "center", margin: "6rem 0" }}>
        <Image
          src={"/assets/images/sad-face-emoji.svg"}
          alt="success"
          width={300}
          height={200}
        />
        <Text
          type="p"
          text="Your payment wasn’t successful"
          size="1.5rem"
          weight={800}
          margin="2rem 0 1rem"
        />
        <Button
          border={`1px solid ${ttColors.primary}`}
          width="100%"
          onClick={() => setPhase && setPhase(5)}
        >
          <Text type="p" text="Try again" size="1.1rem" />
        </Button>
      </Section>
    </Section>
  );
}
