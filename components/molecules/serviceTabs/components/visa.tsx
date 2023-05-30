import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import SearchInput from "@atom/searchInput";
import Text from "@atom/text";
import Section from "@molecule/section";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useState } from "react";
export interface LabelType {
  name: string;
  flag: string;
  code: string;
}

function Visa() {
  const [value, setValue] = useState<LabelType>({
    name: "Nigerian",
    flag: "🇳🇬",
    code: "NG",
  });
  return (
    <Section>
      <Grid
        gap="2rem"
        justify="space-between"
        columns="1fr 1.5fr 2fr"
        margin="4rem 0 0"
      >
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.name,
            flag: x.flag,
            code: x.code,
          }))}
          legend="Home Country"
          value={value}
          onChange={(value: LabelType) => setValue(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text type="p" text={`${value?.name} - ${value?.code}`} />
          </Flex>
        </SearchInput>
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.name,
            flag: x.flag,
            code: x.code,
          }))}
          legend="Home Country"
          value={value}
          onChange={(value: LabelType) => setValue(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text type="p" text={`${value?.name} - ${value?.code}`} />
          </Flex>
        </SearchInput>
        <SearchInput
          options={COUNTRY_FLAGS.map((x) => ({
            name: x.name,
            flag: x.flag,
            code: x.code,
          }))}
          legend="Home Country"
          value={value}
          onChange={(value: LabelType) => setValue(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text type="p" text={`${value?.name} - ${value?.code}`} />
          </Flex>
        </SearchInput>
      </Grid>
      <Flex justify="flex-end" margin="2rem 0 0">
        <Button width="240px" borderRadius='4px'>
          <Text text="Get Started" type="p" whiteSpace="nowrap" weight={500} />
        </Button>
      </Flex>
    </Section>
  );
}

export default Visa;
