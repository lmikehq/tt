import { DatePicker } from "@atom/datepicker";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import dayjs from "dayjs";
import { FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@atom/flex";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import { DEGREES } from "data/utilData";
import { get100Years, validateEmail } from "@lib/utilFns";
import { useState } from "react";
import Input from "@atom/input";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
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
          <Text type="p" text="Email Address" margin="1rem 0 " />
          <Input
            addon={
              validateEmail(formik?.values?.email) ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.email}
            onChange={(x) => formik.setFieldValue("email", x.target.value)}
          />
        </Section>

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Place of Origin" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.placeOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.placeOfOrigin}
              onChange={(x) =>
                formik.setFieldValue("placeOfOrigin", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="State of Origin" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.stateOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.stateOfOrigin}
              onChange={(x) => formik.setFieldValue("stateOfOrigin", x.target.value)}
            />
          </Section>
        </Flex>
      </form>
    </Section>
  );
}

export default PersonalInfo;
