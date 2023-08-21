import Flex from "@atom/flex";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { FormikValues } from "formik";
import { useScreenResolution } from "hook/useScreenResolution";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import FormStepTitle from "./formStepsTitle";
import Required from "@atom/required";
import SearchStringInput from "@molecule/searchInputs/searchStringInput";
import SearchFlagInput from "@molecule/searchInputs/searchFlagInput";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
  setFee: (n: number) => void;
}

function TripDetails({ formik, steps, index, setFee }: formProps) {
  const { isMobile } = useScreenResolution();

  return (
    <Section height="unset">
      <FormStepTitle steps={steps} index={index} />
      <form autoComplete="off">
        <Section margin={isMobile ? "0rem" : "0 0 1rem"}>
          <Flex gap="1rem">
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  type="p"
                  text="Where are you from?"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
                  size={isMobile ? 14 : 16}
                />
                <Required />
              </Flex>
              <SearchFlagInput
                value={formik.values.home.name}
                options={COUNTRY_FLAGS.map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                onChange={(x) => {
                  console.log(formik.values.home.name);
                  formik.setFieldValue("home", x);
                }}
                placeholder="Select where you are"
                size={isMobile ? 14 : 16}
              />
            </Flex>
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text="Where to?"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
                />
                <Required />
              </Flex>
              <SearchFlagInput
                options={COUNTRY_FLAGS.filter(
                  (el) => el.name != formik.values.home.name
                ).map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                size={isMobile ? 14 : 16}
                value={formik.values.destination.name}
                onChange={(x) => formik.setFieldValue("destination", x)}
                placeholder="Select Final destination"
                disabled={!formik.values.home.name}
              />
            </Flex>
          </Flex>
        </Section>
        <Section margin={isMobile ? "0rem" : "0 0 1rem"}>
          <Flex gap="1rem" align="center">
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 18}
                  type="p"
                  text="Visa type"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
                />
                <Required />
              </Flex>
              <SearchStringInput
                value={formik.values.visaType}
                placeholder={"Select your Visa Type"}
                onChange={(x) => formik.setFieldValue("visaType", x)}
                size={isMobile ? 14 : 16}
                options={[
                  "Tourist Visa",
                  "Business Visa",
                  "Transit Visa",
                  "Work Visa",
                  "Student Visa",
                  "Medical Visa",
                  "Visa on Arrival",
                  "Other",
                ]}
              />
            </Flex>
            <Flex direction="column">
              <Flex align="center" gap="0.25rem">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text="Application type"
                  margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
                />
                <Required />
              </Flex>
              <SearchStringInput
                size={isMobile ? 14 : 16}
                options={["Single", "Family"]}
                onChange={(x) => {
                  formik?.setFieldValue("applicationType", x);
                  formik?.setFieldValue("numberOfTravellers", 1);
                  setFee(
                    formik?.values?.numberOfTravellers === 1 ? 20000 : 30000
                  );
                }}
                placeholder="Select your Application Type "
              />
            </Flex>
          </Flex>
        </Section>

        {formik?.values?.applicationType === "Family" && (
          <Section margin={isMobile ? "0rem" : "0 0 1rem"}>
            <Text
              size={isMobile ? 14 : 16}
              type="p"
              text="Number of Travellers"
              margin={isMobile ? ".7rem  0 .2rem" : "1rem 0"}
            />
            <SearchStringInput
              size={isMobile ? 14 : 16}
              value={formik?.values?.numberOfTravellers}
              options={Array.from({ length: 6 }, (_, i) => 1 + i)}
              onChange={(x) => {
                setFee(x > 1 ? 30000 : 20000);
                formik.setFieldValue("numberOfTravellers", x);
              }}
              placeholder="Number of Travellers"
            />
          </Section>
        )}
      </form>
    </Section>
  );
}

export default TripDetails;
