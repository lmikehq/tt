"use client";
import Center from "@atom/center";
import Flex from "@atom/flex";
import Input from "@atom/input";
import { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import ID from "@image/uploadedID.png";
import { get100Years } from "@lib/utilFns";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/data";
import { FormikValues } from "formik";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { styled } from "styled-components";
import { ttColors } from "theme/colors";
import FormStepTitle from "./formStepsTitle";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

const UploadArea = styled.div`
  width: 100%;
  height: 13rem;
  text-align: center;
  background: #ffffff;
  border: 2px dashed rgba(0, 0, 0, 0.28);
  border-radius: 16px;
  margin-top: 2rem;
`;

const UploadedDoc = styled.div<{ bg: any }>`
  background: #ffffff;
  background-image: url(${({ bg }) => bg});
  height: 6rem;
  width: 8rem;
  background-size: cover;
  background-position: center;
`;

function OtherInformation({ formik, steps, index }: formProps) {
  const [hovered, setHovered] = useState<number>(-1);

  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      
      <form style={{ margin: "2rem 0" }}>
        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Passport Number" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.passNumber?.length > 8 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.passNumber}
              onChange={(x) =>
                formik.setFieldValue("passNumber", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Passport issued country" margin="1rem 0 " />
            <SearchInputAsString
              options={COUNTRY_FLAGS.map((x) => x.name)}
              onChange={(x) => formik.setFieldValue("passIssueCountry", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.passIssueCountry}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.passIssueCountry ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Year of Issue" margin="1rem 0 " />
            <SearchInputAsString
              options={get100Years()}
              onChange={(x) => formik.setFieldValue("yearOfIssue", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.yearOfIssue}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.yearOfIssue ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
          <Section>
            <Text type="p" text="Gender" margin="1rem 0 " />
            <SearchInputAsString
              options={["Male", "Female", "Other"]}
              onChange={(x) => formik.setFieldValue("gender", x)}
            >
              <Flex justify="space-between">
                <Text
                  type="p"
                  text={formik?.values?.gender}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik.values.gender ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        </Flex>

        <Text
          type="p"
          text="Your guarantor’s information"
          size="1.6rem"
          margin="2rem 0 1rem"
        />

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Guarantor’s Name" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorName?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorName}
              onChange={(x) =>
                formik.setFieldValue("guarantorName", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Relationship to you" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorRelationship?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorRelationship}
              onChange={(x) =>
                formik.setFieldValue("guarantorRelationship", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Section>
          <Text type="p" text="Guarantor’s Address" margin="1rem 0 " />
          <Input
            addon={
              formik?.values?.guarantorAddress?.length > 4 ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : undefined
            }
            value={formik.values.guarantorAddress}
            onChange={(x) =>
              formik.setFieldValue("guarantorAddress", x.target.value)
            }
          />
        </Section>

        <Flex margin="0 0 1rem" justify="space-between" gap="1.5rem">
          <Section>
            <Text type="p" text="Guarantor’s  Phone" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorPhone?.length > 3 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorPhone}
              onChange={(x) =>
                formik.setFieldValue("guarantorPhone", x.target.value)
              }
            />
          </Section>
          <Section>
            <Text type="p" text="Guarantor’s Worth" margin="1rem 0 " />
            <Input
              addon={
                formik?.values?.guarantorWorth?.length > 2 ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : undefined
              }
              value={formik.values.guarantorWorth}
              onChange={(x) =>
                formik.setFieldValue("guarantorWorth", x.target.value)
              }
            />
          </Section>
        </Flex>

        <Section>
          <Text
            type="p"
            text="Upload all your credentials"
            size="1.6rem"
            margin="2rem 0 1rem"
          />
          {[
            "passport sized photograph (must be on white background)",
            "valid international passport",
            "all academic certificates",
            "proof of address (utility bill)",
            "marriage certificate (if applicable)",
          ].map((item, i) => (
            <Flex align="center" gap=".5rem" margin="1rem 0" key={i}>
              <FaCircle size={".4rem"} color={ttColors.salmon} />
              <Text type="p" text={item} />
            </Flex>
          ))}

          <UploadArea>
            <Center>
              <div>
                <p>
                  <span style={{ color: ttColors.primary, cursor: "pointer" }}>
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </p>
                <Text
                  type="p"
                  text="PNG, JPG, PDF, GIF up to 10MB"
                  weight={100}
                  size={".9rem"}
                  margin="1rem 0"
                />
              </div>
            </Center>
          </UploadArea>

          <Flex margin="2rem 0 0" gap="1rem" wrap="wrap">
            {[1, 2, 3, 4, 5, 6].map((_item, i) => (
              <UploadedDoc
                bg={ID.src}
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
              >
                {hovered === i && (
                  <Flex
                    justify="center"
                    align="center"
                    height="100%"
                    background="#d6cfcf"
                    styles={{
                      opacity: 0.8,
                    }}
                  >
                    <BiTrash
                      size={30}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </Flex>
                )}
              </UploadedDoc>
            ))}
          </Flex>
        </Section>
      </form>
    </Section>
  );
}

export default OtherInformation;
