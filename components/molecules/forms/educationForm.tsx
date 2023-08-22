import CheckBox from "@atom/checkbox";
import { FieldAsDate, FieldInput, FieldString } from "@atom/fieldInput";
import Flex from "@atom/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import React, { useState } from "react";

interface formProps {
  formik: any;
  education?: any;
  isMobile?: boolean;
  count: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function EducationForm({ formik, isMobile, count }: formProps) {
  const [isCurrentlyInSchool, setIsCurrentlyInSchool] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCurrentlyInSchool(checked);
  };

  return (
    <Section height="unset">
      <Section margin="0 0 1rem">
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text={`School Name ${count + 1}`}
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Required />
        </Flex>
        <FieldInput
          formik={formik}
          name={`educations.${count}.schoolName`}
          placeholder="Enter School Name"
        />
      </Section>
      <Flex
        margin="0 0 1rem"
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Degree"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldString
            options={DEGREES}
            name={`educations.${count}.degree`}
            formik={formik}
            placeholder="Select your Degree"
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="Field of Study"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldString
            options={COMMON_MAJORS}
            formik={formik}
            placeholder="Select your Field of Study"
            name={`educations.${count}.courseOfStudy`}
          />
        </Section>
      </Flex>
      <Flex
        margin={isMobile ? "0px" : "0 0 1rem"}
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Grade"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            type="number"
            name={`educations.${count}.grade`}
            placeholder="Enter your Grade"
            onChange={(e: any) => {
              formik.setFieldValue(
                `educations.${count}.grade`,
                parseInt(e.target.value)
              );
            }}
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="School's Location"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldInput
            name={`educations.${count}.schoolLocation`}
            formik={formik}
            placeholder="Enter Location"
          />
        </Section>
      </Flex>
      <Flex
        margin={isMobile ? "0px" : "0 0 1rem"}
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section width="100%">
          <Text
            type="p"
            text="Start Date"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldAsDate
            placeholder="Select your Start Year"
            views={["year"]}
            name={`educations.${count}.startYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`educations.${count}.startYear`, `${e.$y}`);
            }}
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="End Date"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldAsDate
            placeholder="Select your End Year"
            disabled={isCurrentlyInSchool}
            views={["year"]}
            name={`educations.${count}.endYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`educations.${count}.endYear`, `${e.$y}`);
            }}
          />
        </Section>
      </Flex>
      <Flex
        align="center"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "0.25rem"}
      >
        <CheckBox checked={isCurrentlyInSchool} onChange={handleCheckboxChange}>
          <Text type="p" text="I am currently in school" />
        </CheckBox>
      </Flex>
    </Section>
  );
}
