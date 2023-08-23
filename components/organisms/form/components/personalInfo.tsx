import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { useFormik } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "hook/useScreenResolution";
import Required from "@atom/required";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import TextArea from "@atom/textArea";
import { CustomRadioGroup } from "@atom/radio";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { personalInfoKeys, personalInfoSchema } from "@lib/application/schema";
import {
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "@atom/fieldInput";
import { SingleFormType } from "../applicationForm";
import { PersonalInfoInterface } from "types";
import ContinueButton from "@atom/continueButton";
import dayjs, { Dayjs } from "dayjs";
import useFormikLocalStorage from "hook/useFormikLocalStorage";

interface formProps {
  steps: string[];
  index: number;
  nextStep: ({ form }: { form: SingleFormType }) => void;
  isLoading: boolean;
}

function PersonalInfo({ steps, index, nextStep, isLoading }: formProps) {
  const { isMobile } = useScreenResolution();
  const [disabled, setDisabled] = useState(true);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [passEndDate, setPassEndDate] = useState<Dayjs | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [showPassDate, setShowPassDate] = useState(false)

  const MeansId = [
    "National ID Card",
    "Social Security Card",
    "Birth Certificate",
    "Voter ID Card",
    "International Passport"
  ]

  const [value, setValue] = useState("");
  const [radio, setRadio] = useState("");
  const [formData, setFormData] = useState({
    disability: '', entry: '', criminal: '',
    looting: ''
  })
  const formik = useFormik({
    initialValues: personalInfoKeys,
    validationSchema: personalInfoSchema,
    onSubmit: (values: PersonalInfoInterface) => {
      nextStep({ form: values });
      setDisabled(false);
    },
  });

  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const { updateFieldValue } = useFormikLocalStorage(formik, personalInfoKeys);

  useEffect(() => {
    setShowDate(MeansId.some((item) => item === formik.values.meansOfId)) 
    setShowPassDate(formik.values.meansOfId === MeansId[4])
  }, [formik.values.meansOfId])

  return (
    <Section>
      <FormStepTitle steps={steps} index={index} padding="0 0 2rem 0" />
      <form onSubmit={formik.handleSubmit}>
        <Flex
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Last Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Middle Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="LG. of Origin"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Email Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Means of ID"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <Required />
            </Flex>
            <FieldString
              options={[
                "National Passport",
                "International Passport",
                "National ID Card",
                "Driver's License",
                "Social Security Card",
                "Birth Certificate",
                "Voter ID Card",
                "Military ID Card",
                "Resident Permit/Visa",
                "Health Insurance Card",
              ]}
              placeholder="Select your means of ID"
              name="meansOfId"
              formik={formik}
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="ID Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
        {!showDate && (
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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <FieldAsDate
              name="issueDate"
              placeholder="Select your Issue Date"
              formik={formik}
              onChange={(e: any) => {
                updateFieldValue(`issueDate`, `${e}`);
                setEndDate(dayjs(e));
              }}
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Expiry Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <FieldAsDate
              name="expiryDate"
              placeholder="Select the Expiry Date"
              formik={formik}
              minDate={endDate}
              disabled={endDate === null}
            />
          </Section>
        </Flex>
        )}
        <Flex
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Country of Citizenship"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <Required />
            </Flex>
            <FieldAsString
              formik={formik}
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              name="homeCountry"
              placeholder="Select your country of citizenship"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Place of Birth (Country & State)"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <Required />
            </Flex>
            <FieldAsString
              formik={formik}
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              name="placeOfOrigin"
              placeholder="Select your country  of birth"
            />
          </Section>
        </Flex>
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Residential Address"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Marital Status"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <Required />
            </Flex>
            <FieldString
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
              placeholder="Select your marital status"
              name="maritalStatus"
              formik={formik}
            />
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
          margin="0"
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Passport Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <Required />
            </Flex>
            <FieldAsString
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              formik={formik}
              name="issuingCountry"
              placeholder="Select the country"
            />
          </Section>
        </Flex>
        {showPassDate && (
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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <FieldAsDate
              name="passportIssueDate"
              placeholder="Select your Issued Date"
              formik={formik}
              onChange={(e: any) => {
                updateFieldValue("passportIssueDate", e);
                setPassEndDate(e);
              }}
            />
          </Section>
          <Section>
            <Text
              type="p"
              text="Expiry Date"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <FieldAsDate
              name="passportExpiryDate"
              placeholder="Select your Expiry Date"
              formik={formik}
              disabled={passEndDate === null}
              minDate={passEndDate}
            />
          </Section>
        </Flex>
        )}
        <Section>
          <Text
            type="p"
            text="Main Purpose of your Trip"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
          />
          <TextArea
            onChange={(e: any) => {
              formik.setFieldValue("purposeOfTrip", e.target.value);
            }}
          />
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
                  size={16}
                  weight={400}
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
                  size={16}
                  weight={400}
                  type="p"
                  text="Do you have any physical or mental disorder that would require social and/or health services, other than medication, during a stay in Canada?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <CustomRadioGroup
                  name="disability"
                  options={options}
                  onChange={(e) => setFormData((prev) => ({...prev, disability: e}))}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>
            {formData.disability === "Yes" && (
              <Section>
              <Text
                size={16}
                weight={300}
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <TextArea />
            </Section>
            )}
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={16}
                  weight={400}
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
                  size={16}
                  weight={400}
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
                  size={16}
                  weight={400}
                  type="p"
                  text="Have you previously applied to enter or remain in Canada?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setFormData((prev) => ({...prev, entry: e}))}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>
            {formData.entry === "Yes" && (
              <Section>
              <Text
                size={16}
                weight={300}
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <TextArea />
            </Section>
            )}
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={16}
                  weight={400}
                  type="p"
                  text="Have you ever committed, been arrested for, been charged with or convicted of any criminal offense?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setFormData((prev) => ({...prev, criminal: e}))}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>
            {formData.criminal === "Yes" && (
              <Section>
              <Text
                size={16}
                weight={300}
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <TextArea />
            </Section>
            )}
            <li>
              <Flex align="center" gap="2rem" justify="space-between">
                <Text
                  styles={{
                    width: "65%",
                    justifyContent: "flex-start",
                  }}
                  size={16}
                  weight={400}
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
                  size={16}
                  weight={400}
                  type="p"
                  text="Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of religious buildings?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />

                <CustomRadioGroup
                  defaultValue=""
                  options={options}
                  onChange={(e) => setFormData((prev) => ({...prev, looting: e}))}
                  justifyContent="flex-end"
                />
              </Flex>
            </li>
            {formData.looting === "Yes" && (
              <Section>
              <Text
                size={16}
                weight={300}
                type="p"
                text="If you answered “yes”, please provide details"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
              />
              <TextArea />
            </Section>
            )}
          </ol>
        </Section>
        <ContinueButton isLoading={isLoading} disabled={disabled} />
      </form>
    </Section>
  );
}

export default PersonalInfo;
