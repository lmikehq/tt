import CheckBox from "@atom/checkbox";
import EnlargedDate from "@atom/enlargedDate";
import Flex from "@atom/flex";
import Input from "@atom/input";
import Required from "@atom/required";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { concatArrays, get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

interface formProps {
  formik?: FormikValues;
  isMobile?: boolean;
  count?: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function EmploymentForm({ formik, isMobile, count }: formProps) {
  const [isCurrentlyIncompany, setIsCurrentlyIncompany] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCurrentlyIncompany(checked);
  };

  return (
    <Section height="unset">
      <form>
        <Section styles={{ margin: "2.5rem 0 1rem" }}>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Company Name ${count}`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <Input
            addon={
              formik?.values?.companyName?.length > 3 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik?.values.companyName}
            onChange={(x) =>
              formik?.setFieldValue("companyName", x.target.value)
            }
            placeholder="Enter your company's name"
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
            <Input
              addon={
                formik?.values?.jobTitle?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.jobTitle}
              onChange={(x) =>
                formik?.setFieldValue("jobTitle", x.target.value)
              }
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
            <SearchInputAsString
              options={COMMON_MAJORS}
              onChange={(x) => formik?.setFieldValue("employmentType", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.employmentType}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values.employmentType ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
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
            <Input
              addon={
                formik?.values?.companyLocation?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.companyLocation}
              onChange={(x) =>
                formik?.setFieldValue("companyLocation", x.target.value)
              }
              placeholder="Enter Location"
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Location Type"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              options={["On-site", "Remote", "Hybrid"]}
              onChange={(x) => formik?.setFieldValue("locationType", x)}
            >
              <Flex justify="space-between">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text={formik?.values?.locationType}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values?.locationType ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker label="Select your start date" />
              </EnlargedDate>
            </LocalizationProvider>
          </Section>
          <Section>
            <Text
              type="p"
              text="End Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker
                  label={
                    isCurrentlyIncompany ? "Present" : "Select your date here"
                  }
                  value={formik?.values.endDate}
                  onChange={(e) => formik?.setFieldValue("endDate", e)}
                  disabled={isCurrentlyIncompany}
                  disableOpenPicker={isCurrentlyIncompany}
                />
              </EnlargedDate>
            </LocalizationProvider>
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
      </form>
    </Section>
  );
}
