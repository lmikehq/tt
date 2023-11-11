import React, { useEffect, useState } from "react";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ttColors } from "@lib/theme/colors";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { RoomCountType } from "../molecules/serviceTabs/components/stays";

const FlightDropdown = styled.section<{ isMobile: boolean }>`
  border: 1px solid ${ttColors.gray};
  border-radius: 8px;
  background: white;
  position: absolute;
  width: ${(props) => (props.isMobile ? "100%" : "30%")};
  right: 0rem;
  font-family: Poppins;
  z-index: 2;
`;

interface CounterProps {
  value: string;
  onAdd: () => void;
  onSubtract: () => void;
  disabledAdd: boolean;
  disabledSubtract: boolean;
  isMobile?: boolean;
}

type StaysMenuData = {
  adults: number;
  children: number;
  infants: number;
  rooms: number;
};
function Counter({
  value,
  onAdd,
  onSubtract,
  disabledAdd,
  disabledSubtract,
  isMobile,
}: CounterProps) {
  return (
    <Flex
      maxWidth="40%"
      gap="1rem"
      align="center"
      justify={isMobile ? "space-between" : "flex-end"}
    >
      <AiOutlineMinusCircle
        size={32}
        onClick={onSubtract}
        cursor={disabledSubtract ? "initial" : "pointer"}
        color={disabledSubtract ? ttColors.gray : "#606060"}
      />
      <Flex width="10%" justify="center">
        <Text type="p" text={value} />
      </Flex>
      <AiOutlinePlusCircle
        size={32}
        onClick={onAdd}
        cursor={disabledAdd ? "initial" : "pointer"}
        color={disabledAdd ? ttColors.gray : "#606060"}
      />
    </Flex>
  );
}

interface StaysMenuProps {
  onDataChange: (data: any) => void;
  isMobile: boolean;
  data: StaysMenuData;
}

function StaysMenu({ onDataChange, data }: StaysMenuProps) {
  const { isMobile } = useScreenResolution();

  const [count, setCount] = useState<RoomCountType>({ ...data });

  const setAdults = (type: "add" | "subtract") => {
    if (type === "subtract") {
      setCount((prev) => {
        const newValue = prev.adults - 1;
        return {
          ...prev,
          adults: prev.adults > 1 ? newValue : prev.adults,
          children: newValue < prev.children ? newValue : prev.children,
          infants: newValue < prev.infants ? newValue : prev.infants,
        };
      });
    } else {
      setCount((prev) => ({
        ...prev,
        adults: prev.adults < 10 ? prev.adults + 1 : prev.adults,
      }));
    }
  };

  const setKids = (type: "add" | "subtract", field: "children" | "infants") => {
    if (type === "subtract") {
      setCount((prev) => ({
        ...prev,
        [field]: prev[field] > 0 ? prev[field] - 1 : prev[field],
      }));
    } else {
      setCount((prev) => {
        const newValue = prev[field] + 1;
        return {
          ...prev,
          [field]:
            newValue <= prev.adults && newValue < 10 ? newValue : prev[field],
        };
      });
    }
  };

  const setRooms = (type: "add" | "subtract", field: "rooms") => {
    if (type === "subtract") {
      setCount((prev) => ({
        ...prev,
        [field]: prev[field] > 0 ? prev[field] - 1 : prev[field],
      }));
    } else {
      setCount((prev) => ({
        ...prev,
        [field]: prev[field] < 10 ? prev[field] + 1 : prev[field],
      }));
    }
  };

  useEffect(() => {
    onDataChange({ count });
  }, [count]);

  return (
    <FlightDropdown isMobile={isMobile}>
      <Flex
        direction="column"
        justify="center"
        gap="1rem"
        padding="1rem 2rem 3rem 2rem"
      >
        <Flex align="center" gap="1rem" justify="space-between">
          <Flex direction="column" gap=".1rem" width="60%">
            <Text type="p" size={15} text="Adults" weight={500} />
            <Text type="p" text="Ages 18+" size={13} color={ttColors.gray} />
          </Flex>
          <Counter
            value={count.adults.toString()}
            onAdd={() => setAdults("add")}
            onSubtract={() => setAdults("subtract")}
            disabledAdd={count.adults === 10}
            disabledSubtract={count.adults <= 1}
          />
        </Flex>

        <Flex align="center" gap="1rem" justify="space-between">
          <Flex direction="column" gap=".1rem" width="60%">
            <Text type="p" size={15} text="Children" weight={500} />
            <Text type="p" text="Ages 2 - 11" size={13} color={ttColors.gray} />
          </Flex>
          <Counter
            value={count.children.toString()}
            onAdd={() => setKids("add", "children")}
            onSubtract={() => setKids("subtract", "children")}
            disabledAdd={count.children === 10}
            disabledSubtract={count.children <= 0}
          />
        </Flex>

        <Flex align="center" gap="1rem" justify="space-between">
          <Flex direction="column" gap=".1rem" width="60%">
            <Text type="p" size={15} text="Infants" weight={500} />
            <Text type="p" text="Ages 0 - 2" size={13} color={ttColors.gray} />
          </Flex>
          <Counter
            value={count.infants.toString()}
            onAdd={() => setKids("add", "infants")}
            onSubtract={() => setKids("subtract", "infants")}
            disabledAdd={count.infants === 10}
            disabledSubtract={count.infants <= 0}
          />
        </Flex>
      </Flex>
    </FlightDropdown>
  );
}

export default StaysMenu;
