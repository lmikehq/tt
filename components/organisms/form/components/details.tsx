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

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
  setFee: (n: number) => void;
}

function TripDetails({ formik, steps, index, setFee }: formProps) {
  const { isMobile } = useScreenResolution();
  console.log("formike: ", formik.values);
  return (
    <Section width={isMobile ? "100%" : "50%"}>
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <Section margin="0 0 1rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("home", x)}
          >
            <Flex justify="space-between">
              <Text
                type="p"
                text={formik?.values?.home?.name}
                color="#1C1B1F"
                weight={100}
                styles={{ cursor: "pointer" }}
              />
              {formik?.values?.home?.name ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </Flex>
          </SearchInput>
        </Section>
        <Section margin="0 0 1rem">
          <Text type="p" text="Where to?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("destination", x)}
          >
            <Flex justify="space-between">
              <Text
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
        </Section>
        <Section margin="0 0 1rem">
          <Text type="p" text="Visa type" margin="1rem 0 " />
          <SearchInputAsString
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
            onChange={(x) => formik.setFieldValue("visaType", x)}
          >
            <Flex justify="space-between">
              <Text
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
        </Section>
        <Section margin="0 0 1rem">
          <Text type="p" text="Application type" margin="1rem 0 " />
          <SearchInputAsString
            options={["Single", "Family"]}
            onChange={(x) => formik.setFieldValue("applicationType", x)}
          >
            <Flex justify="space-between">
              <Text
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
        </Section>
        {formik?.values?.applicationType === "Family" && (
          <Section margin="0 0 1rem">
            <Text type="p" text="Number of Travellers" margin="1rem 0 " />
            <SearchInputAsString
              options={Array.from({ length: 6 }, (_, i) => 1 + i)}
              onChange={(x) => {
                setFee(x > 1 ? 30000 : 20000);
                formik.setFieldValue("numberOfTravellers", x);
              }}
            >
              <Flex justify="space-between">
                <Text
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
        <Section margin="0 0 1rem">
          <Text type="p" text="Traveling by" margin="1rem 0 " />
          <SearchInputAsString
            options={["Air", "Land", "Sea", "Other"]}
            onChange={(x) => formik.setFieldValue("travellingBy", x)}
          >
            <Flex justify="space-between">
              <Text
                type="p"
                text={formik?.values?.travellingBy}
                color="#1C1B1F"
                weight={100}
                styles={{ cursor: "pointer" }}
              />
              {formik?.values?.travellingBy ? (
                <AiOutlineCheck color="#3BB98E" />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </Flex>
          </SearchInputAsString>
        </Section>
      </form>
    </Section>
  );
}

export default TripDetails;
