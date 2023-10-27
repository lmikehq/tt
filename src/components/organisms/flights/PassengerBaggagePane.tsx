import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import DropdownButton from "./DropdownButton";
import { BsArrowRight, BsCheck2 } from "react-icons/bs";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import { ttColors } from "@/lib/theme/colors";
import { Combinations } from "@/lib/types/response-models/flight/check_flight.type";
import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@mui/material";
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
import { useState } from "react";
import CheckBox from "@/components/molecules/checkbox";
import { ToastInfo } from "../flight/booking/toast";
import { PiWarningCircleBold } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

interface PassengerBaggagePaneProps {
  values: PassengerFormInterface;
  combinationOptions: Combinations;
  count: number;
  passengerBagCombination: PassengerBaggageCombinationInterface;
  handleUpdatePassengersBagCombination(params: {
    index: number;
    combination: Combination;
    category: string;
  }): void;
}

const BaggageBox = styled.div<{ active: boolean }>`
  padding: 2rem 1rem;
  border: 2px solid
    ${({ active }) => (active ? ttColors.primary : ttColors.lightestGray)};
  border-radius: 10px;
  position: relative;
  width: 100%;
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
  values,
  combinationOptions,
  count,
  handleUpdatePassengersBagCombination,
}: PassengerBaggagePaneProps) {
  const { checkFlightsResponse } = useFlightBookingStore((state) => state);
    const bagDefinitions = checkFlightsResponse?.baggage.definitions;
    const { isMobile } = useScreenResolution()

  const [isChecked, setIsChecked] = useState({
    cabin: true,
    cbaggage1: false,
    cbaggage2: false,
    allowBaggage: false,
  });

  type CheckedName = keyof typeof isChecked;

  const toggleState = (checkedName: CheckedName) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [checkedName]: !prevState[checkedName],
    }));
  };

  return (
    <Box>
      <Flex gap="1rem" align="center" padding="2rem 0">
        <Text type="h3" size={isMobile ? 18 : 22} text="Cabin or Carry-On Baggage" weight={600} />
        <PiWarningCircleBold size={30} color={ttColors.primaryLight} />
      </Flex>
      <BaggageBox active={isChecked.cabin}>
        <BaggageText>
          <Text type="p" text="Popular" size={14} weight={600} />
        </BaggageText>
        <Flex direction="column" gap="1rem" align="center" justify="center">
          <Text type="h3" text="Carry-On Bag" weight={600} />
          <Text
            type="p"
            text="1x Personal Item (2kg) + 1x Cabin Bag (10kg)"
            color={ttColors.lighterGray}
            size={isMobile ? 14 : 16}
            padding={isMobile ? "0 1rem" : ""}
          />
          <Flex align="flex-end" justify="center">
            <Flex direction="column" gap=".75rem" align="center">
              <Image
                height={100}
                styles={{
                    objectFit: "contain",
                }}
                src="/assets/images/flights/purplebag.png"
                alt="Baggage"
              />
              <Text
                type="p"
                text="15 x 30 x 40 cm"
                color={ttColors.foundation.gray}
                size={isMobile ? 14 : 16}
              />
            </Flex>
            <Flex direction="column" gap=".75rem" align="center">
              <Image
                height={150}
                styles={{
                  objectFit: "contain",
                }}
                src="/assets/images/flights/greenbag.png"
                alt="Baggage"
              />
              <Text
                type="p"
                text="20 x 35 x 55 cm"
                color={ttColors.foundation.gray}
                size={isMobile ? 14 : 16}
              />
            </Flex>
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
              <BsCheck2 size={25} color={ttColors.lighterGray} />
              <Text type="p" size={isMobile ? 14 : 16} text="Included" color={ttColors.lighterGray} />
            </Flex>
            <CustomRadioButton
              checked={isChecked.cabin}
              onClick={() => toggleState("cabin")}
            />
          </Flex>
        </Flex>
      </BaggageBox>
      <Flex direction="column" gap=".5rem" padding="3rem 0 1rem">
        <Flex gap="1rem" align="center">
          <Text type="h3" size={isMobile ? 18 : 22} text="Checked Baggage" weight={600} />
          <PiWarningCircleBold size={30} color={ttColors.primaryLight} />
        </Flex>
        <Text
            type="p"
            text="Select one option:"
            weight={500}
            color={ttColors.foundation.gray}
            size={isMobile ? 14 : 16}
        />
      </Flex>
      {!isChecked.allowBaggage && (
        <Flex gap="1rem" align="flex-end" wrap="wrap" padding="1rem 0">
          <BaggageBox active={isChecked.cbaggage1} style={{ width: isMobile ? "100%" : "48%" }}>
            <Flex direction="column" gap="1rem" align="center" justify="center">
              <Text type="h3" text="1x Checked Bags" weight={600} />
              <Text
                type="p"
                text="23kg"
                color={ttColors.lighterGray}
                weight={500}
              />
              <Flex direction="column" gap=".75rem" align="center">
                <Image
                  height={150}
                  styles={{
                    objectFit: "contain",
                  }}
                  src="/assets/images/flights/blackbag.png"
                  alt="Baggage"
                />
                <Text
                  type="p"
                  text="20 x 35 x 55 cm"
                  color={ttColors.foundation.gray}
                />
              </Flex>

              <Flex align="center" justify="space-between">
                <Text type="h2" text="$230" weight={600} />
                <CustomRadioButton
                  checked={isChecked.cbaggage1}
                  onClick={() => toggleState("cbaggage1")}
                />
              </Flex>
            </Flex>
          </BaggageBox>
          <BaggageBox active={isChecked.cbaggage2} style={{ width: isMobile ? "100%" : "48%" }}>
            <Flex direction="column" gap="1rem" align="center" justify="center">
              <Text type="h3" text="2x checked bags" weight={600} />
              <Text
                type="p"
                text="23kg"
                color={ttColors.lighterGray}
                weight={500}
              />
              <Flex direction="column" gap=".75rem" align="center">
                <Image
                  height={150}
                  styles={{
                    objectFit: "contain",
                  }}
                  src="/assets/images/flights/blackbag.png"
                  alt="Baggage"
                />
                <Text
                  type="p"
                  text="20 x 35 x 55 cm"
                  color={ttColors.foundation.gray}
                />
              </Flex>
              <Flex align="center" justify="space-between">
                <Text type="h2" text="$230" weight={600} />
                <CustomRadioButton
                  checked={isChecked.cbaggage2}
                  onClick={() => toggleState("cbaggage2")}
                />
              </Flex>
            </Flex>
          </BaggageBox>
        </Flex>
      )}
      {values.category === PassengerCategory.INFANT ||
      isChecked.allowBaggage ? (
        <ToastInfo
          type={
            values.category === PassengerCategory.INFANT
              ? "warning"
              : isChecked.allowBaggage
              ? "info"
              : "info"
          }
        />
      ) : null}
      {values.category !== PassengerCategory.INFANT && (
        <CheckBox
          checked={isChecked.allowBaggage}
          onChange={() => toggleState("allowBaggage")}
        >
          <Text type="p" text="No baggage" />
        </CheckBox>
      )}
        <Flex justify="flex-end">
            <Button background="#F3FAFD" padding="0px 20px" border="1px solid #DAF0F9" color="black" startIcon={<GoTrash size={30} />}>
                <Text type="p" text="Remove Traveler" weight={600} />
            </Button>
        </Flex>
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
