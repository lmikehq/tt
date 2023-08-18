import Flex from "@atom/flex";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { FormikValues } from "formik";
import { useScreenResolution } from "hook/useScreenResolution";
import { AiOutlineCheck } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import FormStepTitle from "./formStepsTitle";
import Required from "@atom/required";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
  setFee: (n: number) => void;
}

function TripDetails({ formik, steps, index, setFee }: formProps) {
  const { isMobile } = useScreenResolution();

  // console.log(formik)
  return (
    <Section width={isMobile ? "100%" : "75%"} height="unset">
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
              <SearchInput
                value={formik.values.home}
                placeholder="Select where you are"
                options={COUNTRY_FLAGS.map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                height="8px"
                onChange={(x) => formik.setFieldValue("home", x)}
              >
                <Flex justify="space-between" width="100%">
                  <Text
                    type="p"
                    text={formik?.values?.home?.name}
                    color="#1C1B1F"
                    weight={100}
                    size={isMobile ? 14 : 16}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik?.values?.home?.name ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInput>
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
              <SearchInput
                options={COUNTRY_FLAGS.map((x) => ({
                  name: x.name,
                  flag: x.flag,
                  code: x.code,
                }))}
                height="8px"
                value={formik.values.destination}
                placeholder="Select Final Destination"
                onChange={(x) => formik.setFieldValue("destination", x)}
              >
                <Flex justify="space-between">
                  <Text
                    size={isMobile ? 14 : 16}
                    type="p"
                    text={formik?.values?.destination?.name}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik?.values?.destination?.name ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInput>
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
              <SearchInputAsString
                height="8px"
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
                placeholder={
                  !formik.values.visaType ? "Select your Visa Type" : ""
                }
                onChange={(x) => formik.setFieldValue("visaType", x)}
              >
                <Flex justify="space-between">
                  <Text
                    size={isMobile ? 14 : 16}
                    type="p"
                    text={formik?.values?.visaType}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik?.values?.visaType ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
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
              <SearchInputAsString
                height="8px"
                options={["Single", "Family"]}
                onChange={(x) => {
                  formik?.setFieldValue("applicationType", x);
                  formik?.setFieldValue("numberOfTravellers", 1);
                  setFee(
                    formik?.values?.numberOfTravellers === 1 ? 20000 : 30000
                  );
                }}
                placeholder="Select your Application Type "
              >
                <Flex justify="space-between">
                  <Text
                    size={isMobile ? 14 : 16}
                    type="p"
                    text={formik?.values?.applicationType}
                    color="#1C1B1F"
                    weight={100}
                    styles={{ cursor: "pointer" }}
                  />
                  {formik?.values?.applicationType ? (
                    <AiOutlineCheck color="#3BB98E" />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </Flex>
              </SearchInputAsString>
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
            <SearchInputAsString
              height="8px"
              options={Array.from({ length: 6 }, (_, i) => 1 + i)}
              onChange={(x) => {
                setFee(x > 1 ? 30000 : 20000);
                formik.setFieldValue("numberOfTravellers", x);
              }}
            >
              <Flex justify="space-between">
                <Text
                  size={isMobile ? 14 : 16}
                  type="p"
                  text={formik?.values?.numberOfTravellers}
                  color="#1C1B1F"
                  weight={100}
                  styles={{ cursor: "pointer" }}
                />
                {formik?.values?.numberOfTravellers ? (
                  <AiOutlineCheck color="#3BB98E" />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </Flex>
            </SearchInputAsString>
          </Section>
        )}
      </form>
    </Section>
  );
}

export default TripDetails;
