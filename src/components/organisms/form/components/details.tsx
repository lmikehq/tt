import Flex from "@components/templates/flex";
import Text from "@atom/text";
import Section from "src/components/molecules/section";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { FormikProps, FormikValues, useFormik } from "formik";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import FormStepTitle from "./formStepsTitle";
import Required from "@atom/required";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import SearchFlagInput from "src/components/molecules/searchInputs/searchFlagInput";
import { detailsKeys, detailsSchema } from "@lib/types/schema";
import { DetailsKeys, Mode } from "@lib/types";
import { FieldAsString, FieldString } from "@organism/fieldInput";
import Button from "@atom/button";
import Spinner from "@molecule/icons/spinner";
import { ttColors } from "@lib/theme/colors";
import { useRouter, useSearchParams } from "next/navigation";
import ContinueButton from "@organism/continueButton";
import { useApplicationFormStore } from "@lib/store/application-form.store";

interface formProps {
  steps: string[];
  index: number;
  persistForm: () => void;
  formik: FormikProps<DetailsKeys>;
}

function TripDetails({ steps, index, persistForm, formik }: formProps) {
  const { isMobile } = useScreenResolution();
  const router = useRouter();
  const { form, nextStep, saveProgress, mode } = useApplicationFormStore(
    (state) => state
  );
  const { tripDetails } = form;
  const isLoading = mode == Mode.loading;

  return (
    <Section height="unset">
      <FormStepTitle steps={steps} index={index} padding="0 0 2rem 0" />
      <form onSubmit={formik.handleSubmit}>
        <Section>
          <Flex
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  type="p"
                  text="Where are you from?"
                  margin={isMobile ? "0rem  0 .2rem" : "1rem 0 .5rem"}
                  size={isMobile ? 16 : 16}
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
                  size={isMobile ? 16 : 16}
                  type="p"
                  text="Where to?"
                  margin={isMobile ? "0rem  0 .2rem" : "1rem 0 .5rem"}
                />
                <Required />
              </Flex>
              <FieldAsString
                formik={formik}
                options={COUNTRY_FLAGS.filter(
                  (el) => el.name != formik.values.homeCountry.name
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
          <Flex
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? "0px" : "1.5rem"}
          >
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 16 : 16}
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
                  size={isMobile ? 16 : 16}
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
              size={isMobile ? 16 : 16}
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
          onClick={() => {}}
          disabled={!formik.isValid}
          saveProgress={persistForm}
        />
      </form>
    </Section>
  );
}

export default TripDetails;
