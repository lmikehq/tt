import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import DropdownButton from "./DropdownButton";
import { BsArrowRight, BsCheck2 } from "react-icons/bs";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import { ttColors } from "@/lib/theme/colors";
import {
    Combinations,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import { FormikProps } from "formik";
import {
    PassengerCategory,
    Combination,
    Passenger,
    PassengerBaggageCombinationInterface,
    PassengerFormInterface,
} from "@/lib/types/request-models/flight/booking.type";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import styled from "styled-components";
import Image from "@/components/atoms/image";
import { useEffect, useState } from "react";
import CheckBox from "@/components/molecules/checkbox";
import { ToastInfo } from "../flight/booking/toast";
import { PiWarningCircleBold } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { capCase } from "@/lib/utilFns";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

interface PassengerBaggagePaneProps {
    index: number;
    values: PassengerFormInterface;
    combinationOptions: Combinations;
    count: number;
    passengerBagCombination: PassengerBaggageCombinationInterface;
    handleUpdatePassengersBagCombination(params: {
        index: number;
        combination: Combination;
        category: string;
    }): void;
    checkedBags: {
        order: { [key: number]: number[] };
        definition?: Definitions;
    };
    handleCheckedBags: (
        index: number,
        value: number[],
        bagDef?: Definitions
    ) => void;
    removePassenger: (index: number) => void;
}

const BaggageBox = styled.div<{ active: boolean }>`
    padding: 2rem 1rem;
    border: 2px solid
        ${({ active }) => (active ? ttColors.primary : ttColors.lightestGray)};
    border-radius: 10px;
    position: relative;
    width: 100%;
    cursor: pointer;
`;

const BaggageText = styled.div`
    background: ${ttColors.primary600};
    position: absolute;
    color: white;
    top: -1rem;
    text-align: center;
    left: 50%;
    transform: translate(-50%);
    padding: 0.5rem 1rem;
    border-radius: 30px;
`;

const CustomRadioButton = styled.input.attrs({ type: "radio" })`
    width: 2rem;
    height: 2rem;
    appearance: none;
    border: 1px solid #87ceeb;
    border-radius: 100%;
    padding: 0.25rem;

    &:checked {
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background-color: #87ceeb;
        }
    }
`;

export default function PassengerBaggagePane({
    index,
    values,
    count,
    combinationOptions,
    passengerBagCombination,
    handleUpdatePassengersBagCombination,
    checkedBags,
    handleCheckedBags,
    removePassenger,
}: PassengerBaggagePaneProps) {
    const { checkFlightsResponse, conversionRate } = useFlightBookingStore(
        (state) => state
    );
    const { preFerredCurrency } = useUserPreferencesStore((state) => state);

    const { isMobile } = useScreenResolution();
    const bagDefinitions = checkFlightsResponse?.baggage.definitions;

    const newBags = {
        // handBags: checkFlightsResponse?.baggage?.combinations?.hand_bag.filter(e => e.conditions?.passenger_groups.includes(values.category)) ?? [],
        handBags:
            passengerBagCombination?.hand_bag.indices.map((e) => ({
                index: e,
                ...bagDefinitions?.hand_bag[e],
            })) ?? [],
        holdBags:
            checkFlightsResponse?.baggage?.combinations?.hold_bag.filter((e) =>
                e.conditions?.passenger_groups.includes(values.category)
            ) ?? [],
    };

    const [state, setState] = useState({
        holdBags: [],
        noHoldBags: false,
    });

    type CheckedName = keyof typeof state;

    const toggleState = (checkedName: CheckedName, indices: number[]) => {
        setState((prev) => {
            !prev.noHoldBags && handleCheckedBags(index, []);
            return {
                ...prev,
                holdBags: !prev.noHoldBags ? [] : prev.holdBags,
                [checkedName]: !prev[checkedName],
            };
        });
    };

    const handleChange = (
        name: CheckedName,
        comb: Combination,
        bagDef?: Definitions
    ) => {
        setState((prev) => {
            handleCheckedBags(index, comb.indices, bagDef);
            return {
                ...prev,
                [name]: comb.indices,
            };
        });
    };

    const handBagText = newBags.handBags
        .filter((e, index, arr) => arr.indexOf(e) === index && !!e)
        .map((bag, index, arr) => {
            const count = arr.filter((e, i) => e.index === bag.index).length;
            return `${count}x ${capCase(bag.category, "_")} (${
                bag.restrictions?.weight
            }kg)`;
        })
        .join(", ");

    useEffect(() => {
        if (index === 2) {
            console.log("ssss", index, state);
            console.log("nuuu", index, newBags);
        }
    }, [state, newBags]);

    return (
        <Box>
            <Flex gap="1rem" align="center" padding="2rem 0">
                <Text
                    type="h3"
                    size={isMobile ? 18 : 22}
                    text="Cabin or Carry-On Baggage"
                    weight={600}
                />
                <PiWarningCircleBold size={30} color={ttColors.primaryLight} />
            </Flex>

            {/* Hand Bags */}
            {newBags.handBags.length > 0 ? (
                <BaggageBox active>
                    <BaggageText>
                        <Text type="p" text="Popular" size={14} weight={600} />
                    </BaggageText>
                    <Flex
                        direction="column"
                        gap="1rem"
                        align="center"
                        justify="center"
                    >
                        <Text type="h3" text="Carry-On Bag" weight={600} />
                        <Text
                            type="p"
                            text={handBagText}
                            color={ttColors.lighterGray}
                            size={isMobile ? 14 : 16}
                            padding={isMobile ? "0 1rem" : ""}
                        />
                        <Flex align="flex-end" justify="center">
                            {newBags.handBags
                                .filter(
                                    (e, index, arr) => arr.indexOf(e) === index
                                )
                                .map((e, index) => (
                                    <Flex
                                        direction="column"
                                        gap=".75rem"
                                        align="center"
                                        key={index}
                                    >
                                        <Image
                                            height={
                                                e?.category === "personal_item"
                                                    ? 100
                                                    : 150
                                            }
                                            styles={{ objectFit: "contain" }}
                                            src={
                                                e?.category === "personal_item"
                                                    ? "/assets/images/flights/purplebag.png"
                                                    : "/assets/images/flights/greenbag.png"
                                            }
                                            alt="Baggage"
                                        />
                                        <Text
                                            type="p"
                                            text={`${e?.restrictions?.length} x ${e?.restrictions?.width} x ${e?.restrictions?.height} cm`}
                                            color={ttColors.foundation.gray}
                                            size={isMobile ? 14 : 16}
                                        />
                                    </Flex>
                                ))}
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Flex
                                align="center"
                                justify="center"
                                gap=".5rem"
                                background="#F4F4F4"
                                width={isMobile ? "max-content" : "9.5rem"}
                                padding=".5rem .75rem"
                                borderRadius="30px"
                                border={`1px solid ${ttColors.lightestGray}`}
                            >
                                <BsCheck2
                                    size={25}
                                    color={ttColors.lighterGray}
                                />
                                <Text
                                    type="p"
                                    size={isMobile ? 14 : 16}
                                    text="Included"
                                    color={ttColors.lighterGray}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                </BaggageBox>
            ) : (
                <ToastInfo
                    type="info"
                    message={`No cabin baggage allowed for ${values.category}`}
                />
            )}

            <Flex direction="column" gap=".5rem" padding="3rem 0 0">
                <Flex gap="1rem" align="center">
                    <Text
                        type="h3"
                        size={isMobile ? 18 : 22}
                        text="Checked Baggage"
                        weight={600}
                    />
                    <PiWarningCircleBold
                        size={30}
                        color={ttColors.primaryLight}
                    />
                </Flex>
                <Text
                    type="p"
                    text="Select one option:"
                    weight={500}
                    color={ttColors.foundation.gray}
                    size={isMobile ? 14 : 16}
                />
            </Flex>

            {/* Hold Bags */}
            {!state.noHoldBags && (
                <Flex
                    gap="1rem"
                    align="flex-end"
                    wrap="wrap"
                    padding="1rem 0 0"
                >
                    {newBags.holdBags.length === 0 &&
                    values.category !== PassengerCategory.INFANT ? (
                        <ToastInfo
                            type="info"
                            message="No provision for checked baggage"
                        />
                    ) : (
                        newBags.holdBags
                            .filter((e) => e.indices.length > 0)
                            .map((comb, index, arr) => {
                                const count = comb.indices.length;
                                const isActive =
                                    JSON.stringify(state.holdBags) ===
                                    JSON.stringify(comb.indices);
                                const bagDefinition =
                                    bagDefinitions?.hold_bag[comb.indices[0]];
                                const sameBags = comb.indices.every(
                                    (e, i, indArr) => e === indArr[0]
                                );
                                return (
                                    <BaggageBox
                                        active={isActive}
                                        onClick={() =>
                                            isActive
                                                ? null
                                                : handleChange(
                                                      "holdBags",
                                                      comb,
                                                      bagDefinition
                                                  )
                                        }
                                        style={{
                                            width: isMobile ? "100%" : "48%",
                                        }}
                                        key={`baggage-box-${index}`}
                                    >
                                        {sameBags ? (
                                            <Flex
                                                direction="column"
                                                gap="1rem"
                                                align="center"
                                                justify="center"
                                            >
                                                <Text
                                                    type="h3"
                                                    text={`${count}x Checked Bag${
                                                        count > 1 ? "s" : ""
                                                    }`}
                                                    weight={600}
                                                />
                                                <Text
                                                    type="p"
                                                    text={`${bagDefinition?.restrictions?.weight}kg`}
                                                    color={ttColors.lighterGray}
                                                    weight={500}
                                                />
                                                <Flex
                                                    direction="column"
                                                    gap=".75rem"
                                                    align="center"
                                                >
                                                    <Image
                                                        height={150}
                                                        styles={{
                                                            objectFit:
                                                                "contain",
                                                        }}
                                                        src="/assets/images/flights/blackbag.png"
                                                        alt="Baggage"
                                                    />
                                                    <Text
                                                        type="p"
                                                        text={`${bagDefinition?.restrictions?.length} x ${bagDefinition?.restrictions?.width} x ${bagDefinition?.restrictions?.height} cm`}
                                                        color={
                                                            ttColors.foundation
                                                                .gray
                                                        }
                                                    />
                                                </Flex>

                                                <Flex
                                                    align="center"
                                                    justify="space-between"
                                                >
                                                    <Text
                                                        type="h2"
                                                        size={
                                                            isMobile ? 18 : 20
                                                        }
                                                        // ${
                                                        //     comb.price?.currency
                                                        // }
                                                        text={` ${formatPrice({
                                                            total:
                                                                (comb.price
                                                                    ?.amount ??
                                                                    0) *
                                                                conversionRate,
                                                            currency:
                                                                preFerredCurrency,
                                                            // numberOfDecimalDigits: 2,
                                                        })}`}
                                                        weight={600}
                                                    />
                                                    <CustomRadioButton
                                                        checked={isActive}
                                                        onClick={() =>
                                                            isActive
                                                                ? null
                                                                : handleChange(
                                                                      "holdBags",
                                                                      comb,
                                                                      bagDefinition
                                                                  )
                                                        }
                                                    />
                                                </Flex>
                                            </Flex>
                                        ) : (
                                            <Flex
                                                gap="1rem"
                                                align="center"
                                                justify="center"
                                            >
                                                {comb.indices.map(
                                                    (indica, ind, arr) => {
                                                        const count =
                                                            arr.filter(
                                                                (e) => indica
                                                            ).length;
                                                        const bagDefinition =
                                                            bagDefinitions
                                                                ?.hold_bag[
                                                                indica
                                                            ];
                                                        return (
                                                            <Flex
                                                                direction="column"
                                                                gap="1rem"
                                                                align="center"
                                                                justify="center"
                                                                key={ind}
                                                            >
                                                                <Text
                                                                    type="h3"
                                                                    text={`${count}x Checked Bag${
                                                                        count >
                                                                        1
                                                                            ? "s"
                                                                            : ""
                                                                    }`}
                                                                    weight={600}
                                                                />
                                                                <Text
                                                                    type="p"
                                                                    text={`${bagDefinition?.restrictions?.weight}kg`}
                                                                    color={
                                                                        ttColors.lighterGray
                                                                    }
                                                                    weight={500}
                                                                />
                                                                <Flex
                                                                    direction="column"
                                                                    gap=".75rem"
                                                                    align="center"
                                                                >
                                                                    <Image
                                                                        height={
                                                                            150
                                                                        }
                                                                        styles={{
                                                                            objectFit:
                                                                                "contain",
                                                                        }}
                                                                        src="/assets/images/flights/blackbag.png"
                                                                        alt="Baggage"
                                                                    />
                                                                    <Text
                                                                        type="p"
                                                                        text={`${bagDefinition?.restrictions?.length} x ${bagDefinition?.restrictions?.width} x ${bagDefinition?.restrictions?.height} cm`}
                                                                        color={
                                                                            ttColors
                                                                                .foundation
                                                                                .gray
                                                                        }
                                                                    />
                                                                </Flex>
                                                                <Text
                                                                    type="h2"
                                                                    size={
                                                                        isMobile
                                                                            ? 18
                                                                            : 20
                                                                    }
                                                                    text={`${formatPrice(
                                                                        {
                                                                            total:
                                                                                (comb
                                                                                    .price
                                                                                    ?.amount ??
                                                                                    0) *
                                                                                conversionRate,
                                                                            currency:
                                                                                preFerredCurrency,
                                                                            // numberOfDecimalDigits: 2,
                                                                        }
                                                                    )}`}
                                                                    weight={600}
                                                                />
                                                            </Flex>
                                                        );
                                                    }
                                                )}
                                            </Flex>
                                        )}
                                    </BaggageBox>
                                );
                            })
                    )}
                </Flex>
            )}

            {newBags.holdBags.length === 0 &&
                values.category === PassengerCategory.INFANT &&
                !state.noHoldBags && <ToastInfo type="warning" />}

            {state.noHoldBags && <ToastInfo type="info" />}

            <CheckBox
                checked={state.noHoldBags}
                onChange={() =>
                    toggleState("noHoldBags", newBags.holdBags[0]?.indices)
                }
            >
                <Text type="p" text="No baggage" />
            </CheckBox>

            {index !== 0 && (
                <Flex justify="flex-end">
                    <Button
                        background="#F3FAFD"
                        width="max-content"
                        padding="0px 20px"
                        border="1px solid #DAF0F9"
                        color="black"
                        startIcon={<GoTrash size={22} />}
                        onClick={() => removePassenger(index)}
                    >
                        <Text type="p" text="Remove Traveler" weight={600} />
                    </Button>
                </Flex>
            )}

            {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Add Baggage
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="Age"
        >
          <ListSubheader>Hand Bag</ListSubheader>
          {combinationOptions.hand_bag.map((el, index) => (
            <MenuItem
              key={"hand-" + index}
              onClick={() => {
                handleUpdatePassengersBagCombination({
                  index: count,
                  combination: el,
                  category: "hand_bag",
                });
                // formik.setFieldValue(
                //   `passengers.${count}.combinations.hand_bag`,
                //   el
                // );
              }}
            >
              {el.indices.map((definitionIndex, index) => (
                <Flex key={"hand-category-" + index}>
                  <Text
                    type="p"
                    text={
                      "1x" +
                      bagDefinitions?.hand_bag[definitionIndex].category +
                      "(" +
                      bagDefinitions?.hand_bag[definitionIndex].restrictions
                        .weight +
                      " kg)"
                    }
                  />
                  {index == el.indices.length - 1 ? null : (
                    <Text type="p" text={"+"} margin={"0 1rem"} />
                  )}
                </Flex>
              ))}
            </MenuItem>
          ))}

          <ListSubheader>Hold bag</ListSubheader>
          {combinationOptions.hold_bag.map((el, index) => (
            <MenuItem
              key={"hold-" + index}
              onClick={() => {
                handleUpdatePassengersBagCombination({
                  index: count,
                  combination: el,
                  category: "hold_bag",
                });
                // formik.setFieldValue(
                //   `passengers.${count}.combinations.hold_bag`,
                //   el
                // );
              }}
            >
              {(() => {
                if (el.indices.length == 0) return "No Check bag (Default)";
                return (
                  <Flex>
                    <Text
                      type="p"
                      text={
                        el.indices.length +
                        "x" +
                        "Check bags (" +
                        bagDefinitions?.hold_bag[0].restrictions.weight +
                        " kg" +
                        ")"
                      }
                    />
                  </Flex>
                );
              })()}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
        </Box>
    );
}
