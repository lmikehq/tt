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
import { FormikValues } from "formik";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";

interface formProps {
  formik: FormikValues;
  isMobile?: boolean;
  count: number;
  family?: any;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function FamilyForm({
  formik,
  isMobile,
  count,
  family,
}: formProps) {
  const [checked, setChecked] = useState(false);

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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`familyInfo.${count}.membersName`}
            placeholder="Enter the member's name"
          />
        </Section>
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Relationship to you`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <Required />
          </Flex>
          <FieldString
            formik={formik}
            options={RELATIONSHIPS}
            name={`familyInfo.${count}.membersRelationship`}
            placeholder="Enter the relationship"
          />
        </Section>
      </Flex>
      <Section margin="0">
        <Text
          type="p"
          text={`Member's Address`}
          margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
        />
        <FieldInput
          formik={formik}
          name={`familyInfo.${count}.membersAddress`}
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
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            formik={formik}
            name={`familyInfo.${count}.membersPhone`}
            placeholder="Enter Member's Phone Number"
          />
        </Section>
        <Section margin="0">
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text={`Member's email`}
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
            />
            <Required />
          </Flex>
          <FieldInput
            type="text"
            formik={formik}
            name={`familyInfo.${count}.membersEmail`}
            placeholder="Enter Member's Email Address"
          />
        </Section>
      </Flex>
      <Flex justify="space-between">
        <Text type="p" text="Will you be traveling with this Family Member?" />
        <Switch
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
      </Flex>
      {checked && (
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
                name={`familyInfo.${count}.gender`}
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
                name={`familyInfo.${count}.membersDOB`}
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
                name={`familyInfo.${count}.passNumber`}
              />
            </Section>
            <Section margin="0">
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
                name={`familyInfo.${count}.passIssueCountry`}
                formik={formik}
                placeholder="Select the Issued Country"
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
              <Text type="p" text="Issue Date" />
              <FieldAsDate
                name={`familyInfo.${count}.membersIssueDate`}
                placeholder="Select Issue Date"
                formik={formik}
              />
            </Section>
            <Section margin="0">
              <Text type="p" text="Expiry Date" />
              <FieldAsDate
                name={`familyInfo.${count}.membersExpiryDate`}
                placeholder="Select Expiry Date"
                formik={formik}
              />
            </Section>
          </Flex>
        </div>
      )}
    </Section>
  );
}
