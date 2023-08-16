import Flex from "@atom/flex";
import Input from "@atom/input";
import Required from "@atom/required";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { concatArrays, get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { ttColors } from "theme/colors";

interface formProps {
  formik?: FormikValues;
  isMobile?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function EducationForm({ formik, isMobile }: formProps) {
  return (
    <Section height="unset">
      <form>
      <Section margin="0 0 1rem">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="School Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required/>
          </Flex>
          <Input
            height="40px"
            addon={
              formik?.values?.schoolName?.length > 3 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik?.values.schoolName}
            onChange={(x) => formik?.setFieldValue("schoolName", x.target.value)}
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
              <Required/>
            </Flex>
            <SearchInputAsString
              height="8px"
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
            <Text
              type="p"
              text="Gradudated year"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              height="8px"
              options={concatArrays(["Present"], get100Years())}
              onChange={(x) => formik?.setFieldValue("graudautionYear", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.graudautionYear}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values.graudautionYear ? (
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
              height="8px"
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
              text="Grade"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height="40px"
              addon={
                formik?.values?.grade > 0 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              type="number"
              max={5}
              min={0}
              value={formik?.values.grade}
              onChange={(x) => {
                let value = parseFloat(x.target.value);
                if (value > 5) value = 5;
                if (value < 0) value = 0;
                formik?.setFieldValue("grade", value);
              }}
            />
          </Section>
        </Flex>
      </form>
    </Section>
  );
}
