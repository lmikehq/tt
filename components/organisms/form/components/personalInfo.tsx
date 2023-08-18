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
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import { IoIosArrowDown } from "react-icons/io";
import { useScreenResolution } from "hook/useScreenResolution";
import Required from "@atom/required";
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import EnlargedDate from "@atom/enlargedDate";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextArea from "@atom/textArea";
import { CustomRadioGroup } from "@atom/radio";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
  const { isMobile } = useScreenResolution();
  const [value, setValue] = useState("");
  const [radio, setRadio] = useState("");

  //  const handleSelectionChange = (selectedValue) => {
  //    // Do something with the selected value
  //    console.log("Selected value:", selectedValue);
  //  };

  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

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
              country={"ng"}
              value={value}
              autoFormat={true}
              onChange={(e) => setValue(e)}
              inputClass="w"
              placeholder="Enter phone number"
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
          margin={isMobile ? "0px" : "0 0 1rem"}
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section width="100%">
            <Text
              type="p"
              text="Issue Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker label="Select your issue date" />
              </EnlargedDate>
            </LocalizationProvider>
          </Section>
          <Section>
            <Text
              type="p"
              text="Expiry Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker
                  label="Select the Expiry Date"
                  value={formik?.values.endDate}
                  onChange={(e) => formik?.setFieldValue("endDate", e)}
                />
              </EnlargedDate>
            </LocalizationProvider>
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
            <SearchInput
              value={formik.values.homeCountry}
              placeholder="Select your country of citizenship"
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              height="8px"
              onChange={(x) => formik.setFieldValue("homeCountry", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.homeCountry?.name}
                  color="#1C1B1F"
                  weight={100}
                  size={isMobile ? 14 : 16}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values?.homeCountry?.name ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInput>
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Place of Birth (Country & State)"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <SearchInput
              value={formik.values.placeOfOrigin}
              placeholder="Select your country of birth"
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              height="8px"
              onChange={(x) => formik.setFieldValue("placeOfOrigin", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.placeOfOrigin?.name}
                  color="#1C1B1F"
                  weight={100}
                  size={isMobile ? 14 : 16}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values?.placeOfOrigin?.name ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInput>
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
            <SearchInput
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              height="8px"
              value={formik.values.issuingCountry}
              placeholder="Select the country"
              onChange={(x) => formik.setFieldValue("issuingCountry", x)}
            >
              <Flex justify="space-between">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text={formik?.values?.issuingCountry?.name}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values?.issuingCountry?.name ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInput>
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
              text="Issue Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker label="Select your issue date" />
              </EnlargedDate>
            </LocalizationProvider>
          </Section>
          <Section>
            <Text
              type="p"
              text="Expiry Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <EnlargedDate>
                <DatePicker
                  label="Select your expire date "
                  value={formik?.values.endDate}
                  onChange={(e) => formik?.setFieldValue("endDate", e)}
                />
              </EnlargedDate>
            </LocalizationProvider>
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Main Purpose of your Trip"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <TextArea />
        </Section>

        <Section>
          <Text
            type="h2"
            text="Background Information"
            weight={600}
            size={24}
            margin="4rem 0 .5rem"
            styles={{
              lineHeight: "29.26px",
            }}
          />
        </Section>
        <Section>
          <ol>
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Within the past two years, have you or a family member ever had tuberculosis of the lungs or been in close contact with a person with tuberculosis?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Do you have any physical or mental disorder that would require social and/or health services, other than medication, during a stay in Canada?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <Section>
              <Text
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <TextArea />
            </Section>
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Have you ever remained beyond the validity of your status, attended school without authorization or worked without authorization in Canada?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Have you ever been refused a visa or permit, denied entry or ordered to leave Canada or any other Country?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Have you previously applied to enter or remain in Canada?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <Section>
              <Text
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <TextArea />
            </Section>

            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Have you ever committed, been arrested for, been charged with or convicted of any criminal offense?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <Section>
              <Text
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <TextArea />
            </Section>

            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Are you, or have you ever been a member or associated with any political party, or other group or organization which has engaged in or advocated violence as a means to achieving a political or religious objective, or which has been associated with criminal activity at any time?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={18}
                  type="p"
                  text="Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of religious buildings?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setRadio(e)}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>

            <Section>
              <Text
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <TextArea />
            </Section>
          </ol>
        </Section>
      </form>
    </Section>
  );
}

export default PersonalInfo;
