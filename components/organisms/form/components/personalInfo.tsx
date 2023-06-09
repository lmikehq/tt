import { DatePicker } from "@atom/datepicker";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import dayjs from "dayjs";
import { FormikValues } from "formik";
import FormStepTitle from "./formStepsTitle";
import Flex from "@atom/flex";
import { FaCircle } from "react-icons/fa";

interface formProps {
  formik: FormikValues;
  steps: string[];
  index: number;
}

function PersonalInfo({ formik, steps, index }: formProps) {
  return (
    <Section width="50%">
      <FormStepTitle steps={steps} index={index} />
      <form style={{ margin: "2rem 0" }}>
        <Flex align="center" gap="2rem">
          <FaCircle size={'.6rem'} color=""/>
          <Text type="p" text=" Include your most recent qualification" />
        </Flex>
        <Section margin="0 0 2rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("home", x)}
          >
            <Text
              type="p"
              text={formik?.values?.home?.name}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>

        <Section margin="0 0 2rem">
          <Text type="p" text="Where to?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("destination", x)}
          >
            <Text
              type="p"
              text={formik?.values?.destination?.name}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>

        <Section margin="0 0 2rem">
          <Text type="p" text="When can you travel?" margin="1rem 0 " />
          <DatePicker
            onChange={(x) => formik.setFieldValue("travelDate", x)}
            value={dayjs(formik?.values?.travelDate || new Date())}
          />
        </Section>
        <Section margin="0 0 2rem">
          <Text type="p" text="Traveling by" margin="1rem 0 " />
          <SearchInputAsString
            options={["Air", "Land", "Sea", "Other"]}
            onChange={(x) => formik.setFieldValue("travellingBy", x)}
          >
            <Text
              type="p"
              text={formik?.values?.travellingBy}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInputAsString>
        </Section>
      </form>
    </Section>
  );
}

export default PersonalInfo;
