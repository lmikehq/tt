import Flex from "@atom/flex";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Input from "@atom/input";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EducationAndEmploymentInfo({ formik, steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <Flex align="center" gap=".5rem" margin="2rem 0">
          <FaCircle size={".4rem"} color={ttColors.salmon} />
          <Text type="p" text=" Include your most recent qualification" />
        </Flex>
        <>
          <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
            <Section>
              <Text type="p" text="Degree" margin="1rem 0 " />
              <SearchInputAsString
                options={DEGREES}
                onChange={(x) => formik.setFieldValue("degree", x)}
              >
                <Flex>
                  <Text
                    type="p"
                    text={formik?.values?.degree}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik.values.degree ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
            </Section>
            <Section>
              <Text type="p" text="Gradudated year" margin="1rem 0 " />
              <SearchInputAsString
                options={get100Years()}
                onChange={(x) => formik.setFieldValue("graudautionYear", x)}
              >
                <Flex justify="space-between">
                  <Text
                    type="p"
                    text={formik?.values?.graudautionYear}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik.values.graudautionYear ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
            </Section>
          </Flex>

          <Section margin="0 0 1rem">
            <Text type="p" text="School Name" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.schoolName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.schoolName}
              onChange={(x) =>
                formik.setFieldValue("schoolName", x.target.value)
              }
            />
          </Section>

          <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
            <Section>
              <Text type="p" text="Course of Study" margin="1rem 0 " />
              <SearchInputAsString
                options={COMMON_MAJORS}
                onChange={(x) => formik.setFieldValue("courseOfStudy", x)}
              >
                <Flex justify="space-between">
                  <Text
                    type="p"
                    text={formik?.values?.courseOfStudy}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik.values.courseOfStudy ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
            </Section>
            <Section>
              <Text type="p" text="Grade" margin="1rem 0 " />
              <Input
                addon={
                  formik?.values?.grade > 0 ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : undefined
                }
                type="number"
                max={5}
                min={0}
                value={formik.values.grade}
                onChange={(x) => {
                  let value = parseInt(x.target.value);
                  if (value > 5) value = 5;
                  if (value < 0) value = 0;
                  formik.setFieldValue("grade", value);
                }}
              />
            </Section>
          </Flex>
        </>
      </form>
    </Section>
  );
}

export default EducationAndEmploymentInfo;
