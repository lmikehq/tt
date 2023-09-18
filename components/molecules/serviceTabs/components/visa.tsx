"use client";
import Button from "@atom/button";
import Flex from "@atom/flex";
import { Grid } from "@atom/grid";
import SearchInput, { SearchInputAsString } from "@atom/searchInput";
import Text from "@atom/text";
import Spinner from "@components/icons/spinner";
import sleep from "@lib/sleep";
import Section from "@molecule/section";
import { getIpDetails } from "@organism/form/visaApis";
import { COUNTRY_FLAGS } from "data/COUNTRY_FLAGS";
import { useScreenResolution } from "hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ttColors } from "theme/colors";
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

function Visa() {
  const [home, setHome] = useState<CountryType>({
    name: "Nigerian",
    flag: "🇳🇬",
    code: "NG",
  });
  useEffect(() => {
    getIpDetails().then((x: any) =>
      setHome({
        name: x.country || "Nigerian",
        flag: COUNTRY_FLAGS.find((y) => y.code === x.countryCode)?.flag,
        code: x.country_code || "NG",
      })
    );
  }, []);
  const [destination, setDestination] = useState<CountryType>({
    name: "Canada",
    flag: "🇨🇦",
    code: "CA",
  });
  const [type, setType] = useState<string>("Work");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { isMobile } = useScreenResolution();
  return (
    <Section height="unset">
      <Grid
        gap="2rem"
        justify="space-between"
        columns={isMobile ? "1" : "3"}
        margin="3rem 0 0"
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
            <IoIosArrowDown size={20} />
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
            <IoIosArrowDown size={20} />
          </Flex>
        </SearchInput>
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
          legend="Visa Type"
          value={type}
          onChange={(value: string) => setType(value)}
        >
          <Flex gap=".6rem" justify="space-between" cursor="pointer">
            <Text type="p" text={`${type}`} color="#1C1B1F" weight={100} />
            <IoIosArrowDown size={20} />
          </Flex>
        </SearchInputAsString>
      </Grid>
      <Flex justify={isMobile ? "center" : "flex-end"} margin="2rem 0 0">
        <Button
          width="240px"
          borderRadius="4px"
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await sleep(200);
            router.push(
              `visa/apply?home=${home.name}&destination=${destination.name}&visaType=${type}`
            );
          }}
        >
          {loading ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text
              text="Get Started"
              type="p"
              whiteSpace="nowrap"
              weight={500}
            />
          )}
        </Button>
      </Flex>
    </Section>
  );
}

export default Visa;
