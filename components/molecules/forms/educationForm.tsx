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

export default function EducationForm({ formik, isMobile, count }: formProps) {
  const [isCurrentlyInSchool, setIsCurrentlyInSchool] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCurrentlyInSchool(checked);
  };

  return (
    <Section height="unset">
      <form>
        <Section margin="0 0 1rem" styles={{margin: "2.5rem 0 1rem"}}>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`School Name ${count}`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <Input
            addon={
              formik?.values?.schoolName?.length > 3 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik?.values.schoolName}
            onChange={(x) =>
              formik?.setFieldValue("schoolName", x.target.value)
            }
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
            <SearchInputAsString
              options={DEGREES}
              onChange={(x) => formik?.setFieldValue("degree", x)}
            >
              <Flex>
                <Text
                  type="p"
                  text={formik?.values?.degree}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values.degree ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Field of Study"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <SearchInputAsString
              options={COMMON_MAJORS}
              onChange={(x) => formik?.setFieldValue("courseOfStudy", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.courseOfStudy}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values.courseOfStudy ? (
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
              text="Course of Study"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              options={COMMON_MAJORS}
              onChange={(x) => formik?.setFieldValue("courseOfStudy", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.courseOfStudy}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values.courseOfStudy ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text
              type="p"
              text="School's Location"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              type="text"
              value={formik?.values.schoolLocation}
              placeholder="Enter Location"
              onChange={(e) => formik?.setFieldValue("schoolLocation", e)}
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
                    isCurrentlyInSchool ? "Present" : "Select your date here"
                  }
                  value={formik?.values.endDate}
                  onChange={(e) => formik?.setFieldValue("endDate", e)}
                  disabled={isCurrentlyInSchool}
                  disableOpenPicker={isCurrentlyInSchool}
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
