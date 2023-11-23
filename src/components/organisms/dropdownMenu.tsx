import React, { useEffect, useState } from "react";
import SearchStringInput from "src/components/molecules/searchInputs/searchStringInput";
import Section from "src/components/molecules/section";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ttColors } from "@lib/theme/colors";
import { styled } from "styled-components";
import { PiCaretDownBold } from "react-icons/pi";
import { FlightCountType } from "./flightModule";
import { OneFlightType } from "@/lib/extensions/context";

const FlightDropdown = styled.section<{ isMobile: boolean }>`
    border: 1px solid ${ttColors.gray};
    border-radius: 8px;
    background: white;
    position: absolute;
    width: ${(props) => (props.isMobile ? "100%" : "max-content")};
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

interface FlightProps {
    onDataChange: (data: FlightCountType) => void;
    isMobile: boolean;
    data: OneFlightType;
}

function DropdownMenu({ onDataChange, data, isMobile }: FlightProps) {
    const [flightClass, setFlightClass] = useState(data.flightClass);
    const [count, setCount] = useState<FlightCountType>({ ...data });

    const setAdults = (type: "add" | "subtract") => {
        if (type === "subtract") {
            setCount((prev) => {
                const newValue = prev.adults - 1;
                return {
                    ...prev,
                    adults: prev.adults > 1 ? newValue : prev.adults,
                    children:
                        newValue < prev.children ? newValue : prev.children,
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

    const setKids = (
        type: "add" | "subtract",
        field: "children" | "infants"
    ) => {
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
                        newValue <= prev.adults && newValue < 10
                            ? newValue
                            : prev[field],
                };
            });
        }
    };

    const setBaggage = (
        type: "add" | "subtract",
        field: "cabinBaggage" | "checkedBaggage"
    ) => {
        if (type === "subtract") {
            setCount((prev) => ({
                ...prev,
                [field]: prev[field] > 0 ? prev[field] - 1 : prev[field],
            }));
        } else {
            setCount((prev) => ({
                ...prev,
                [field]:
                    prev[field] < (field === "cabinBaggage" ? 1 : 2)
                        ? prev[field] + 1
                        : prev[field],
            }));
        }
    };

    useEffect(() => {
        onDataChange({ ...count, flightClass });
    }, [count, flightClass]);

    return (
        <FlightDropdown isMobile={isMobile}>
            <Section padding="1rem 1rem 0 1rem">
                <SearchStringInput
                    placeholder=""
                    options={[
                        "Economy",
                        "Economy Premium",
                        "Business",
                        "First",
                    ]}
                    onChange={(e: any) => setFlightClass(e)}
                    value={flightClass}
                    border="bottom"
                    icon={<PiCaretDownBold size={22} />}
                />
            </Section>
            <Flex
                direction="column"
                justify="center"
                gap="1rem"
                padding="1rem 2rem 3rem 2rem"
            >
                <Flex align="center" gap="1rem" justify="space-between">
                    <Flex direction="column" gap=".1rem" width="60%">
                        <Text type="p" size={15} text="Adults" weight={500} />
                        <Text
                            type="p"
                            text="Ages 12+"
                            size={13}
                            color={ttColors.gray}
                        />
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
                        <Text
                            type="p"
                            text="Ages 2 - 11"
                            size={13}
                            color={ttColors.gray}
                        />
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
                        <Text
                            type="p"
                            text="Ages 0 - 2"
                            size={13}
                            color={ttColors.gray}
                        />
                    </Flex>
                    <Counter
                        value={count.infants.toString()}
                        onAdd={() => setKids("add", "infants")}
                        onSubtract={() => setKids("subtract", "infants")}
                        disabledAdd={count.infants === 10}
                        disabledSubtract={count.infants <= 0}
                    />
                </Flex>

                <Flex padding="14px 0px" maxWidth="290px">
                    <Text
                        type="p"
                        text="Your age at time of travel must be valid for the age category booked."
                        size={14}
                        color={ttColors.gray}
                    />
                </Flex>

                <Flex padding="0px">
                    <Text type="p" text="Bags" size={20} weight={600} />
                </Flex>

                <Flex align="center" gap="1rem" justify="space-between">
                    <Flex direction="column" gap=".1rem" width="60%">
                        <Text
                            type="p"
                            size={15}
                            text="Cabin baggage"
                            weight={500}
                        />
                    </Flex>
                    <Counter
                        value={count.cabinBaggage.toString()}
                        onAdd={() => setBaggage("add", "cabinBaggage")}
                        onSubtract={() =>
                            setBaggage("subtract", "cabinBaggage")
                        }
                        disabledAdd={count.cabinBaggage === 10}
                        disabledSubtract={count.cabinBaggage <= 0}
                    />
                </Flex>

                <Flex align="center" gap="1rem" justify="space-between">
                    <Flex direction="column" gap=".1rem" width="60%">
                        <Text
                            type="p"
                            size={15}
                            text="Checked baggage"
                            weight={500}
                        />
                    </Flex>
                    <Counter
                        value={count.checkedBaggage.toString()}
                        onAdd={() => setBaggage("add", "checkedBaggage")}
                        onSubtract={() =>
                            setBaggage("subtract", "checkedBaggage")
                        }
                        disabledAdd={count.checkedBaggage === 10}
                        disabledSubtract={count.checkedBaggage <= 0}
                    />
                </Flex>
            </Flex>
        </FlightDropdown>
    );
}

export default DropdownMenu;
