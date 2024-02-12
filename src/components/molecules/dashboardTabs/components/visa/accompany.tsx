import Button from "@/components/atoms/button";
import Required from "@/components/atoms/required";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import {
  ErrorText,
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "@/components/organisms/fieldInput";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { dependantsRelationship } from "@/data/options";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { accompanyStore } from "@/lib/store/dashboard/accompany.store";
import { ttColors } from "@/lib/theme/colors";
import { IAccompany } from "@/lib/types";
import { dependantsForm, dependantsFormSchema } from "@/lib/types/schema";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";

const PhoneInputStyle = styled.div`
    .react-tel-input .form-control {
        height: 45px !important;
    }

    :hover {
        border-color: ${ttColors.primary};
        border-radius: 6px;
    }
`;

const SectionContainer = styled.div`
    position: relative;
    z-index: 99999;

    .css-gbi5t6-MuiPopper-root {
        display: block;
        z-index: 99999;
    }
`;

interface FormProps {
  values: IAccompany;
  formik: any;
  // formik: FormikProps<IAccompany>;  
  count: number;
  length: number;
  handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  step: number;
}

function AccompanyComponent({
  values,
  formik,
  count,
  length,
  step
}: FormProps) {
  const { isMobile } = useScreenResolution();

  return (
    <>
      <Section margin="20px 0">
        <Section>
          <Flex direction="column" gap="29px">
            <Grid
              columns=""
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
              align="center"
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text
                    type="label"
                    text="Family Member's Name"
                  />
                  <Required margin="0 0" />
                </Flex>
                <FieldInput
                  name={`dependants.${step}.memberName`}
                  formik={formik}
                  placeholder="Enter Member's Name"
                />
              </Flex>

              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text type="label" text="Relationship to you" />
                  <Required margin="0 0" />
                </Flex>
                <FieldString
                  formik={formik}
                  name={`dependants.${step}.relationship`}
                  placeholder="Enter Relationship to you"
                  options={dependantsRelationship}
                  onChange={(e) => {
                    formik.setFieldValue(`dependants.${step}.relationship`, e);
                  }}
                  value={formik?.values?.dependants?.step?.relationship}
                />
              </Flex>
            </Grid>

            <Flex direction="column" gap="14px">
              <Text type="label" text="Member's Address" />
              <FieldInput
                name={`dependants.${step}.memberAddress`}
                formik={formik}
                placeholder="Enter Member's Residential Address"
              />
            </Flex>

            <Grid
              columns={""}
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                alignItems: "center",
              }}
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Text type="label" text="Member's Occupation" />
                <FieldInput
                  placeholder="Enter Guarantor's Occupation"
                  name={`dependants.${step}.memberOccupation`}
                  formik={formik}
                />
              </Flex>

              <Flex direction="column" gap="14px">
                <Text type="label" text="Member's Email Address" />
                <FieldInput
                  name={`dependants.${step}.memberEmail`}
                  formik={formik}
                  placeholder="Enter Member's Email Address"
                />
              </Flex>
            </Grid>

            <Grid
              columns={""}
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                alignItems: "center",
              }}
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Flex align="center" gap="0.25rem">
                  <Text
                    type="label"
                    text="Phone Number"
                    size={15}
                  />
                  <Required margin="0 0" />
                </Flex>
                <PhoneInputStyle>
                  <PhoneInput
                    country={"ng"}
                    autoFormat={true}
                    inputStyle={{
                      border:
                        Object.keys(
                          formik.touched
                        ).includes("phoneNumber") &&
                          Object.keys(formik.errors).includes(
                            "phoneNumber"
                          )
                          ? `1px solid crimson`
                          : "",
                    }}
                    onChange={(e) => {
                      formik.setFieldValue(`dependants.${step}.phoneNumber`, e);
                    }}
                    inputClass="w"
                    placeholder="Enter phone numbers"
                  />
                </PhoneInputStyle>

                {Object.keys(formik.touched).includes(
                  "phoneNumber"
                ) &&
                  Object.keys(formik.errors).includes(
                    "phoneNumber"
                  ) ? (
                  <ErrorText
                    text={
                      formik.errors?.phoneNumber ?? "Required"
                    }
                  />
                ) : null}
              </Flex>

              <Flex direction="column" gap="14px">
                <Flex>
                  <Text type="label" text="Member's Worth" />
                  <Required margin="0 0" />
                </Flex>
                <FieldInput
                  name={`dependants.${step}.memberWorth`}
                  formik={formik}
                  placeholder="Enter Guarantor's Worth"
                />
              </Flex>
            </Grid>

            <Grid
              columns={""}
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                alignItems: "flex-start",
              }}
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Flex align="center" gap="0.25rem">
                  <Text type="label" text="Gender" />
                  <Required margin="0 0" />
                </Flex>
                <FieldString
                  name={`dependants.${step}.gender`}
                  formik={formik}
                  placeholder="Select Gender"
                  options={["Male", "Female"]}
                  onChange={(e) => {
                    formik.setFieldValue(`dependants.${step}.gender`, e);
                  }}
                  value={formik?.values?.dependants?.step?.gender}
                />
              </Flex>
              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text type="label" text="Date of Birth" />
                  <Required margin="0 0" />
                </Flex>
                <FieldAsDate
                  name={`dependants.${step}.dateOfBirth`}
                  placeholder="Select your DOB"
                  formik={formik}
                  padding="0 0 0 0"
                  format="DD/MM/YYYY"
                />
              </Flex>
            </Grid>

            <Grid
              columns={""}
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                alignItems: "center",
              }}
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text
                    type="label"
                    text="Passport Number"
                    margin={0}
                  />
                  <Required margin="0 0" />
                </Flex>
                <FieldInput
                  name={`dependants.${step}.passportNumber`}
                  formik={formik}
                  placeholder="Enter Passport Number"
                />
              </Flex>

              <Flex direction="column" gap="14px" position="relative">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text
                    type="p"
                    text="Issued Country"
                    margin={0}
                    size={15}
                  />
                  <Required margin="0 0" />
                </Flex>
                <SectionContainer>
                  <FieldAsString
                    options={COUNTRY_FLAGS.map((x) => ({
                      name: x.name,
                      flag: x.flag,
                      code: x.code,
                    }))}
                    formik={formik}
                    name={`dependants.${step}.passportIssuedCountry`}
                    placeholder="Select the country"
                    type="text"
                    value={formik.values.passportIssuedCountry}
                  />
                </SectionContainer>
              </Flex>
            </Grid>

            <Grid
              columns={""}
              style={{
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                alignItems: "center",
              }}
              gap="18px"
            >
              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text type="label" text="Issue Date" />
                  <Required margin="0 0" />
                </Flex>
                <FieldAsDate
                  name={`dependants.${step}.issueDate`}
                  placeholder="Select Issue Date"
                  formik={formik}
                  padding="0 0 0 0"
                  format="DD/MM/YYYY"
                />
              </Flex>

              <Flex direction="column" gap="14px">
                <Flex direction="row" align="center" gap="0.25rem">
                  <Text type="label" text="Expiry Date" />
                  <Required margin="0 0" />
                </Flex>
                <FieldAsDate
                  name={`dependants.${step}.expiryDate`}
                  placeholder="Expiry Date"
                  formik={formik}
                  padding="0 0 0 0"
                  format="DD/MM/YYYY"
                />
              </Flex>
            </Grid>

            {/* <Flex align="center" gap="18px">
              {count === numberOfDependants ? (
                <Button
                  background={ttColors.blackishBlue}
                  width="100%"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (formik.isValid === true) {
                      formik.setFieldValue("phoneNumber", "");

                    }
                    formik.handleSubmit();

                  }}
                >
                  <Text type="p" text="Continue" weight={500} />
                </Button>
              ) : (
                <Button
                  background={ttColors.dark}
                  type="button"
                  width="100%"
                  onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();

                    if (formik.isValid === true) {

                    }
                  }}
                >
                  <Text type="p" text="Next Dependent" />
                </Button>
              )}
            </Flex> */}
          </Flex>
        </Section>
      </Section>
    </>
  );
}

export default AccompanyComponent;
