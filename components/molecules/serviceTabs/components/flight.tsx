import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useState } from "react";
export interface CountryType {
  name: string;
  flag: string;
  code: string;
}
export interface LabelType {
  name: string;
  flag: string;
  code: string;
}

function Flights() {
  const [home, setHome] = useState<CountryType>({
    name: "Nigerian",
    flag: "🇳🇬",
    code: "NG",
  });
  const [destination, setDestination] = useState<CountryType>({
    name: "Canada",
    flag: "🇨🇦",
    code: "CA",
  });
  const [type, setType] = useState<string>("Employment");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <Section>
      <Grid
        gap="1rem"
        justify="space-between"
        columns="1fr 1fr 1.5fr"
        margin="4rem 0 0"
      >
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.name,
            flag: x.flag,
            code: x.code,
          }))}
          legend="Home Country"
          value={home}
          onChange={(x: CountryType) => setHome(x)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text
              type="p"
              text={`${home?.name} - ${home?.code}`}
              color="#1C1B1F"
              weight={100}
            />
          </Flex>
        </SearchInput>
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.name,
            flag: x.flag,
            code: x.code,
          })).filter((x) => x.code !== home.code)}
          legend="Destination"
          value={destination}
          onChange={(value: LabelType) => setDestination(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text
              type="p"
              text={`${destination?.name} - ${destination?.code}`}
              color="#1C1B1F"
              weight={100}
            />
          </Flex>
        </SearchInput>
        <SearchInputAsString
          options={["Employment", "Study", "Tourism", "Business", "Transit"]}
          legend="Visa Type"
          value={type}
          onChange={(value: string) => setType(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text type="p" text={`${type}`} color="#1C1B1F" weight={100} />
          </Flex>
        </SearchInputAsString>
      </Grid>
      <Flex justify="flex-end" margin="2rem 0 0">
        <Button width="240px" borderRadius="4px">
          <Text text="Get Started" type="p" whiteSpace="nowrap" weight={500} />
        </Button>
      </Flex>
    </Section>
  );
}

export default Flights;
