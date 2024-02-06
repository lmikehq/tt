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
import { Select } from "@mui/material";

const FlightDropdown = styled.section<{ isMobile: boolean; stays?: boolean; }>`
    border: 1px solid ${ttColors.gray};
    border-radius: 8px;
    background: white;
    position: absolute;
    width: ${(props) => (props.isMobile ? "100%" : props.stays ? '30%' : "30%")};
    right: 0rem;
    font-family: Poppins;
    z-index: 2;
`;

// position: relative;
// width: 100px;
// height: 48px;
// border-radius: 4px;
// border: none;
// outline: none;
// text-transform: lowercase;
// color: #101010;
// background: #e7e7e7;
// text-align: left;
// padding: 0 10px;
// font-size: 16px;
// cursor: pointer;

// &::after {
//     position: absolute;
//     right: 40px;
//     top: 50%;
//     transform: translateY(-50%) rotate(45deg);
//     width: 16px;
//     height: 16px;
//     border-right: 4px solid #101010;
//     border-bottom: 4px solid #101010;
// }
const SelectWrapper = styled.select`
    display: block;
    width: 100px;
    height: 48px;
    border-radius: 4px;
    border: none;
    outline: none;
    color: #101010;
    font-size: 16px;
    cursor: pointer;
    padding: 0 0.7rem;
    text-transform: lowercase;
    border: none;
    background: url("/assets/icons/chevron_down.svg") no-repeat #e7e7e7;
    background-position: right 0.4rem center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
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
                onClick={disabledAdd ? () => {} : onAdd}
                cursor={disabledAdd ? "initial" : "pointer"}
                color={disabledAdd ? ttColors.gray : "#606060"}
            />
        </Flex>
    );
}

interface StaysMenuProps {
    staysView?: boolean
}

function StaysMenu({ staysView }: StaysMenuProps) {
    const { isMobile } = useScreenResolution();

    const {
        stayTabInitialSearchQuery: { roomForGuests },
        addNewGuestRoom,
        deleteGuestRoom,
        updateGuestRoom,
    } = useStaySearchStore((state) => state);

    return (
        <FlightDropdown isMobile={isMobile} stays={staysView}>
            <Section
                padding=" 2rem"
                maxHeight="22rem"
                styles={{ overflowY: "auto" }}
            >
                <Flex direction="column" gap="2rem">
                    {roomForGuests.map((el, index) => (
                        <Section key={index}>
                            <Text
                                type="h5"
                                size={18}
                                weight={500}
                                text={"Room " + (index + 1)}
                                margin={" 0 0 1rem  0"}
                            />
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
                                            size={16}
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
                                                    adults: Math.min(el.adults + 1, 10),
                                                },
                                            })
                                        }
                                        onSubtract={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    adults: Math.max(el.adults - 1, 1),
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
                                            size={16}
                                            text="Children"
                                            weight={500}
                                        />
                                        <Text
                                            type="p"
                                            text="Ages 0 - 17"
                                            size={13}
                                            color={ttColors.gray}
                                        />
                                    </Flex>
                                    <Counter
                                        value={el.children.length.toString()}
                                        onAdd={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    children: [
                                                        ...el.children,
                                                        1,
                                                    ],
                                                },
                                            })
                                        }
                                        onSubtract={() =>
                                            updateGuestRoom({
                                                index,
                                                roomForGuest: {
                                                    ...el,
                                                    children: (() => {
                                                        el.children.splice(
                                                            el.children.length - 1,
                                                            1
                                                        );
                                                        return el.children;
                                                    })(),
                                                },
                                            })
                                        }
                                        disabledAdd={el.children.length === 4}
                                        disabledSubtract={
                                            el.children.length <= 1
                                        }
                                    />
                                </Flex>
                            </Flex>
                            {el.children.length != 0 && (
                                <Section margin="2rem 0 0">
                                    <Text
                                        type="p"
                                        text="Select Children Age"
                                        size={16}
                                        weight={500}
                                        margin="0 0 1rem 0"
                                    />

                                    <Flex gap="1rem" wrap="wrap">
                                        {el.children.map((element, i) => (
                                            <SelectWrapper
                                                className="select"
                                                key={index}
                                                onChange={(e) => {
                                                    const value = parseInt(
                                                        e.target.value
                                                    );
                                                    const children =
                                                        roomForGuests[index]
                                                            .children;
                                                    children[i] = value;
                                                    updateGuestRoom({
                                                        index,
                                                        roomForGuest: {
                                                            ...el,
                                                            children,
                                                        },
                                                    });
                                                }}
                                                value={
                                                    roomForGuests[index]
                                                        .children[i] ?? 1
                                                }
                                            >
                                                {Array.from(
                                                    { length: 18 },
                                                    (_el, index) => (
                                                        <option
                                                            key={
                                                                "room-" +
                                                                index +
                                                                "-child-" +
                                                                i
                                                            }
                                                            value={index}
                                                            style={{
                                                                textTransform:
                                                                    "lowercase",
                                                            }}
                                                        >
                                                            {index +
                                                                " year" +
                                                                (index == 1
                                                                    ? ""
                                                                    : "s")}
                                                        </option>
                                                    )
                                                )}
                                            </SelectWrapper>
                                        ))}
                                    </Flex>
                                </Section>
                            )}
                            {index != 0 && (
                                <Button
                                    border={"solid 1px " + ttColors.red}
                                    color={ttColors.red}
                                    background="transparent"
                                    onClick={() => deleteGuestRoom({ index })}
                                    margin="1rem 0 0rem 0"
                                >
                                    Delete
                                </Button>
                            )}
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
