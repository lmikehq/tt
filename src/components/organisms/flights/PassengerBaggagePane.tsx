import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import DropdownButton from "./DropdownButton";
import { BsArrowRight } from "react-icons/bs";
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
import { PassengerAndBaggageCombinationInterface } from "@/lib/types/request-models/flight/booking.type";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";

interface PassengerBaggagePaneProps {
  combinationOptions: Combinations;
  formik: FormikProps<{
    passengers: PassengerAndBaggageCombinationInterface[];
  }>;
  count: number;
}
export default function PassengerBaggagePane({
  combinationOptions,
  formik,
  count,
}: PassengerBaggagePaneProps) {
  const { checkFlightsResponse } = useFlightBookingStore((state) => state);
  const bagDefinitions = checkFlightsResponse?.baggage.definitions;
  return (
    <Box
      sx={{
        padding: "1rem",
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "50px 1fr 0.8fr 0.8fr",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50px",
          height: "50px",
          border: "1px solid gray",
          borderRadius: "50px",
          backgroundImage: "url('/assets/images/flights/EgyptAirLogo.jpg')",
        }}
      />

      <Box>
        <Text type="p" text="Departure" />

        <Flex align="center" gap="1rem">
          <Text type="p" text="Lagos" />
          <BsArrowRight />
          <Text type="p" text="Germany" />
        </Flex>
      </Box>

      <Flex justify="space-between" align="center">
        <Text type="p" text="1x" color={ttColors.lighterGray} />
        <LuggageOutlinedIcon color={"disabled"} />
        <Button
          width="100px"
          height="35px"
          background={ttColors.primaryLight}
          borderRadius="30px"
        >
          INCLUDED
        </Button>
      </Flex>

      <FormControl sx={{ m: 1, minWidth: 80 }}>
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
                formik.setFieldValue(
                  `passengers.${count}.combinations.hand_bag`,
                  el
                );
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
                formik.setFieldValue(
                  `passengers.${count}.combinations.hold_bag`,
                  el
                );
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
      </FormControl>
    </Box>
  );
}
