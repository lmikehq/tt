import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { FormikProps, FormikValues, useFormik } from "formik";
import { useScreenResolution } from "hook/useScreenResolution";
import FormStepTitle from "./formStepsTitle";
import Required from "@atom/required";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import SearchFlagInput from "@molecule/searchInputs/searchFlagInput";
import { detailsKeys, detailsSchema } from "@lib/application/schema";
import { DetailsKeys } from "types";
import { FieldAsString, FieldString } from "@atom/fieldInput";
import { SingleFormType } from "../applicationForm";
import Button from "@atom/button";
import Spinner from "@components/icons/spinner";
import { ttColors } from "theme/colors";
import { useSearchParams } from "next/navigation";
import ContinueButton from "@atom/continueButton";

interface formProps {
  steps: string[];
  index: number;
  isLoading: boolean;
  formik: FormikProps<DetailsKeys>;
}

function TripDetails({ steps, index, isLoading, formik }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="unset">
      <FormStepTitle steps={steps} index={index} />
      <form onSubmit={formik.handleSubmit}>
        <Section margin="1.5rem 0px 0px">
          <Flex gap="1rem">
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  type="p"
                  text="Where are you from?"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                  size={isMobile ? 14 : 16}
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
                placeholder="Select where you are"
              />
            </Flex>
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text="Where to?"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Required />
              </Flex>
              <FieldAsString
                formik={formik}
                options={COUNTRY_FLAGS.filter(
                  (el) => el.name != formik.values.homeCountry
                ).map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                name="destination"
                placeholder="Select where you are"
                disabled={!formik.values.homeCountry}
              />
            </Flex>
          </Flex>
        </Section>
        <Section>
          <Flex gap="1rem" align="center">
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text="Visa type"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Required />
              </Flex>
              <FieldString
                options={[
                  "Tourist Visa",
                  "Business Visa",
                  "Transit Visa",
                  "Work Visa",
                  "Student Visa",
                  "Medical Visa",
                  "Visa on Arrival",
                  "Elite Migration Visa",
                  "Other",
                ]}
                placeholder="Select your Visa Type"
                name="visaType"
                value={formik.values.visaType}
                formik={formik}
              />
            </Flex>
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text="Application type"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Required />
              </Flex>

              <FieldString
                options={["Single", "Family"]}
                formik={formik}
                onChange={(x: any) => {
                  formik?.setFieldValue("applicationType", x);
                  // formik?.setFieldValue("numberOfTravellers", 1);
                  // setFee(
                  //   formik?.values?.numberOfTravellers === 1 ? 20000 : 30000
                  // );
                }}
                placeholder="Select your Application Type "
                name="applicationType"
              />
            </Flex>
          </Flex>
        </Section>

        {/* {formik?.values?.applicationType === "Family" && (
          <Section margin={isMobile ? "0rem" : "0 0 1rem"}>
            <Text
              size={isMobile ? 14 : 16}
              type="p"
              text="Number of Travellers"
               margin={isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"}
            />
            <FieldString
              formik={formik}
              options={Array.from({ length: 6 }, (_, i) => 1 + i)}
              name="numberOfTravellers"
              // onChange={(x) => {
              //   setFee(x > 1 ? 30000 : 20000);
              //   formik.setFieldValue("numberOfTravellers", x);
              // }}
              placeholder="Number of Travellers"
            />
          </Section>
        )} */}

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

export default TripDetails;
