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
import Required from "@atom/required";
import { InputAdornment, TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [value, setValue] = useState();

  return (
    <Section width={isMobile ? "100%" : "75%"}>
      <FormStepTitle steps={steps} index={index} />
      <form>
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Last Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.lastName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              placeholder="Enter Last Name"
              value={formik.values.lastName}
              onChange={(x) => formik.setFieldValue("lastName", x.target.value)}
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="First Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.firstName?.length > 5 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.firstName}
              placeholder="Enter First Name"
              onChange={(x) =>
                formik.setFieldValue("firstName", x.target.value)
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Middle Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.placeOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              placeholder="Enter Middle Name"
              value={formik.values.MiddleName}
              onChange={(x) =>
                formik.setFieldValue("placeOfOrigin", x.target.value)
              }
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="State of Origin"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.stateOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              placeholder="Select your State of Origin"
              value={formik.values.stateOfOrigin}
              onChange={(x) =>
                formik.setFieldValue("stateOfOrigin", x.target.value)
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="LG. of Origin"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.lgOfOrigin?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              placeholder="Select your LG of origin"
              value={formik.values.lgOfOrigin}
              onChange={(x) =>
                formik.setFieldValue("lgOfOrigin", x.target.value)
              }
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Native Language"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              value={formik.values.nativeLanguage}
              placeholder="Enter your native language"
              onChange={(x) =>
                formik.setFieldValue("nativeLanguage", x.target.value)
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Email Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                validateEmail(formik?.values?.email) ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.email}
              placeholder="Enter your e-mail address"
              onChange={(x) => formik.setFieldValue("email", x.target.value)}
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Phone Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>

            <PhoneInput
              style={{ height: "40px" }}
              country={"ng"}
              value={value}
              autoFormat={true}
              onChange={setValue}
              inputClass="w"
              placeholder="Enter phone number"
            />
            {/* <Input
             height="40px"
              addon={
                validateEmail(formik?.values?.email) ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              max={11}
              value={formik.values.phoneNumber}
              placeholder="Enter your phone Number"
              onChange={(x) => formik.setFieldValue("phoneNumber", x.target.value)}
            /> */}
          </Section>
        </Flex>

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
                text="Means of ID"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
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
              height="8px"
              placeholder="Select your means of ID"
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
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="ID Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.idNumber?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              placeholder="Enter your ID number"
              value={formik.values.idNumber}
              onChange={(x) => formik.setFieldValue("idNumber", x.target.value)}
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Country of Citizenship"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
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
              height="8px"
              placeholder="Select your means of ID"
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
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Place of Birth ( Country & State)"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
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
              height="8px"
              placeholder="Select your means of ID"
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
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Residential Address"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <Required />
          </Flex>
          <Input
            height="40px"
            addon={
              formik?.values?.residentialAddress?.length > 2 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            type="address"
            value={formik.values.residentialAddress}
            placeholder="Enter your residential address"
            onChange={(x) =>
              formik.setFieldValue("residentialAddress", x.target.value)
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
                text="Marital Status"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
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
              height="8px"
              placeholder="Select your marital status"
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
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Partner’s Name (if applicable)"
                margin={isMobile ? ".5rem 0" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.partnersName?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.partnersName}
              onChange={(x) =>
                formik.setFieldValue("partnersName", x.target.value)
              }
              placeholder="Enter your partner's name"
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
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Passport Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              value={formik.values.passportNumber}
              onChange={(x) =>
                formik.setFieldValue("passportNumber", x.target.value)
              }
              placeholder="Enter your Passport Number"
            />
          </Section>

          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Issued Country"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <SearchInputAsString
              options={[
                "Nigeria",
                // "Married",
                // "Divorced",
                // "Widowed",
                // "Separated",
                // "Annulled",
                // "Domestic Partnership/Civil Union",
                // "Common-Law Marriage",
                // "Registered Partnership",
                // "Cohabiting",
                // "Remarried",
              ]}
              height="8px"
              placeholder="Select the country"
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
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

       

        <Section>
          <Text
            type="p"
            text="Main Purpose of your Trip"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <TextField
            inputProps={{
              maxLength: 250,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  Max 250 characters
                </InputAdornment>
              ),
            }}
            rows={8}
            fullWidth
          />
        </Section>
      </form>
    </Section>
  );
}

export default PersonalInfo;
