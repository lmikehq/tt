import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { FormikValues, useFormik } from "formik";

interface formProps {
  title: string;
  formik: FormikValues;
}

function TripDetails({ title, formik }: formProps) {
  console.log("formik: ", formik.values);
  return (
    <Section width="50%">
      <Text type="p" text={title} size="20px" />
      <form style={{ margin: "2rem 0" }}>
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
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={(x) => formik.setFieldValue("travelDate", x)}
          >
            <Text
              type="p"
              text={formik?.values?.travelDate}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>
        <Section margin="0 0 2rem">
          <Text type="p" text="Traveling by" margin="1rem 0 " />
          <SearchInputAsString
            options={['Air', 'Land', 'Sea', 'Other']}
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

export default TripDetails;
