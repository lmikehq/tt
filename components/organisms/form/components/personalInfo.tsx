import Flex from "@atom/flex";
import Input from "@atom/input";
import Text from "@atom/text";
import { validateEmail } from "@lib/utilFns";
import Section from "@molecule/section";
import { FormikValues } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { SearchInputAsString } from "@atom/searchInput";
import { IoIosArrowDown } from "react-icons/io";
import { useScreenResolution } from "hook/useScreenResolution";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  
  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "1rem 0" }}>
        <Flex align="center" gap=".5rem" margin="1rem 0 0">
          <FaCircle size={".4rem"} color={ttColors.salmon} />
          <Text
            type="p"
            text=" Your name as it appears on your passport"
            size={isMobile ? "15px" : "16px"}
          />
        </Flex>
        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="First and Middle Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.firstName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.firstName}
              onChange={(x) =>
                formik.setFieldValue("firstName", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Last Name"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.lastName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.lastName}
              onChange={(x) => formik.setFieldValue("lastName", x.target.value)}
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Email Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Input
            height={isMobile ? "33px" : "40px"}
            addon={
              validateEmail(formik?.values?.email) ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.email}
            onChange={(x) => formik.setFieldValue("email", x.target.value)}
          />
        </Section>

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Place of Origin"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.placeOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.placeOfOrigin}
              onChange={(x) =>
                formik.setFieldValue("placeOfOrigin", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="State of Origin"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.stateOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.stateOfOrigin}
              onChange={(x) =>
                formik.setFieldValue("stateOfOrigin", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="LG. of Origin"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Input
            height={isMobile ? "33px" : "40px"}
            addon={
              formik?.values?.lgOfOrigin?.length > 2 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.lgOfOrigin}
            onChange={(x) => formik.setFieldValue("lgOfOrigin", x.target.value)}
          />
        </Section>

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Means of ID"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              options={[
                "Passport",
                "National ID Card",
                "Driver's License",
                "Social Security Card",
                "Birth Certificate",
                "Voter ID Card",
                "Military ID Card",
                "Resident Permit/Visa",
                "Health Insurance Card",
              ]}
              height={isMobile ? "0px" : "8px"}
              onChange={(x) => formik.setFieldValue("meansOfId", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.meansOfId}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.meansOfId ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
                {/* sdfsdf */}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text
              type="p"
              text="ID Number"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.idNumber?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.idNumber}
              onChange={(x) => formik.setFieldValue("idNumber", x.target.value)}
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Residential Address"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <Input
            height={isMobile ? "33px" : "40px"}
            addon={
              formik?.values?.residentialAddress?.length > 2 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            type="address"
            value={formik.values.residentialAddress}
            onChange={(x) =>
              formik.setFieldValue("residentialAddress", x.target.value)
            }
          />
        </Section>
        {/* <Section>
          <Text type="p" text="How can we  locate you?" margin={ isMobile ? ".2rem 0" : "1rem 0"} />
          <Input
            addon={
              formik?.values?.howCanWeLocateYou?.length > 2 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.howCanWeLocateYou}
            onChange={(x) =>
              formik.setFieldValue("howCanWeLocateYou", x.target.value)
            }
          />
        </Section> */}

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Marital Status"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchInputAsString
              options={[
                "Single",
                "Married",
                "Divorced",
                "Widowed",
                "Separated",
                "Annulled",
                "Domestic Partnership/Civil Union",
                "Common-Law Marriage",
                "Registered Partnership",
                "Cohabiting",
                "Remarried",
              ]}
              height={isMobile ? "0px" : "8px"}
              onChange={(x) => formik.setFieldValue("maritalStatus", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.maritalStatus}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.maritalStatus ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
                {/* sdfsdf */}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text
              type="p"
              text="Partner’s Name (if applicable)"
              margin={isMobile ? ".5rem 0" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.partnersName?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.partnersName}
              onChange={(x) =>
                formik.setFieldValue("partnersName", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Flex
          margin="0 0 1rem"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Text
              type="p"
              text="Facebook username"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.facebookUsername?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.facebookUsername}
              onChange={(x) =>
                formik.setFieldValue("facebookUsername", x.target.value)
              }
            />
          </Section>{" "}
          <Section>
            <Text
              type="p"
              text="Linkedin/Instagram username"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Input
              height={isMobile ? "33px" : "40px"}
              addon={
                formik?.values?.linkedinOrInstagram?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.linkedinOrInstagram}
              onChange={(x) =>
                formik.setFieldValue("linkedinOrInstagram", x.target.value)
              }
            />
          </Section>
        </Flex>
      </form>
    </Section>
  );
}

export default PersonalInfo;
