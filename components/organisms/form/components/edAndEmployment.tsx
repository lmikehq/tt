import Flex from "@atom/flex";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { IoIosArrowDown } from "react-icons/io";

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
        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Qualification" margin="1rem 0 " />
            <SearchInputAsString
              options={DEGREES}
              onChange={(x) => formik.setFieldValue("home", x)}
            >
              <Text
                type="p"
                text={formik?.values?.home?.name}
                color="#1C1B1F"
                weight={100}
                styles={{ cursor: "pointer" }}
              />
            </SearchInputAsString>
          </Section>
          <Section>
            <Text type="p" text="Gradudated year" margin="1rem 0 " />
            <SearchInputAsString
              options={get100Years()}
              onChange={(x) => formik.setFieldValue("home", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.home?.name}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                <IoIosArrowDown size={20} />
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Section margin="0 0 1rem">
          <Text type="p" text="School Name" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("destination", x)}
          >
            <Flex justify="space-between">
              <Text
                type="p"
                text={formik?.values?.destination?.name}
                color="#1C1B1F"
                weight={100}
                styles={{ cursor: "pointer" }}
              />
              <IoIosArrowDown size={20} />
            </Flex>
          </SearchInput>
        </Section>

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Course of Study" margin="1rem 0 " />
            <SearchInputAsString
              options={DEGREES}
              onChange={(x) => formik.setFieldValue("home", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.home?.name}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                <IoIosArrowDown size={20} />
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text type="p" text="Grade" margin="1rem 0 " />
            <SearchInputAsString
              options={get100Years()}
              onChange={(x) => formik.setFieldValue("home", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.home?.name}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                <IoIosArrowDown size={20} />
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>
      </form>
    </Section>
  );
}

export default EducationAndEmploymentInfo;
