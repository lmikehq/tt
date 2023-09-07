import React, { useEffect, useState } from "react";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ttColors } from "theme/colors";
import { styled } from "styled-components";

const FlightDropdown = styled.section`
  border: 1px solid ${ttColors.gray};
  border-radius: 8px;
  background: white;
  position: absolute;
  width: 20%;
  right: 11.6rem;
  font-family: Poppins;
`;

interface FlightProps {
  onDataChange: (data: any) => void;
}

function DropdownMenu({ onDataChange }: FlightProps) {
  const [value, setValue] = useState("Economy");
  const [count, setCount] = useState({
    adults: 1,
    children: 0,
  });

  const removeAdults = () => {
    if (count.adults > 1) {
      setCount((prev) => ({ ...prev, adults: prev.adults - 1 }));
    }
  };

  const addAdults = () => {
    setCount((prev) => ({ ...prev, adults: prev.adults + 1 }));
  };

  const removeChild = () => {
    if (count.children >= 0) {
      setCount((prev) => ({ ...prev, children: prev.children - 1 }));
    }
  };

  const addChild = () => {
    setCount((prev) => ({ ...prev, children: prev.children + 1 }));
  };

  useEffect(() => {
    onDataChange({ count, class: value });
  }, [count, value]);

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
              color={count.adults <= 1 ? ttColors.gray : "#606060"}
            />
            <Text type="p" text={count.adults.toString()} />
            <AiOutlinePlusCircle size={40} onClick={addAdults} />
          </Flex>
        </Flex>
        <Flex align="center" gap="2.5rem">
          <Flex direction="column" gap=".1rem">
            <Text type="p" text="Children" weight={500} />
            <Text type="p" text="Ages 0 - 17" size={13} color={ttColors.gray} />
          </Flex>
          <Flex gap=".75rem" align="center" justify="flex-end">
            <AiOutlineMinusCircle
              size={40}
              onClick={removeChild}
              color={count.children <= 0 ? ttColors.gray : "#606060"}
            />
            <Text type="p" text={count.children.toString()} />
            <AiOutlinePlusCircle size={40} onClick={addChild} />
          </Flex>
        </Flex>
      </Flex>
    </FlightDropdown>
  );
}

export default DropdownMenu;
