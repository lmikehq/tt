import {
  ArrayInput,
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "@atom/fieldInput";
import Flex from "@atom/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "@molecule/section";
import { Switch } from "@mui/material";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { RELATIONSHIPS } from "data/utilData";
import { FormikProps, FormikValues } from "formik";
import { useScreenResolution } from "hook/useScreenResolution";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import { FamilyInfoInterface } from "types";

interface formProps {
  formik: FormikValues;
  count: number;
  values?: FamilyInfoInterface;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function FamilyForm({ formik, count, values }: formProps) {
  const { isMobile } = useScreenResolution();
  return (
    <Section height="unset">
      <Flex
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Family Member's Name ${count + 1}`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`familyMembers.${count}.membersName`}
            placeholder="Enter the member's name"
          />
        </Section>
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Relationship to you`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldString
            formik={formik}
            options={RELATIONSHIPS}
            name={`familyMembers.${count}.relationshipToPrimary`}
            placeholder="Enter the relationship"
          />
        </Section>
      </Flex>
      <Section margin="0">
        <Text
          type="p"
          text={`Member's Address`}
          margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
        />
        <FieldInput
          formik={formik}
          name={`familyMembers.${count}.address`}
          placeholder="Enter Member's Residential Address"
        />
      </Section>
      <Flex
        justify="space-between"
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? "0px" : "1.5rem"}
      >
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Member's Phone Number`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`familyMembers.${count}.membersPhoneNumber`}
            placeholder="Enter Member's Phone Number"
          />
        </Section>
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Member's email`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            type="text"
            formik={formik}
            name={`familyMembers.${count}.membersEmail`}
            placeholder="Enter Member's Email Address"
          />
        </Section>
      </Flex>
      <Flex justify="space-between" margin="0 0 1rem">
        <Text type="p" text="Will you be traveling with this Family Member?" />
        <Switch
          name={`familyMembers.${count}.accompanying`}
          checked={values?.accompanying}
          value={values?.accompanying}
          onChange={formik.handleChange}
        />
      </Flex>
      {values?.accompanying && (
        <div>
          <Flex
            margin="0"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin="0">
              <Flex align="center" gap="0.25rem">
                <Text type="p" text="Gender" />
                <Required />
              </Flex>
              <FieldString
                formik={formik}
                name={`familyMembers.${count}.gender`}
                placeholder="Select your Gender"
                options={["Male", "Female"]}
              />
            </Section>
            <Section margin="0">
              <Flex align="center" gap="0.25rem">
                <Text type="p" text="Date of Birth" />
                <Required />
              </Flex>
              <FieldAsDate
                name={`familyMembers.${count}.dateOfBirth`}
                placeholder="Select your DOB"
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
            <Section margin="0">
              <Flex align="center" gap="0.25rem">
                <Text type="p" text="Passport Number" />
                <Required />
              </Flex>
              <ArrayInput
                formik={formik}
                placeholder="Enter your Passport Number"
                name={`familyMembers.${count}.passportNumber`}
              />
            </Section>
            {/* <Section margin="0">
              <Flex align="center" gap="0.25rem">
                <Text type="p" text="Issued Country" />
                <Required />
              </Flex>
              <FieldAsString
                options={COUNTRY_FLAGS.map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                name={`familyMembers.${count}.passIssueCountry`}
                formik={formik}
                placeholder="Select the Issued Country"
              />
            </Section> */}
          </Flex>
          <Flex
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin="0">
              <Text type="p" text="Issue Year" />
              <FieldAsDate
                name={`familyMembers.${count}.issueYear`}
                placeholder="Select Issue Year"
                formik={formik}
                views={["year"]}
              />
            </Section>
            <Section margin="0">
              <Text type="p" text="Expiry Year" />
              <FieldAsDate
                name={`familyMembers.${count}.expiryYear`}
                placeholder="Select Expiry Year"
                formik={formik}
                views={["year"]}
              />
            </Section>
          </Flex>
        </div>
      )}
    </Section>
  );
}
