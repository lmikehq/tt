import {
  ArrayInput,
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldPhone,
  FieldString,
} from "@organism/fieldInput";
import Flex from "@components/templates/flex";
import Required from "@atom/required";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { Switch } from "@mui/material";
import { IMMEDIATE_RELATIONSHIPS, PRINCIPAL_RELATIONSHIPS, SIBLING_RELATIONSHIPS } from "@lib/extensions/data/utilData";
import { FieldArrayRenderProps, FormikValues } from "formik";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import React from "react";
import { FamilyInfoInterface, ManyFamilyInfoInterface } from "@lib/types";
import AddButton from "../addButton";
import toast from "react-hot-toast";
import { familyInforKeys } from "@/lib/types/schema";
import dayjs from "dayjs";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
const sectionDesc = {
    A: "Comprises Principal family members (Father and Mother). Click the Plus Icon to add subordinates",
    B: "Comprises Brothers and Sisters. Click the Plus Icon to add subordinates",
    C: "Comprises Immediate Family (Spouse, Sons, and Daughters). Click the Plus Icon to add subordinates",
}
const sectionName = {
    A: "PARENT DETAILS",
    B: "SIBLINGS DETAILS",
    C: "IMMEDIATE FAMILY DETAILS",
} as { [k: string]: string }


interface formProps {
  formik: FormikValues;
  count: number;
  values?: FamilyInfoInterface;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  arrayHelpers: FieldArrayRenderProps;
  isFirst: boolean;
}

