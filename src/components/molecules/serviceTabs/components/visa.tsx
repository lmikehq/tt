"use client";
import Button from "@atom/button";
import Flex from "@components/templates/flex";
import { Grid } from "@components/templates/grid";
import SearchInput, { SearchInputAsString } from "@organism/searchInput";
import Text from "@atom/text";
import Spinner from "@molecule/icons/spinner";
import sleep from "@lib/extensions/helpers/sleep";
import Section from "src/components/molecules/section";
import { getIpDetails } from "@organism/form/visaApis";
import { COUNTRY_FLAGS } from "@lib/extensions/data/COUNTRY_FLAGS";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { ttColors } from "@lib/theme/colors";
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
    name: "Nigeria",
    flag: "🇳🇬",
    code: "NG",
  });
  useEffect(() => {
    getIpDetails().then((x: any) =>
      setHome({
        name: x.country || "Nigeria",
        flag: COUNTRY_FLAGS.find((y) => y.code === x.countryCode)?.flag ?? "",
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
    <Section height="unset" padding={"2rem 0 1rem 0"}>
      <Grid
        gap="2rem"
        justify="space-between"
        columns={isMobile ? "1" : "3"}
        margin={"0"}
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
          width={isMobile ? "100%" : "240px"}
          background="#06062A"
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
