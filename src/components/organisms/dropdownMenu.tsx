import React, { useEffect, useState } from "react";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ttColors } from "@lib/theme/colors";
import { styled } from "styled-components";
import { useFlightContext } from "@/lib/extensions/context";

const FlightDropdown = styled.section`
  border: 1px solid ${ttColors.gray};
  border-radius: 8px;
  background: white;
  position: absolute;
  width: 20%;
  right: 11.6rem;
  font-family: Poppins;
`;

interface FlightProps {}

function DropdownMenu({}: FlightProps) {
  const [value, setValue] = useState("Economy");

  const context = useFlightContext();
  if (!context) {
    throw new Error("flightContext must be used within a FlightProvider");
  }
  const { state, dispatch } = context;

  const removeAdults = () => {
    if (state.adults > 1) {
      dispatch({ type: "SET_ADULTS", payload: state.adults - 1 });
    }
  };

  const addAdults = () => {
    dispatch({ type: "SET_ADULTS", payload: state.adults + 1 });
  };

  const removeChild = () => {
    if (state.children >= 0) {
      dispatch({ type: "SET_CHILDREN", payload: state.children - 1 });
    }
  };

  const addChild = () => {
    dispatch({ type: "SET_CHILDREN", payload: state.children + 1 });
  };

  const removeInfant = () => {
    if (state.infants >= 0) {
      dispatch({ type: "SET_INFANTS", payload: state.infants - 1 });
    }
  };

  const addInfant = () => {
    dispatch({ type: "SET_INFANTS", payload: state.infants + 1 });
  };

  return (
    <FlightDropdown>
      <Section padding="1rem 1rem 0 1rem">
        <SearchStringInput
          placeholder=""
          options={["Economy", "Business", "First"]}
          onChange={(e: any) => setValue(e)}
          value={value}
          border="bottom"
        />
      </Section>
      <Flex
        direction="column"
        justify="center"
        gap="1rem"
        padding="1rem 2rem 3rem 2rem"
      >
        <Flex align="center" justify="space-between">
          <Flex direction="column" gap=".1rem">
            <Text type="p" text="Adults" weight={500} />
            <Text type="p" text="Ages 18+" size={13} color={ttColors.gray} />
          </Flex>
          <Flex gap=".75rem" align="center" justify="flex-end">
            <AiOutlineMinusCircle
              size={40}
              onClick={removeAdults}
              color={state.adults <= 1 ? ttColors.gray : "#606060"}
            />
            <Text type="p" text={state.adults.toString()} />
            <AiOutlinePlusCircle size={40} onClick={addAdults} />
          </Flex>
        </Flex>
        <Flex align="center" gap="2.5rem">
          <Flex direction="column" gap=".1rem">
            <Text type="p" text="Children" weight={500} />
            <Text type="p" text="Ages 2 - 17" size={13} color={ttColors.gray} />
          </Flex>
          <Flex gap=".75rem" align="center" justify="flex-end">
            <AiOutlineMinusCircle
              size={40}
              onClick={removeChild}
              color={state.children <= 0 ? ttColors.gray : "#606060"}
            />
            <Text type="p" text={state.children.toString()} />
            <AiOutlinePlusCircle size={40} onClick={addChild} />
          </Flex>
        </Flex>
        <Flex align="center" gap="2.5rem">
          <Flex direction="column" gap=".1rem">
            <Text type="p" text="Infant" weight={500} />
            <Text type="p" text="Ages 0 - 2" size={13} color={ttColors.gray} />
          </Flex>
          <Flex gap=".75rem" align="center" justify="flex-end">
            <AiOutlineMinusCircle
              size={40}
              onClick={removeInfant}
              color={state.infants <= 0 ? ttColors.gray : "#606060"}
            />
            <Text type="p" text={state.infants.toString()} />
            <AiOutlinePlusCircle size={40} onClick={addInfant} />
          </Flex>
        </Flex>
      </Flex>
    </FlightDropdown>
  );
}

export default DropdownMenu;
