import Flex from "@atom/flex";
import Input from "@atom/input";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { concatArrays, get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function EducationAndEmploymentInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <>
          <Flex align="center" gap=".5rem" margin="0rem 0">
            <FaCircle size={".4rem"} color={ttColors.salmon} />
            <Text type="p" text=" Include your most recent qualification" size={14}/>
          </Flex>
          <Flex
            margin="0 0 1rem"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
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
                options={concatArrays(["Present"], get100Years())}
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

          <Flex
            margin={isMobile ? "0px" : "0 0 1rem"}
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
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
                  let value = parseFloat(x.target.value);
                  if (value > 5) value = 5;
                  if (value < 0) value = 0;
                  formik.setFieldValue("grade", value);
                }}
              />
            </Section>
          </Flex>
        </>

        <>
          <Flex align="center" gap=".5rem" margin="1rem 0">
            <FaCircle size={".4rem"} color={ttColors.salmon} />
            <Text
              type="p"
              text=" Include your most recent employment details"
              size={13.5}
            />
          </Flex>
          <Section>
            <Text type="p" text="Company Name and location" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.companyName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.companyName}
              onChange={(x) =>
                formik.setFieldValue("companyName", x.target.value)
              }
            />
          </Section>
          <Flex
            margin={isMobile ? "0px" : "0 0 1rem"}
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin={isMobile ? "0px" : "0 0 1rem"}>
              <Text type="p" text="Employer’s Name" margin="1rem 0 " />
              <Input
                addon={
                  formik?.values?.employerName?.length > 3 ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : undefined
                }
                value={formik.values.employerName}
                onChange={(x) =>
                  formik.setFieldValue("employerName", x.target.value)
                }
              />
            </Section>
            <Section margin={isMobile ? "0px" : "0 0 1rem"}>
              <Text type="p" text="Employer’s  phone" margin="1rem 0 " />
              <Input
                addon={
                  formik?.values?.employerPhone?.length > 3 ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : undefined
                }
                value={formik.values.employerPhone}
                onChange={(x) =>
                  formik.setFieldValue("employerPhone", x.target.value)
                }
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
              <Text type="p" text="Started Year" margin="1rem 0 " />
              <SearchInputAsString
                options={get100Years()}
                onChange={(x) => formik.setFieldValue("startedYear", x)}
              >
                <Flex justify="space-between">
                  <Text
                    type="p"
                    text={formik?.values?.startedYear}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik.values.startedYear ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
            </Section>
            <Section>
              <Text type="p" text="Ended year" margin="1rem 0 " />
              <SearchInputAsString
                options={concatArrays(["Present"], get100Years())}
                onChange={(x) => formik.setFieldValue("endedYear", x)}
              >
                <Flex justify="space-between">
                  <Text
                    type="p"
                    text={formik?.values?.endedYear}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik.values.endedYear ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
            </Section>
          </Flex>
        </>
      </form>
    </Section>
  );
}

export default EducationAndEmploymentInfo;
