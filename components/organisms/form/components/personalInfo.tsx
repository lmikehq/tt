import Flex from "@atom/flex";
import Text from "@atom/text";
import { validateEmail } from "@lib/utilFns";
import Section from "@molecule/section";
import { Formik, FormikProps, FormikValues } from "formik";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import FormStepTitle from "./formStepsTitle";
import { IoIosArrowDown } from "react-icons/io";
import { useScreenResolution } from "hook/useScreenResolution";
import Required from "@atom/required";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import EnlargedDate from "@atom/enlargedDate";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextArea from "@atom/textArea";
import { CustomRadioGroup } from "@atom/radio";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { personalInfoKeys, personalInfoSchema } from "@lib/application/schema";
import useFormikLocalStorage from "hook/useFormikLocalStorage";
import { FieldInput } from "@atom/fieldInput";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
  const initialValues = { ...personalInfoKeys };

  const { updateFieldValue } = useFormikLocalStorage(formik, initialValues);

  const { isMobile } = useScreenResolution();
  const [value, setValue] = useState("");
  const [radio, setRadio] = useState("");

  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  return (
    <Section width={isMobile ? "100%" : "75%"}>
      <FormStepTitle steps={steps} index={index} />
      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <form>
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
              <FieldInput
                name="lastName"
                placeholder="Enter Last Name"
                formik={formik}
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
              <FieldInput
                name="firstName"
                placeholder="Enter First Name"
                formik={formik}
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
              <FieldInput
                name="middleName"
                placeholder="Enter Middle Name"
                formik={formik}
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
              <FieldInput
                name="stateOfOrigin"
                placeholder="Select your State of Origin"
                formik={formik}
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
              <FieldInput
                name="lgOfOrigin"
                placeholder="Select your LG of origin"
                formik={formik}
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
              <FieldInput
                name="nativeLanguage"
                formik={formik}
                placeholder="Enter your native language"
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
              <FieldInput
                name="email"
                formik={formik}
                placeholder="Enter your e-mail address"
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
                height="18px"
                placeholder="Select your means of ID"
                onChange={(x) => updateFieldValue("meansOfId", x)}
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
              <FieldInput
                name="idNumber"
                placeholder="Enter your ID number"
                formik={formik}
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
                  <DatePicker
                    label="Select your issue date"
                    value={formik?.values.issueDate}
                    onChange={(e) => updateFieldValue("issueDate", e)}
                  />
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
                    // placeholder="Select the Expiry Date"
                    value={formik?.values.expiryDate}
                    onChange={(e) => formik?.setFieldValue("expiryDate", e)}
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
                value={formik?.values.homeCountry}
                placeholder="Select your country of citizenship"
                options={COUNTRY_FLAGS.map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                height="18px"
                onChange={(x) => updateFieldValue("homeCountry", x)}
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
                height="18px"
                onChange={(x) => updateFieldValue("placeOfOrigin", x)}
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
            <FieldInput
              name="residentialAddress"
              type="address"
              formik={formik}
              placeholder="Enter your residential address"
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
                height="18px"
                placeholder="Select your marital status"
                onChange={(x) => updateFieldValue("maritalStatus", x)}
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
              <FieldInput
                name="partnersName"
                formik={formik}
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
              <FieldInput
                name="passportNumber"
                formik={formik}
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
                height="18px"
                placeholder="Select the country"
                value={formik.values.issuingCountry}
                onChange={(x) => updateFieldValue("issuingCountry", x)}
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
                text="Issued Date"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <EnlargedDate>
                  <DatePicker
                    label="Select your Issued Date"
                    value={formik?.values.passportIssueDate}
                    onChange={(e) => updateFieldValue("passportIssueDate", e)}
                  />
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
                    label="Select your Expiry Date"
                    value={formik?.values.passportExpiryDate}
                    onChange={(e) =>
                      formik?.setFieldValue("passportExpiryDate", e)
                    }
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
      </Formik>
    </Section>
  );
}

export default PersonalInfo;
