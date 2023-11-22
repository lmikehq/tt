import React, { useEffect, useState } from "react";
import Flex from "@components/templates/flex";
import Text from "@atom/text";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { ttColors } from "@lib/theme/colors";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { useStaySearchStore } from "@/lib/store/stay/search.store";
import Section from "../molecules/section";
import Button from "../atoms/button";

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

interface StaysMenuProps {}

function StaysMenu() {
    const { isMobile } = useScreenResolution();

    const {
        stayTabInitialSearchQuery: { roomForGuests },
        addNewGuestRoom,
        deleteGuestRoom,
        updateGuestRoom,
    } = useStaySearchStore((state) => state);

    return (
        <FlightDropdown isMobile={isMobile}>
            <Section
                padding=" 2rem"
                maxHeight="37.5rem"
                styles={{ overflowY: "auto" }}
            >
                <Flex direction="column" gap="1rem">
                    {roomForGuests.map((el, index) => (
                        <Section key={index}>
                            {index != 0 && (
                                <Button
                                    border={"solid 1px " + ttColors.red}
                                    color={ttColors.red}
                                    background="transparent"
                                    onClick={() => deleteGuestRoom({ index })}
                                    margin="0 0 1rem 0"
                                >
                                    Delete
                                </Button>
                            )}

                            <Flex
                                direction="column"
                                justify="center"
                                gap="1rem"
                            >
                                <Flex
                                    align="center"
                                    gap="1rem"
                                    justify="space-between"
                                >
                                    <Flex
                                        direction="column"
                                        gap=".1rem"
                                        width="60%"
                                    >
                                        <Text
                                            type="p"
                                            size={15}
                                            text="Adults"
                                            weight={500}
                                        />
                                        <Text
                                            type="p"
                                            text="Ages 18+"
                                            size={13}
                                            color={ttColors.gray}
                                        />
                                    </Flex>
                                    <Counter
                                        value={el.adults.toString()}
                                        onAdd={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    adults: el.adults + 1,
                                                },
                                            })
                                        }
                                        onSubtract={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    adults: el.adults - 1,
                                                },
                                            })
                                        }
                                        disabledAdd={el.adults === 6}
                                        disabledSubtract={el.adults <= 1}
                                    />
                                </Flex>

                                <Flex
                                    align="center"
                                    gap="1rem"
                                    justify="space-between"
                                >
                                    <Flex
                                        direction="column"
                                        gap=".1rem"
                                        width="60%"
                                    >
                                        <Text
                                            type="p"
                                            size={15}
                                            text="Children"
                                            weight={500}
                                        />
                                        <Text
                                            type="p"
                                            text="Ages 2 - 11"
                                            size={13}
                                            color={ttColors.gray}
                                        />
                                    </Flex>
                                    <Counter
                                        value={el.children.toString()}
                                        onAdd={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    children: el.children + 1,
                                                },
                                            })
                                        }
                                        onSubtract={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    children: el.children - 1,
                                                },
                                            })
                                        }
                                        disabledAdd={el.children === 4}
                                        disabledSubtract={el.children <= 1}
                                    />
                                </Flex>
                            </Flex>
                        </Section>
                    ))}
                </Flex>
                <Section margin="2rem 0 0 0">
                    <Button width="100%" onClick={() => addNewGuestRoom()}>
                        Add Room
                    </Button>
                </Section>
            </Section>
        </FlightDropdown>
    );
}

export default StaysMenu;
