"use client"
import Section from "@molecule/section";
import Flex from "@atom/flex";
import { CustomRadioGroup } from "@atom/radio";
import { useEffect, useState } from "react";
import FlightModule from "@atom/flightModule";
import Button from "@atom/button";
import { HiPlus } from "react-icons/hi2";
import Text from "@atom/text";
import { styled } from "styled-components";
import { useRouter } from "next/navigation";
import sleep from "@lib/sleep";
import Spinner from "@components/icons/spinner";
import { ttColors } from "theme/colors";

const options = [
  { value: "round", label: "Round Trip" },
  { value: "one-way", label: "One Way" },
  { value: "multi-city", label: "Multi-City" },
];

export const ButtonWrapper = styled.div`
  position: absolute;
  left: 35%;
  width: 25%;
  margin-top: 1rem;
`

function Flights() {
  const [value, setValue] = useState("round");
  const [multiCityFlights, setMultiCityFlights] = useState<Array<JSX.Element>>([]);
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

    newIndex > 3 ? '' : setMultiCityFlights([...multiCityFlights, newMultiCityFlight]);
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
    <Section padding="2rem">
      <Flex direction="column">
        <Flex align="center" gap="2rem">
          <CustomRadioGroup
            options={options}
            value={value}
            name="flight"
            onChange={(e: any) => setValue(e.target.value)}
            justifyContent="flex-end"
          />
        </Flex>
        {value === "multi-city" ? (
          <>
            {multiCityFlights}
            <Button
              onClick={handleAddMultiCityFlight}
              padding="2rem .5rem"
              background="transparent"
              border="4px solid #06062A"
              width="15%"
              cursor="pointer"
              
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
            </Button>
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
          padding="2rem"
          cursor="pointer"
          onClick={async () => {
            if (loading) return;
            setLoading(true);
            await sleep(200);
            router.push(`/flight/listings`)
          }}
        >
          {loading ? (
            <Spinner fill={ttColors.primary} size={"45px"} />
          ) :(<Text
            type="p"
            text="Search for flight"
            size={18}
            weight={500}
          />)}
        </Button>
      </ButtonWrapper>
    </Section>
  );
}

export default Flights;
