import Flex from "@atom/flex";
import Input from "@atom/input";
import Text from "@atom/text";
import { get100Years, validateEmail } from "@lib/utilFns";
import Section from "@molecule/section";
import { FormikValues } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import { COUNTRY_FLAGS } from "data/data";
import { IoIosArrowDown } from "react-icons/io";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function OtherInformation({ formik, steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Passport Number" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.passNumber?.length > 8 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.passNumber}
              onChange={(x) =>
                formik.setFieldValue("passNumber", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Passport issued country" margin="1rem 0 " />
            <SearchInputAsString
              options={COUNTRY_FLAGS.map((x) => x.name)}
              onChange={(x) => formik.setFieldValue("passIssueCountry", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.passIssueCountry}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.passIssueCountry ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Year of Issue" margin="1rem 0 " />
            <SearchInputAsString
              options={get100Years()}
              onChange={(x) => formik.setFieldValue("yearOfIssue", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.yearOfIssue}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.yearOfIssue ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text type="p" text="Gender" margin="1rem 0 " />
            <SearchInputAsString
              options={["Male", "Female", "Other"]}
              onChange={(x) => formik.setFieldValue("gender", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.gender}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.gender ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Text
          type="p"
          text="Your guarantor’s information"
          size="1.4rem"
          margin="2rem 0"
        />

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Guarantor’s Name" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorName}
              onChange={(x) =>
                formik.setFieldValue("guarantorName", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Relationship to you" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorRelationship?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorRelationship}
              onChange={(x) =>
                formik.setFieldValue("guarantorRelationship", x.target.value)
              }
            />
          </Section>
        </Flex>
      </form>
    </Section>
  );
}

export default OtherInformation;
