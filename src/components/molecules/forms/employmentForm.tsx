import CheckBox from "@molecule/checkbox";
import {
  ArrayInput,
  FieldAsDate,
  FieldInput,
  FieldString,
} from "@organism/fieldInput";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import dayjs, { Dayjs } from "dayjs";
import { FormikValues } from "formik";
import { useScreenResolution } from "@lib/hook/useScreenResolution";
import React, { useState } from "react";
import { EmploymentDetailsInterface } from "types";

interface formProps {
  formik: FormikValues;
  count: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  values: EmploymentDetailsInterface;
}

export default function EmploymentForm({ formik, count, values }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="unset">
      <Section margin="0">
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text={`Company Name ${count + 1}`}
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <Required />
        </Flex>
        <FieldInput
          formik={formik}
          name={`employment.${count}.companyName`}
          placeholder="Enter your Company's name"
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
              text="Job Title"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`employment.${count}.jobTitle`}
            placeholder="Enter your Job Position"
          />
        </Section>
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Employment Type"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldString
            placeholder="Select Employment Type"
            name={`employment.${count}.employmentType`}
            options={[
              "Full-Time",
              "Part-Time",
              "Self Employed",
              "Freelance",
              "Contract",
              "Internship",
            ]}
            formik={formik}
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
              text="Company's Location"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`employment.${count}.companyLocation`}
            placeholder="Enter Location"
          />
        </Section>
        {/* <Section>
          <Text
            type="p"
            text="Location Type"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldString
            placeholder="Select Location Type"
            name={`employment.${count}.locationType`}
            options={["On-site", "Hybrid", "Remote"]}
            formik={formik}
          />
        </Section> */}
      </Flex>
      <Flex
        margin={isMobile ? "0px" : "0 0 1rem"}
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section>
          <Text
            type="p"
            text="Start Year"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <FieldAsDate
            placeholder="Select your Start Year"
            views={["year"]}
            name={`employment.${count}.startYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`employment.${count}.startYear`, e.$y);
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
            disabled={values.stillWorking || !values.startYear}
            views={["year"]}
            name={`employment.${count}.endYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`employment.${count}.endYear`, e.$y);
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
          name={`employment.${count}.stillWorking`}
          onChange={formik.handleChange}
          checked={values.stillWorking}
        >
          <Text type="p" text="I am currently working in this role" />
        </CheckBox>
      </Flex>
    </Section>
  );
}
