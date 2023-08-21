import {
  ArrayInput,
  FieldAsDate,
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
      <form>
        <Flex
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section margin="0 0 1rem">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text={`Family Member's Name ${count + 1}`}
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <FieldInput
              formik={formik}
              name={`family.${count}.membersName`}
              placeholder="Enter the member's name"
            />
          </Section>
          <Section margin="0 0 1rem">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text={`Relationship to you`}
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <FieldString
              formik={formik}
              options={RELATIONSHIPS}
              name={`family.${count}.membersRelationship`}
              placeholder="Enter the relationship"
            />
          </Section>
        </Flex>
        <Section margin="0 0 1rem">
          <Text
            type="p"
            text={`Member's Address`}
            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
          />
          <FieldInput
            formik={formik}
            name={`family.${count}.membersAddress`}
            placeholder="Enter Member's Residential Address"
          />
        </Section>
        <Flex
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section margin="0 0 1rem">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text={`Member's Phone Number`}
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <FieldInput
              formik={formik}
              name={`family.${count}.phoneNumber`}
              placeholder="Enter Member's Phone Number"
            />
          </Section>
          <Section margin="0 0 1rem">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text={`Relationship to you`}
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <FieldInput
              type="email"
              formik={formik}
              name={`family.${count}.membersEmail`}
              placeholder="Enter Member's Email Address"
            />
          </Section>
        </Flex>
        <Flex justify="space-between">
          <Text
            type="p"
            text="Will you be traveling with this Family Member?"
          />
          <Switch
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
        </Flex>
        {checked && (
          <div>
            <Flex
              margin="0 0 1rem"
              justify="space-between"
              direction={isMobile ? "column" : "row"}
              gap={isMobile ? "0px" : "1.5rem"}
            >
              <Section margin="0 0 1rem">
                <Flex align="center" gap="0.25rem">
                  <Text type="p" text="Gender" />
                  <Required />
                </Flex>
                <FieldString
                  formik={formik}
                  name={`family.${count}.gender`}
                  placeholder="Select your Gender"
                  options={["Male", "Female"]}
                />
              </Section>
              <Section margin="0 0 1rem">
                <Flex align="center" gap="0.25rem">
                  <Text type="p" text="Date of Birth" />
                  <Required />
                </Flex>
                <FieldAsDate
                  name={`family.${count}.membersDOB`}
                  placeholder="Select your DOB"
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
              <Section margin="0 0 1rem">
                <Flex align="center" gap="0.25rem">
                  <Text type="p" text="Passport Number" />
                  <Required />
                </Flex>
                <ArrayInput
                  formik={formik}
                  placeholder="Enter your Passport Number"
                  name={`family.${count}.passNumber`}
                />
              </Section>
              <Section margin="0 0 1rem">
                <Flex align="center" gap="0.25rem">
                  <Text type="p" text="Issued Country" />
                  <Required />
                </Flex>
                <FieldString
                  options={COUNTRY_FLAGS.map((x) => ({
                    name: x.name,
                    flag: x.flag,
                    code: x.code,
                  }))}
                  name={`family.${count}.passIssueCountry`}
                  formik={formik}
                  placeholder="Select the Issued Country"
                />
              </Section>
            </Flex>
            <Flex
              margin="0 0 1rem"
              justify="space-between"
              direction={isMobile ? "column" : "row"}
              gap={isMobile ? "0px" : "1.5rem"}
            >
              <Section margin="0 0 1rem">
                <Text type="p" text="Issue Date" />
                <FieldAsDate
                  name={`family.${count}.membersIssueDate`}
                  placeholder="Select Issue Date"
                  formik={formik}
                />
              </Section>
              <Section margin="0 0 1rem">
                <Text type="p" text="Expiry Date" />
                <FieldAsDate
                  name={`family.${count}.membersExpiryDate`}
                  placeholder="Select Expiry Date"
                  formik={formik}
                />
              </Section>
            </Flex>
          </div>
        )}
      </form>
    </Section>
  );
}
