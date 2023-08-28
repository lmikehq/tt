import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { FormikProps, useFormik } from "formik";
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
  ErrorText,
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "@atom/fieldInput";
import { SingleFormType } from "../applicationForm";
import { PersonalInfoInterface } from "types";
import ContinueButton from "@atom/continueButton";
import dayjs, { Dayjs } from "dayjs";

interface FormProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<PersonalInfoInterface>;
}

function PersonalInfo({ steps, index, isLoading, formik }: FormProps) {
  const { isMobile } = useScreenResolution();
  const options = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Required />
            </Flex>
            <FieldInput
              name="lgaOfOrigin"
              placeholder="Select your LG of origin"
              formik={formik}
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Native Language"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                text="Gender"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Required />
            </Flex>
            <FieldString
              formik={formik}
              name={"gender"}
              placeholder="Select your Gender"
              options={["Male", "Female"]}
            />
          </Section>
          <Section width="100%">
            <Text
              type="p"
              text="Date Of Birth"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <FieldAsDate
              name="dateOfBirth"
              placeholder="Select your Issue Date"
              formik={formik}
              // onChange={(e: any) => {
              //   setEndDate(dayjs(e));
              // }}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Required />
            </Flex>
            <PhoneInput
              country={"ng"}
              autoFormat={true}
              inputProps={{
                name: "phoneNumber",
              }}
              onChange={(e) => {
                console.log(e);
                formik.setFieldValue("phoneNumber", e);
              }}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              />
              <Required />
            </Flex>
            <FieldInput
              name="idNumber"
              placeholder="Enter your ID number"
              formik={formik}
              disabled={formik.values.meansOfId == "International Passport"}
            />
          </Section>
        </Flex>
        {formik.values.meansOfId && (
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
                // onChange={(e: any) => {
                //   setEndDate(dayjs(e));
                // }}
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
                minDate={dayjs(formik.values.issueDate)}
                disabled={!formik.values.issueDate}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
              name="countryOfCitizen"
              placeholder="Select your country of citizenship"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Place of Birth (Country & State)"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
              name="placeOfBirth"
              placeholder="Select your country  of birth"
            />
          </Section>
        </Flex>
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Residential Address"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            name="address"
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".5rem 0" : "1rem 0px 0.5rem"}
              />
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
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
              name="passportIssuedCountry"
              placeholder="Select the country"
            />
          </Section>
        </Flex>
        {formik.values.meansOfId == "International Passport" && (
          <Flex
            margin={isMobile ? "0px" : "0 0 1rem"}
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            {/* <Section width="100%">
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
                  setPassEndDate(e);
                }}
              />
            </Section> */}
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
                // disabled={formik.values === null}
                // minDate={passEndDate}
              />
            </Section>
          </Flex>
        )}

        <Section>
          <Text
            type="p"
            text="Main Purpose of your Trip"
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
          />
          <TextArea
            name="tripPurpose"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tripPurpose}
          />
          {formik.touched["tripPurpose"] && formik.errors["tripPurpose"] && (
            <ErrorText text={formik.errors["tripPurpose"]} />
          )}
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="tuberculosis"
                    value={formik.values.tuberculosis}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["tuberculosis"] &&
                    formik.errors["tuberculosis"] && (
                      <ErrorText text={formik.errors["tuberculosis"]} />
                    )}
                </Section>
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="mentalDisorder"
                    value={formik.values.mentalDisorder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["mentalDisorder"] &&
                    formik.errors["mentalDisorder"] && (
                      <ErrorText text={formik.errors["mentalDisorder"]} />
                    )}
                </Section>

                {/* 
                <CustomRadioGroup
                  
                  options={options}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, disability: e }))
                  }
                  justifyContent="flex-end"
                /> */}
              </Flex>
            </li>

            {`${formik.values.mentalDisorder}` == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                {/* <TextArea /> */}
                <TextArea
                  name="mentalDisorderDetails"
                  value={formik.values.mentalDisorderDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["mentalDisorderDetails"] &&
                  formik.errors["mentalDisorderDetails"] && (
                    <ErrorText text={formik.errors["mentalDisorderDetails"]} />
                  )}
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="remainbeyondValidity"
                    value={formik.values.remainbeyondValidity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["remainbeyondValidity"] &&
                    formik.errors["remainbeyondValidity"] && (
                      <ErrorText text={formik.errors["remainbeyondValidity"]} />
                    )}
                </Section>
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="refusedBefore"
                    value={formik.values.refusedBefore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["refusedBefore"] &&
                    formik.errors["refusedBefore"] && (
                      <ErrorText text={formik.errors["refusedBefore"]} />
                    )}
                </Section>
              </Flex>
            </li>
            {`${formik.values.refusedBefore}` == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />

                <TextArea
                  name="refusedBeforeDetails"
                  value={formik.values.refusedBeforeDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["refusedBeforeDetails"] &&
                  formik.errors["refusedBeforeDetails"] && (
                    <ErrorText text={formik.errors["refusedBeforeDetails"]} />
                  )}
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="arrestedBefore"
                    value={formik.values.arrestedBefore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["arrestedBefore"] &&
                    formik.errors["arrestedBefore"] && (
                      <ErrorText text={formik.errors["arrestedBefore"]} />
                    )}
                </Section>
              </Flex>
            </li>
            {`${formik.values.arrestedBefore}` == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />

                {/* <TextArea /> */}
                <TextArea
                  name="arrestedBeforeDetails"
                  value={formik.values.arrestedBeforeDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["arrestedBeforeDetails"] &&
                  formik.errors["arrestedBeforeDetails"] && (
                    <ErrorText text={formik.errors["arrestedBeforeDetails"]} />
                  )}
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
                  text="Did you serve in any military, militia, or defense unit or serve in a security organization or police force (including non-obligatory national service, reserve or volunteer units)?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="servedInMilitary"
                    value={formik.values.servedInMilitary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["servedInMilitary"] &&
                    formik.errors["servedInMilitary"] && (
                      <ErrorText text={formik.errors["servedInMilitary"]} />
                    )}
                </Section>
              </Flex>
            </li>
            {`${formik.values.servedInMilitary}` == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                <TextArea
                  name="servedInMilitaryDetails"
                  value={formik.values.servedInMilitaryDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["servedInMilitaryDetails"] &&
                  formik.errors["servedInMilitaryDetails"] && (
                    <ErrorText
                      text={formik.errors["servedInMilitaryDetails"]}
                    />
                  )}
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="memberOfViolentGroup"
                    value={formik.values.memberOfViolentGroup}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["memberOfViolentGroup"] &&
                    formik.errors["memberOfViolentGroup"] && (
                      <ErrorText text={formik.errors["memberOfViolentGroup"]} />
                    )}
                </Section>
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
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={options}
                    name="participatedInViolentActivities"
                    value={formik.values.participatedInViolentActivities}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    justifyContent="flex-end"
                  />

                  {formik.touched["participatedInViolentActivities"] &&
                    formik.errors["participatedInViolentActivities"] && (
                      <ErrorText
                        text={formik.errors["participatedInViolentActivities"]}
                      />
                    )}
                </Section>
              </Flex>
            </li>
          </ol>
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {
            console.log(formik);
          }}
          disabled={!formik.isValid || !formik.dirty}
        />
      </form>
    </Section>
  );
}

export default PersonalInfo;
