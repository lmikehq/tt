import Button from "@atom/button";
import Link from "@atom/link";
import Text from "@atom/text";
import covetti from "@image/success-coveti.svg";
import sadFace from "@image/sad-face-emoji.svg";
import Section from "@molecule/section";
import Image from "next/image";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
interface formProps {
  steps: string[];
  index: number;
}

export function PaymentStatusSuccess({ steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <Section styles={{ textAlign: "center", margin: "6rem 0" }}>
        <Image src={covetti} alt="success" width={300} height={200} />
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
export function PaymentStatusFail({ steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <Section styles={{ textAlign: "center", margin: "6rem 0" }}>
        <Image src={sadFace} alt="success" width={300} height={200} />
        <Text
          type="p"
          text="Your payment wasn’t successful"
          size="1.5rem"
          weight={800}
          margin="2rem 0 1rem"
        />
        <Link href="/dashboard">
          <Button border={`1px solid ${ttColors.primary}`} width="100%">
            <Text type="p" text="Try again" size="1.1rem" />
          </Button>
        </Link>
      </Section>
    </Section>
  );
}
