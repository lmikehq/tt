import CheckBox from "@atom/checkbox";
import EnlargedDate from "@atom/enlargedDate";
import { FieldAsDate, FieldAsString, FieldInput } from "@atom/fieldInput";
import Flex from "@atom/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import { concatArrays, get100Years } from "@lib/utilFns";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import Section from "@molecule/section";
import { DatePicker } from "@atom/datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import React, { useState } from "react";

interface formProps {
  formik: FormikValues;
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
      <form>
        <Section margin="0 0 1rem">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`School Name ${count+1}`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`education.${count}.schoolName`}
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
            <FieldAsString
              options={DEGREES}
              name={`education.${count}.degree`}
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
            <FieldAsString
              options={COMMON_MAJORS}
              formik={formik}
              placeholder="Select your Field of Study"
              name={`education.${count}.courseOfStudy`}
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
              name={`education.${count}.grade`}
              placeholder="Enter your Grade"
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="School's Location"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <FieldInput
              name={`education.${count}.schoolLocation`}
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
              views={['year']}
              name={`education.${count}.startedYear`}
              formik={formik}
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
              views={['year']}
              name={`education.${count}.endDate`}
              formik={formik}
            />
          </Section>
        </Flex>
        <Flex
          align="center"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "0.25rem"}
        >
          <CheckBox
            checked={isCurrentlyInSchool}
            onChange={handleCheckboxChange}
          >
            <Text type="p" text="I am currently in school" />
          </CheckBox>
        </Flex>
      </form>
    </Section>
  );
}
