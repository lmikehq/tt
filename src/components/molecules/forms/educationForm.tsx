import CheckBox from "@molecule/checkbox";
import { BlockDatePicker } from "@organism/datepicker";
import {
  ArrayInput,
  FieldAsDate,
  FieldInput,
  FieldString,
} from "@organism/fieldInput";
import Flex from "@components/templates/flex";
import Input from "@atom/input";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { COMMON_MAJORS, DEGREES } from "@lib/data/utilData";
import dayjs, { Dayjs } from "dayjs";
import { FormikValues } from "formik";
import { useScreenResolution } from "@lib/hook/useScreenResolution";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { EducationDetailsInterface } from "types";

interface formProps {
  formik: any;
  values: EducationDetailsInterface;
  count: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function EducationForm({ formik, count, values }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="unset">
      <Section margin="0">
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text={`School Name ${count + 1}`}
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <ArrayInput
          formik={formik}
          name={`education.${count}.school`}
          placeholder="Enter School Name"
        />
      </Section>
      <Flex
        margin="0"
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Degree"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldString
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
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldString
            options={COMMON_MAJORS}
            formik={formik}
            placeholder="Select your Field of Study"
            name={`education.${count}.fieldOfStudy`}
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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <ArrayInput
            max={5.0}
            min={1}
            defaultValue=""
            step="0.01"
            formik={formik}
            type="number"
            name={`education.${count}.cgpa`}
            placeholder="Enter your Grade"
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="School's Location"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldInput
            name={`education.${count}.location`}
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
            text="Start Year"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldAsDate
            placeholder="Select your Start Year"
            views={["year"]}
            name={`education.${count}.startYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`education.${count}.startYear`, e.$y);
            }}
            // maxDate={dayjs(new Date())}
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="End Year"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldAsDate
            placeholder="Select your End Year"
            disabled={values.stillAtSchool || !values.startYear}
            views={["year"]}
            name={`education.${count}.endYear`}
            formik={formik}
            onChange={(e) => {
              formik.setFieldValue(`education.${count}.endYear`, e.$y);
            }}
            minDate={dayjs(`${values.startYear}`)}
            // maxDate={dayjs(new Date())}
          />
        </Section>
      </Flex>
      <Flex
        align={isMobile ? "flex-start" : "center"}
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "0.25rem"}
      >
        <CheckBox
          name={`education.${count}.stillAtSchool`}
          onChange={formik.handleChange}
          checked={values.stillAtSchool}
        >
          <Text type="p" text="I am currently in school" />
        </CheckBox>
      </Flex>
    </Section>
  );
}
