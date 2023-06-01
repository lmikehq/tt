import Dropdown from "@atom/dropdown";
import SearchInput from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import React from "react";
interface formProps {
  title: string;
}

function TripDetails({ title }: formProps) {
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
            onChange={() => null}
          >
            <Text
              type="p"
              text={`welcome home`}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>

        <Section margin="0 0 2rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={() => null}
          >
            <Text
              type="p"
              text={`welcome home`}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>

        <Section margin="0 0 2rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={() => null}
          >
            <Text
              type="p"
              text={`welcome home`}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>
        <Section margin="0 0 2rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={() => null}
          >
            <Text
              type="p"
              text={`welcome home`}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>
        <Section margin="0 0 2rem">
          <Text type="p" text="Where are you from?" margin="1rem 0 " />
          <SearchInput
            options={COUNTRY_FLAGS.map((x) => ({
              name: x.name,
              flag: x.flag,
              code: x.code,
            }))}
            onChange={() => null}
          >
            <Text
              type="p"
              text={`welcome home`}
              color="#1C1B1F"
              weight={100}
              styles={{ cursor: "pointer" }}
            />
          </SearchInput>
        </Section>
      </form>
    </Section>
  );
}

export default TripDetails;
