import Flex from "@atom/flex";
import Input from "@atom/input";
import Text from "@atom/text";
import { validateEmail } from "@lib/utilFns";
import Section from "@molecule/section";
import { FormikValues } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function OtherInformation({ formik, steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <Flex align="center" gap=".5rem" margin="2rem 0">
          <FaCircle size={".4rem"} color={ttColors.salmon} />
          <Text type="p" text=" Your name as it appears on your passport" />
        </Flex>
        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="First and Middle Name" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.firstName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.firstName}
              onChange={(x) =>
                formik.setFieldValue("firstName", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Last Name" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.lastName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.lastName}
              onChange={(x) => formik.setFieldValue("lastName", x.target.value)}
            />
          </Section>
        </Flex>

        <Section>
          <Text type="p" text="First and Middle Name" margin="1rem 0 " />
          <Input
            addon={
              formik?.values?.firstName?.length > 5 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.firstName}
            onChange={(x) => formik.setFieldValue("firstName", x.target.value)}
          />
        </Section>
      </form>
    </Section>
  );
}

export default OtherInformation;
