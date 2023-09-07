"use client";
import Section from "src/components/molecules/section";
import Flex from "src/components/atoms/flex";
import { CustomRadioGroup } from "@molecule/radio";
import { useEffect, useState } from "react";
import FlightModule from "@organism/flightModule";
import Button from "src/components/atoms/button";
import { HiPlus } from "react-icons/hi2";
import Text from "src/components/atoms/text";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import sleep from "src/lib/sleep";
import Spinner from "src/components/icons/spinner";
import { ttColors } from "theme/colors";
import { useScreenResolution } from "hook/useScreenResolution";

const options = [
  { value: "round", label: "Round Trip" },
  { value: "one-way", label: "One Way" },
  { value: "multi-city", label: "Multi-City" },
];

export const ButtonWrapper = styled.div`
  width: 25%;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -24px;

  @media (max-width: 900px) {
    margin-top: 1rem;
    position: static;
    width: 100%;
  }
`;

function Flights() {
  const { isMobile } = useScreenResolution();
  const [value, setValue] = useState("round");
  const [multiCityFlights, setMultiCityFlights] = useState<Array<JSX.Element>>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleAddMultiCityFlight = () => {
    const newIndex = multiCityFlights.length;
    const newMultiCityFlight = (
      <div key={newIndex}>
        <FlightModule
          value={value}
          index={newIndex}
          handleDeleteFlight={handleDeleteFlight}
          length={multiCityFlights.length}
        />
      </div>
    );

    newIndex > 3
      ? ""
      : setMultiCityFlights([...multiCityFlights, newMultiCityFlight]);
  };

  const handleDeleteFlight = (index: number) => {
    setMultiCityFlights((prevFlights) =>
      prevFlights.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    if (value === "multi-city" && multiCityFlights.length === 0) {
      handleAddMultiCityFlight();
    }
  }, [value]);
  return (
    <Section padding={"2rem 0"} styles={{ position: "relative" }}>
      <Flex direction="column">
        <Flex align="center" gap={isMobile ? "1rem" : "2rem"}>
          <CustomRadioGroup
            options={options}
            value={value}
            name="flight"
            onChange={(e: any) => setValue(e.target.value)}
            justifyContent="flex-end"
            align="flex-start"
            direction={isMobile ? "column" : "row"}
          />
        </Flex>
        {value === "multi-city" ? (
          <>
            {multiCityFlights}
            {/* <Button
              onClick={handleAddMultiCityFlight}
              padding="0rem .5rem"
              borderRadius="4px"
              background="transparent"
              border="1px solid #06062A"
              width="fit-content"
              cursor="pointer"
              margin="1.2rem 0 0 0"
            >
              <Flex align="center" gap="1rem" justify="center">
                <HiPlus color="#06062A" size={25} />
                <Text
                  type="p"
                  text="Add Another Flight"
                  font="Montserrat"
                  weight={600}
                  color="#06062A"
                  size={16}
                  whiteSpace="nowrap"
                />
              </Flex>
            </Button> */}
          </>
        ) : (
          <FlightModule
            value={value}
            index={0}
            handleDeleteFlight={() => {}}
            length={0}
          />
        )}
      </Flex>
      <ButtonWrapper>
        <Button
          width="100%"
          cursor="pointer"
          borderRadius="4px"
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await sleep(200);
            router.push(`https://www.booking.com/`);
          }}
        >
          {loading ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) : (
            <Text type="p" text="Search for flight" size={18} weight={500} />
          )}
        </Button>
      </ButtonWrapper>
    </Section>
  );
}

export default Flights;
