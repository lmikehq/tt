import CheckBox from "@atom/checkbox";
import Flex from "@atom/flex";
import Input from "@atom/input";
import Required from "@atom/required";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import { concatArrays, get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { COMMON_MAJORS, DEGREES } from "data/utilData";
import { FormikValues } from "formik";
import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";

interface formProps {
  formik?: FormikValues;
  isMobile?: boolean;
  count?: number;
  handleClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function FamilyForm({ formik, isMobile, count }: formProps) {
  const [isCurrentlyInSchool, setIsCurrentlyInSchool] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsCurrentlyInSchool(checked);
  };

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
                text={`Family Member's Name ${count}`}
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.membersName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.membersName}
              onChange={(x) =>
                formik?.setFieldValue("membersName", x.target.value)
              }
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
            <Input
              height="40px"
              addon={
                formik?.values?.memberRelationship?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.memberRelationship}
              onChange={(x) =>
                formik?.setFieldValue("memberRelationship", x.target.value)
              }
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
          <Input
            height="40px"
            addon={
              formik?.values?.memberAddress?.length > 3 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik?.values.memberAddress}
            onChange={(x) =>
              formik?.setFieldValue("memberAddress", x.target.value)
            }
            placeholder="Enter Member's Residential Address"
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
                text="Member's Occupation"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.memberOccupation?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.memberOccupation}
              onChange={(x) =>
                formik?.setFieldValue("memberOccupation", x.target.value)
              }
              placeholder="Enter Member's Occupation"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Member's Email Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.memberEmail?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.memberEmail}
              onChange={(x) =>
                formik?.setFieldValue("memberEmail", x.target.value)
              }
              placeholder="Enter Member's Email Address"
              type="email"
            />
          </Section>
        </Flex>
        <Flex
          margin={isMobile ? "0px" : "0 0 1rem"}
          justify="space-between"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "1.5rem"}
        >
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Member's Phone Number"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              addon={
                formik?.values?.memberPhoneNumber?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik?.values.memberPhoneNumber}
              onChange={(x) =>
                formik?.setFieldValue("memberPhoneNumber", x.target.value)
              }
              max={11}
              placeholder="Enter Member's Phone Number"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Member's Worth"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
              />
              <Required />
            </Flex>
            <Input
              height="40px"
              type="text"
              value={formik?.values.memberWorth}
              placeholder="Enter Member Worth"
              onChange={(e) => formik?.setFieldValue("memberWorth", e)}
            />
          </Section>
        </Flex>
        <Flex
          align="center"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "0px" : "0.25rem"}
        >
          <CheckBox
            checked={isCurrentlyInSchool}
            onChange={handleCheckboxChange}
          >
            <Text type="p" text="I am currently in school" />
          </CheckBox>
        </Flex>
      </form>
    </Section>
  );
}
