import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { FormikProps } from "formik";
import FormStepTitle from "./formStepsTitle";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import Required from "@atom/required";
import PhoneInput from "react-phone-input-2";
import { City, ICity, IState, State } from "country-state-city";
import TextArea from "@molecule/textArea";
import { CustomRadioGroup } from "@molecule/radio";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { personalInfoKeys, personalInfoSchema } from "@lib/types/schema";
import {
  ErrorText,
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "@organism/fieldInput";
import { Mode, PersonalInfoInterface } from "@lib/types";
import ContinueButton from "@organism/continueButton";
import dayjs from "dayjs";
import { useApplicationFormStore } from "@lib/store/application-form.store";
import ToastError from "@molecule/toastError";
import React, { useEffect } from "react";
import { useQueryParams } from "@/hooks/useNext";

const trueFalseOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
];


interface FormProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<PersonalInfoInterface>;
}

function PersonalInfo({ steps, index, persistForm, formik }: FormProps) {
    const { isMobile } = useScreenResolution();
    const { mode, form } = useApplicationFormStore((state) => state);
    const { queryParams } = useQueryParams()

    const isLoading = mode == Mode.loading;
    
    const destination = `${queryParams?.destination ?? 'your destination'}`

    const country = COUNTRY_FLAGS.find(
        (country) => country.name === form.tripDetails.homeCountry.name
    );
    const states: IState[] = State.getStatesOfCountry(`${country?.code}`);
    const state = states.find(
        (state) => state.name === formik.values.stateOfOrigin
    );
    const cities: ICity[] = City.getCitiesOfState(
        `${country?.code}`,
        `${state?.isoCode}`
    );
    
    useEffect(() => console.log(formik), [formik])

  return (
    <Section>
    <FormStepTitle steps={steps} index={index} />
          
    {/* Personal Information */}
    <Text
        type="p"
        text="Personal Information"
        size={isMobile ? 18 : 20}
        weight={500}
        margin="3.5rem 0 .5rem"
    />
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
                size={15}
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
                size={15}
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
            direction={isMobile ? "column" : "row"}
            justify="space-between"
            gap={isMobile ? "0px" : "1.5rem"}
            padding="1rem 0 1rem"
        >
            <Text
                size={15}
                type="p"
                text="Have you previously changed or used any surname or given names apart from the one provided above?"
                margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                width={isMobile ? "100%" : "60%"}
            />
            <CustomRadioGroup
                options={trueFalseOptions}
                name="changeOfName"
                value={formik.values.changeOfName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                styles={{ width: isMobile ? "100%" : "auto", display: 'flex', justifyContent: 'center' }}
            />
        </Flex>

        {String(formik.values.changeOfName) == 'true' && (
            <Flex
                direction="column"
                gap={isMobile ? ".5rem" : "1rem"}
            >
                <Flex gap=".5rem">
                    <Text
                        size={15}
                        type="p"
                        text="Changed or Previously given name"
                    />
                    <Required />        
                </Flex>
                <FieldInput
                    name="changedName"
                    placeholder="Enter changed or previously given name"
                    formik={formik}
                />
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
                text="Middle Name"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
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
                size={15}
              />
              <Required />
            </Flex>

            <FieldString
              formik={formik}
              name={"stateOfOrigin"}
              placeholder="Select your State of Origin"
              options={states.map((x) => x.name)}
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
                text="Place of Origin"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldString
              formik={formik}
              options={cities.map((x) => x.name)}
              name="placeOfOrigin"
              disabled={formik.values.stateOfOrigin === ""}
              placeholder="Select your Place of Origin"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Native Language"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
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
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
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
                size={15}
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
            <Text
                type="p"
                text="Date Of Birth"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
            />
            <FieldAsDate
                name="dateOfBirth"
                placeholder="Select your Date Of Birth"
                formik={formik}
                format="DD/MM/YYYY"
                styles={{ paddingBottom: '0' }}
            />
          </Section>
          <Section width="100%">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Current Occupation"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldInput
              name="occupation"
              formik={formik}
              placeholder="Enter your current occupation"
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
                size={15}
              />
              <Required />
            </Flex>
            <FieldString
              options={[
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
                size={15}
              />
              <Required />
            </Flex>
            <FieldInput
              name="idNumber"
              placeholder="Enter your ID number"
              formik={formik}
              // disabled={formik.values.meansOfId == "International Passport"}
            />
          </Section>
        </Flex>
              
        
        {formik.values.meansOfId && (
          <Flex
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Section width="100%">
              <Text
                type="p"
                text="Issue Date"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                size={15}
              />
              <FieldAsDate
                name="issueDate"
                placeholder="Select your Issue Date"
                formik={formik}
                maxDate={dayjs(formik.values.expiryDate)}
                format="DD/MM/YYYY"
              />
            </Section>
            <Section>
              <Text
                type="p"
                text="Expiry Date"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                size={15}
              />
              <FieldAsDate
                name="expiryDate"
                placeholder="Select ID's Expiry Date"
                formik={formik}
                minDate={dayjs(formik.values.issueDate)}
                format="DD/MM/YYYY"
              />
            </Section>
          </Flex>
        )}

        {/* Citizenship Information */}
        <Text
            type="p"
            text="Citizenship Information"
            size={isMobile ? 18 : 20}
            weight={500}
            margin="3.5rem 0 .5rem"
        /> 
              
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
                size={15}
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
                text="Place of Birth (Country)"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
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
              placeholder="Select your country of birth"
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
                text="Country of Residence"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
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
              name="countryOfResidence"
              placeholder="Select your country of residence"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Country where Applying"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
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
              name="countryofApply"
              placeholder="Select country where applying"
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
                text="Status of Current Residence"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldString
                formik={formik}
                name="statusOfResidence"
                placeholder="Select status of current residence"
                options={["Citizen", "Visitor", "Worker", "Refugee", "Student", "Others"]}
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="Start Date of Current Residence"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldAsDate
                name="startDateOfResidence"
                placeholder="Select your Start Date"
                formik={formik}
                maxDate={dayjs()}
                format="DD/MM/YYYY"
            />
          </Section>
        </Flex>

        {/* Prev Residence 1 */}
        <Section>
            <Flex align="center" gap="0.25rem">
                <Text
                    type="p"
                    text="Previous Country of Residence 1"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsString
                formik={formik}
                options={COUNTRY_FLAGS.map((x) => ({
                    name: x.name,
                    flag: x.flag,
                    code: x.code,
                }))}
                name="prevResidence1"
                placeholder="Select previous country of residence"
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
                text="Since When?"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
            </Flex>
            <FieldAsDate
                name="startDatePrevResidence1"
                placeholder="Select your start date"
                formik={formik}
                maxDate={dayjs()}
                format="DD/MM/YYYY"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                    type="p"
                    text="Till When?"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsDate
                name="endDatePrevResidence1"
                placeholder="Select your end date"
                formik={formik}
                format="DD/MM/YYYY"
            />
          </Section>
        </Flex>
              
        {/* Prev Residence 2 */}
        <Section>
            <Flex align="center" gap="0.25rem">
                <Text
                    type="p"
                    text="Previous Country of Residence 2"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsString
                formik={formik}
                options={COUNTRY_FLAGS.map((x) => ({
                    name: x.name,
                    flag: x.flag,
                    code: x.code,
                }))}
                name="prevResidence2"
                placeholder="Select previous country of residence"
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
                text="Since When?"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
            </Flex>
            <FieldAsDate
                name="startDatePrevResidence2"
                placeholder="Select your start date"
                formik={formik}
                maxDate={dayjs()}
                format="DD/MM/YYYY"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                    type="p"
                    text="Till When?"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsDate
                name="endDatePrevResidence2"
                placeholder="Select your end date"
                formik={formik}
                format="DD/MM/YYYY"
            />
          </Section>
        </Flex>
              
        {/* Prev Residence 3 */}
        <Section>
            <Flex align="center" gap="0.25rem">
                <Text
                    type="p"
                    text="Previous Country of Residence 3"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsString
                formik={formik}
                options={COUNTRY_FLAGS.map((x) => ({
                    name: x.name,
                    flag: x.flag,
                    code: x.code,
                }))}
                name="prevResidence3"
                placeholder="Select previous country of residence"
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
                text="Since When?"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
            </Flex>
            <FieldAsDate
                name="startDatePrevResidence3"
                placeholder="Select your start date"
                formik={formik}
                maxDate={dayjs()}
                format="DD/MM/YYYY"
            />
          </Section>
          <Section>
            <Flex align="center" gap="0.25rem">
              <Text
                    type="p"
                    text="Till When?"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
            </Flex>
            <FieldAsDate
                name="endDatePrevResidence3"
                placeholder="Select your end date"
                formik={formik}
                format="DD/MM/YYYY"
            />
          </Section>
        </Flex>

        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
                type="p"
                text="Residential Address"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
            />
          </Flex>
          <FieldInput
            name="address"
            type="address"
            formik={formik}
            placeholder="Enter your residential address"
          />
        </Section>

        <Flex direction="column" width={isMobile ? "100%" : "48%"}>
            <Flex align="center" gap="0.25rem">
                <Text
                    type="p"
                    text="Gender"
                    margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                    size={15}
                />
                <Required />
            </Flex>
            <FieldString
                formik={formik}
                name="gender"
                placeholder="Select your Gender"
                options={["Male", "Female"]}
            />      
        </Flex>

        {/* Passport Information */}
        <React.Fragment>
            <Text
                type="p"
                text="Passport Information"
                size={isMobile ? 18 : 20}
                weight={500}
                margin="3.5rem 0 .5rem"
            /> 
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
                        size={15}
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
                        size={15}
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
                            text="Passport Issued Date"
                            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                            size={15}
                        />
                        <Required />
                    </Flex>
                    <FieldAsDate
                        name="passportIssuedDate"
                        placeholder="Select your Issued Date"
                        formik={formik}
                        maxDate={dayjs()}
                        format="DD/MM/YYYY"
                    />
                </Section>
                <Section>
                    <Flex align="center" gap="0.25rem">
                        <Text
                            type="p"
                            text="Passport Expiry Date"
                            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                            size={15}
                        />
                        <Required />
                    </Flex>
                    <FieldAsDate
                        name="passportExpiryDate"
                        placeholder="Select your Expiry Date"
                        formik={formik}
                        format="DD/MM/YYYY"
                    />
                </Section>
            </Flex>
        </React.Fragment>
        
        <Flex
            direction={isMobile ? "column" : "row"}
            justify="space-between"
            gap={isMobile ? "0px" : "1.5rem"}
            margin="1rem 0 1rem"
        >
            <Text
                size={15}
                type="p"
                text="Are you a lawful permanent Resident of the United States with a valid alien registration card (Green Card)?"
                width={isMobile ? "100%" : "60%"}
            />
            <CustomRadioGroup
                options={trueFalseOptions}
                name="hasGreenCard"
                value={formik.values.hasGreenCard}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                styles={{ width: isMobile ? "100%" : "auto", display: 'flex', justifyContent: 'center' }}
            />
        </Flex>
              
        {String(formik.values.hasGreenCard) == 'true' && (
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
                        text="Document Number"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                </Flex>
                <FieldInput
                    name="greenCardNumber"
                    formik={formik}
                    placeholder="Enter document number"
                />
            </Section>
            <Section width="100%">
                <Flex align="center" gap="0.25rem">
                    <Text
                        type="p"
                        text="Document Expiry Date"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                </Flex>
                <FieldAsDate
                    name="greenCardExpiryDate"
                    placeholder="Select green card expiry date"
                    formik={formik}
                    format="DD/MM/YYYY"
                    styles={{ paddingBottom: '0' }}
                />
            </Section>
            </Flex>         
        )}
              
        {/* Marriage Information */}
        <Text
            type="p"
            text="Marriage Information"
            size={isMobile ? 18 : 20}
            weight={500}
            margin="3.5rem 0 .5rem"
        /> 
        
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
                    placeholder="Select your marital status"
                    name="maritalStatus"
                    formik={formik}
                />
          </Section>
          {formik.values.maritalStatus === "Married" && (
            <Section>
              <Flex align="center" gap="0.25rem">
                <Text
                    type="p"
                    text="Partner's Name (If applicable)"
                    margin={isMobile ? ".5rem 0" : "1rem 0px 0.5rem"}
                    size={15}
                />
                <Required/>
              </Flex>
              <FieldInput
                name="partnersName"
                formik={formik}
                placeholder="Enter your partner's name"
              />
            </Section>
          )}
        </Flex>

        {formik.values.maritalStatus === "Married" && (
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
                            text="Marriage Start Date"
                            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                            size={15}
                        />
                    </Flex>
                    <FieldAsDate
                        name="marriageStartDate"
                        placeholder="Select start date"
                        formik={formik}
                        maxDate={dayjs()}
                        format="DD/MM/YYYY"
                    />
                </Section>
                <Section>
                    <Flex align="center" gap="0.25rem">
                        <Text
                            type="p"
                            text="Marriage End Date"
                            margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                            size={15}
                        />
                    </Flex>
                    <FieldAsDate
                        name="marriageEndDate"
                        placeholder="Select end date"
                        formik={formik}
                        format="DD/MM/YYYY"
                    />
                </Section>
            </Flex>
        )}    

        {/* Purpose of Trip */}
        <Text
            type="p"
            text="Purpose of Trip"
            size={isMobile ? 18 : 20}
            weight={500}
            margin="3.5rem 0 0"
        />
        <Section>
          <Flex align="center" gap="0.25rem">
            <Text
              type="p"
              text="Main Purpose of your Trip"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
              size={15}
            />
            <Required />
          </Flex>

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
                text="Start Duration"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldAsDate
                name="tripDurationStartDate"
                placeholder="Select your duration start date"
                formik={formik}
                format="DD/MM/YYYY"
                minDate={dayjs()}
                styles={{ paddingBottom: '0' }}
            />
          </Section>
          <Section width="100%">
            <Flex align="center" gap="0.25rem">
              <Text
                type="p"
                text="End Duration"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldAsDate
                name="tripDurationEndDate"
                placeholder="Select your duration end date"
                formik={formik}
                format="DD/MM/YYYY"
                minDate={!!formik.values.tripDurationStartDate ? dayjs(formik.values.tripDurationStartDate) : dayjs()}
                styles={{ paddingBottom: '0' }}
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
                text="Where do you intend to work or stay?"
                margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                size={15}
              />
              <Required />
            </Flex>
            <FieldInput
                name="tripDurationLocation"
                placeholder="Enter where you intend to work or stay"
                formik={formik}
            />
          </Section>
        </Flex>
              
        <Flex
            direction={isMobile ? "column" : "row"}
            justify="space-between"
            gap={isMobile ? "0px" : "1.5rem"}
            margin="2rem 0 1rem"
        >
            <Text
                size={15}
                type="p"
                text={`Do you know anybody in ${destination}?`}
                width={isMobile ? "100%" : "60%"}
            />
            <CustomRadioGroup
                options={trueFalseOptions}
                name="hasContactInLocation"
                value={formik.values.hasContactInLocation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                styles={{ width: isMobile ? "100%" : "auto", display: 'flex', justifyContent: 'center' }}
            />
        </Flex>
        
        {String(formik.values.hasContactInLocation) == "true" && (
            <React.Fragment>
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
                        size={15}
                    />
                    <Required />
                    </Flex>
                    <FieldInput
                        name="contactInLocationLastName"
                        placeholder="Enter last name"
                        formik={formik}
                    />
                </Section>
                <Section width="100%">
                    <Flex align="center" gap="0.25rem">
                    <Text
                        type="p"
                        text="First Name"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                    </Flex>
                    <FieldInput
                        name="contactInLocationFirstName"
                        placeholder="Enter first name"
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
                        text="Residential Address"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                    </Flex>
                    <FieldInput
                        name="contactInLocationAddress"
                        placeholder="Enter residential address"
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
                        text="Relationship with the person"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                    </Flex>
                    <FieldString
                        formik={formik}
                        name="contactInLocationRelationship"
                        placeholder="Select relationship"
                        options={["Father", "Mother", "Sibling", "Others"]}
                    />
                </Section>
                <Section width="100%">
                    <Flex align="center" gap="0.25rem">
                    <Text
                        type="p"
                        text="Phone Number"
                        margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                        size={15}
                    />
                    <Required />
                    </Flex>
                    <PhoneInput
                        country={"ng"}
                        autoFormat={true}
                        inputProps={{
                            name: "contactInLocationPhoneNumber",
                        }}
                        onChange={(e) => {
                            formik.setFieldValue("contactInLocationPhoneNumber", e);
                        }}
                        inputClass="w"
                        placeholder="Enter phone number"
                    />
                </Section>
                </Flex>      
            </React.Fragment>      
        )}     


        {/* Background Information */}
        <Section padding="2rem 0 0">
            <Text
                type="h2"
                text="Background Information"
                size={isMobile ? 18 : 20}
                weight={500}
                margin="2.5rem 0 0"
            />
        </Section>
        <Section>
          <ol>
            <li>
              <Flex
                align="center"
                gap={isMobile ? "0" : "2rem"}
                justify="space-between"
              >
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
                    options={trueFalseOptions}
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
            {String(formik.values.tuberculosis) == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                <TextArea
                  name="tuberculosisDetails"
                  value={formik.values.tuberculosisDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["tuberculosisDetails"] &&
                  formik.errors["tuberculosisDetails"] && (
                    <ErrorText text={formik.errors["tuberculosisDetails"]} />
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
                    text={`Do you have any physical or mental disorder that would require social and/or health services, other than medication, during a stay in ${destination}?`}
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={trueFalseOptions}
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
              </Flex>
            </li>
            {String(formik.values.mentalDisorder) == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
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
                  text={`Have you ever remained beyond the validity of your status, attended school without authorization or worked without authorization in ${destination}?`}
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={trueFalseOptions}
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
            {String(formik.values.remainbeyondValidity) == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                <TextArea
                  name="remainbeyondValidityDetails"
                  value={formik.values.remainbeyondValidityDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["remainbeyondValidityDetails"] &&
                  formik.errors["remainbeyondValidityDetails"] && (
                    <ErrorText text={formik.errors["remainbeyondValidityDetails"]} />
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
                  text={`Have you ever been refused a visa or permit, denied entry or ordered to leave ${destination} or any other country?`}
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={trueFalseOptions}
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
                    options={trueFalseOptions}
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
                    options={trueFalseOptions}
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
                    options={trueFalseOptions}
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
            {String(formik.values.memberOfViolentGroup) == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                <TextArea
                  name="memberOfViolentGroupDetails"
                  value={formik.values.memberOfViolentGroupDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["memberOfViolentGroupDetails"] &&
                  formik.errors["memberOfViolentGroupDetails"] && (
                    <ErrorText text={formik.errors["memberOfViolentGroupDetails"]} />
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
                  text="Have you ever witnessed or participated in the ill treatment of prisoners or civilians, looting or desecration of religious buildings?"
                  margin={isMobile ? ".7rem  0.2rem" : "1rem 0"}
                  padding="0 0 0 1rem"
                />
                <Section height="auto" width="fit-content">
                  <CustomRadioGroup
                    options={trueFalseOptions}
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
            {String(formik.values.participatedInViolentActivities) == "true" && (
              <Section>
                <Text
                  size={16}
                  weight={300}
                  type="p"
                  text="If you answered “yes”, please provide details"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .3rem"}
                />
                <TextArea
                  name="participatedInViolentActivitiesDetails"
                  value={formik.values.participatedInViolentActivitiesDetails}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched["participatedInViolentActivitiesDetails"] &&
                  formik.errors["participatedInViolentActivitiesDetails"] && (
                    <ErrorText text={formik.errors["participatedInViolentActivitiesDetails"]} />
                  )}
              </Section>
            )}
          </ol>
        </Section>
        <ContinueButton
          isLoading={isLoading}
          onClick={() => {
            if (!formik.isValid) return ToastError();
          }}
          disabled={!formik.isValid}
          saveProgressAndContinueLater={persistForm}
        />
      </form>
    </Section>
  );
}

export default PersonalInfo;