export default function FamilyForm({ formik, count, values, arrayHelpers, isFirst }: formProps) {
    const { isMobile } = useScreenResolution();
    
    const relationshipOptions = values?.section === "A" ? PRINCIPAL_RELATIONSHIPS : values?.section === "B" ? SIBLING_RELATIONSHIPS : IMMEDIATE_RELATIONSHIPS
        
  return (
        <Section height="unset" margin="0 0 0rem">
          {isFirst && 
                <Flex align="flex-start" margin="0 0 1rem">
                    <Flex direction="column" justify="flex-start" gap="1rem">
                        <Text
                            type="h3"
                            text={`${sectionName[values?.section as keyof typeof sectionName]}`}
                            size={20}
                            weight={600}
                        />
                        <Text
                            type="p"
                            text={sectionDesc[values?.section as keyof typeof sectionDesc]}
                            size={16}
                        />
                    </Flex>
                    <AddButton
                        disabled={formik.values.familyMembers.filter((v: any) => v?.section === values?.section).length === (values?.section === 'C' ? 10 : 3)}
                        onClick={() => {
                            if (!formik.isValid || !formik.dirty)
                            return toast.error("Please fill the form first");
                            if (formik.values.familyMembers.filter((v: any) => v?.section === values?.section).length < (values?.section === 'C' ? 10 : 3)) {
                                arrayHelpers?.insert(count + 1, {
                                    ...familyInforKeys,
                                    section: values?.section,
                                    index: formik.values.familyMembers.filter((e: FamilyInfoInterface) => e.section === values?.section).length
                                });
                            }
                        }}
                    />
            </Flex>
        }

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
            options={relationshipOptions}
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
        {['A', 'C'].includes(values?.section ?? '') && (
            <Section width="100%">
                <Flex align="center" gap="0.25rem">
                    <Text
                        type="p"
                        text="Member's Occupation"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    {/* <Required /> */}
                </Flex>
                <FieldInput
                    name={`familyMembers.${count}.membersOccupation`}
                    formik={formik}
                    placeholder="Enter member's occupation"
                />
            </Section>
        )}
        <Section margin="0">
            <Flex align="center" gap="0.25rem">
                <Text
                type="p"
                text="Member's Email"
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
          
        {['A', 'B', 'C'].includes(values?.section ?? '') && (
            <Flex
                margin="0"
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
                        <FieldPhone
                            name={`familyMembers.${count}.membersPhoneNumber`}
                            formik={formik}
                            country="ng"
                            placeholder="Enter member's phone number"
                        />
                    </Section>
                    {['C'].includes(values?.section ?? '') && 
                        <Section width="100%">
                            <Flex align="center" gap="0.25rem">
                                <Text
                                    type="p"
                                    text="Member's Date of Birth"
                                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                                    size={15}
                                />
                                <Required />
                            </Flex>
                            <FieldAsDate
                                name={`familyMembers.${count}.dateOfBirth`}
                                placeholder="Select member's date of birth"
                                formik={formik}
                                maxDate={dayjs()}
                                format="DD/MM/YYYY"
                            />
                        </Section>
                    }
                </Flex>
          )}
          
            {/* {['C'].includes(values?.section ?? '') && (
                <Flex
                    margin="0"
                    justify="space-between"
                    direction={isMobile ? "column" : "row"}
                    gap={isMobile ? "0px" : "1.5rem"}
                >
                    <Section width={isMobile ? "100%" : "49%"}>
                        <Flex align="center" gap="0.25rem">
                            <Text
                                type="p"
                                text="Member's Marital Status"
                                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                                size={15}
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
                            placeholder="Select member's marital status"
                            name={`familyMembers.${count}.maritalStatus`}
                            formik={formik}
                        />
                    </Section>
                </Flex>
            )} */}
          
      <Flex justify="space-between" margin="1rem 0 1rem">
        <Text type="p" text="Will you be traveling with this Family Member?" />
        <Switch
          name={`familyMembers.${count}.accompanying`}
          checked={values?.accompanying}
          value={values?.accompanying}
          onChange={formik.handleChange}
        />
        </Flex>
          
      {values?.accompanying && (
        <React.Fragment>
          <Flex
            margin="0 0 .7rem"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin="0">
              <Flex align="center" gap="0.25rem" margin="0 0 .5rem">
                <Text type="p" text="Gender" />
                <Required />
              </Flex>
              <FieldString
                formik={formik}
                name={`familyMembers.${count}.gender`}
                placeholder="Select Gender"
                options={["Male", "Female"]}
              />
            </Section>
            {!['C'].includes(values?.section ?? '') && (
                <Section margin="0">
                    <Flex align="center" gap="0.25rem" margin="0 0 .5rem">
                        <Text type="p" text="Date of Birth" />
                        <Required />
                    </Flex>
                    <FieldAsDate
                        name={`familyMembers.${count}.dateOfBirth`}
                        placeholder="Select DOB"
                        formik={formik}
                    />
                </Section>      
            )}
            </Flex>
                  
          <Flex
            margin="0"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin="0 0 .7rem">
              <Flex align="center" gap="0.25rem" margin="0 0 .5rem">
                <Text type="p" text="Passport Number" />
                <Required />
              </Flex>
              <ArrayInput
                formik={formik}
                placeholder="Enter Passport Number"
                name={`familyMembers.${count}.passportNumber`}
              />
            </Section>
            <Section margin="0">
                <Flex align="center" gap="0.25rem" margin="0 0 .5rem">
                    <Text type="p" text="Issued Country" />
                    <Required />
                </Flex>
                <FieldAsString
                    options={COUNTRY_FLAGS.map((x) => ({
                        name: x.name,
                        flag: x.flag,
                        code: x.code,

                    }))}
                    name={`familyMembers.${count}.issueCountry`}
                    formik={formik}
                    placeholder="Select Issued Country"
                />
            </Section>
            </Flex>
                  
          <Flex
            margin={"0"}
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section margin="0">
              <Text type="p" text="Issue Year" margin="0 0 .5rem" />
              <FieldAsDate
                name={`familyMembers.${count}.issueYear`}
                placeholder="Select Issue Year"
                formik={formik}
                maxDate={dayjs()}
                views={["year"]}
              />
            </Section>
            <Section margin="0">
              <Text type="p" text="Expiry Year" margin="0 0 .5rem" />
              <FieldAsDate
                name={`familyMembers.${count}.expiryYear`}
                placeholder="Select Expiry Year"
                formik={formik}
                minDate={dayjs()}
                views={["year"]}
              />
            </Section>
        </Flex>
            
        </React.Fragment>
      )}
    </Section>
  );
}
