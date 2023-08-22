import CheckBox from "@atom/checkbox";
import {
  ArrayInput,
  FieldAsDate,
  FieldInput,
  FieldString,
} from "@atom/fieldInput";
import Flex from "@atom/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "@molecule/section";
import dayjs, { Dayjs } from "dayjs";
import { FormikValues } from "formik";
import React, { useState } from "react";

interface formProps {
  formik: FormikValues;
  isMobile?: boolean;
  count: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function EmploymentForm({
  formik,
  isMobile,
  count,
}: formProps) {
  const [maxYear, setMaxYear] = useState<Dayjs | null>(null)
  const [isCurrentlyIncompany, setIsCurrentlyIncompany] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCurrentlyIncompany(checked);
  };

  return (
    <Section height="unset">
      <Section margin="0 0 1rem">
        <Flex align="center" gap="0.25rem">
          <Text
            type="p"
            text={`Company Name ${count + 1}`}
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Required />
        </Flex>
        <FieldInput
          formik={formik}
          name={`employments.${count}.companyName`}
          placeholder="Enter your Company's name"
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
              text="Job Title"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`employments.${count}.jobTitle`}
            placeholder="Enter your Job Position"
          />
        </Section>
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Employment Type"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldString
            placeholder="Select Employment Type"
            name={`employments.${count}.employmentType`}
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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`employments.${count}.companyLocation`}
            placeholder="Enter Location"
          />
        </Section>
        <Section>
          <Text
            type="p"
            text="Location Type"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldString
            placeholder="Select Location Type"
            name={`employments.${count}.locationType`}
            options={["On-site", "Hybrid", "Remote"]}
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
          <Text
            type="p"
            text="Start Date"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldAsDate
            placeholder="Select your Start Year"
            views={["year"]}
            name={`employments.${count}.startedYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(
                `employments.${count}.startedYear`,
                `${e.$y}`
              );
              setMaxYear(dayjs(e))
            }}
            maxDate={dayjs(new Date())}
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
            disabled={isCurrentlyIncompany || maxYear === null}
            views={["year"]}
            name={`employments.${count}.endedYear`}
            formik={formik}
            onChange={(e: any) => {
              formik.setFieldValue(`employments.${count}.endedYear`, `${e.$y}`);
            }}
            minDate={maxYear}
            maxDate={dayjs(new Date())}
          />
        </Section>
      </Flex>
      <Flex
        align="center"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "0.25rem"}
      >
        <CheckBox
          checked={isCurrentlyIncompany}
          onChange={handleCheckboxChange}
        >
          <Text type="p" text="I am currently working in this role" />
        </CheckBox>
      </Flex>
    </Section>
  );
}
