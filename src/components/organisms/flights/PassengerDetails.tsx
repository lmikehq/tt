import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormEvent, useState } from "react";
import Alert from "../Alert";
import PassengerCard from "./PassengerBaggagePane";
import {
  FieldAsDate,
  FieldAsString,
  FieldInput,
  FieldString,
} from "../fieldInput";

import FormLabel from "@/components/atoms/FormLabel";
import { COUNTRY_FLAGS } from "@/lib/extensions/data/COUNTRY_FLAGS";
import { FormikProps } from "formik";
import {
  Combination,
  Passenger,
  PassengerBaggageCombinationInterface,
  SaveBookingRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import { Combinations } from "@/lib/types/response-models/flight/check_flight.type";
import PassengerBaggagePane from "./PassengerBaggagePane";

interface TripSummaryCardProps {
  formik: FormikProps<{
    passengers: Passenger[];
  }>;
  values: Passenger;
  count: number;
  combinationOptions: Combinations;
  passengerBagCombination: PassengerBaggageCombinationInterface;
  handleUpdatePassengersBagCombination(params: {
    index: number;
    combination: Combination;
    category: string;
  }): void;
}

export default function MainPassenger({
  formik,
  count,
  values,
  combinationOptions,
  passengerBagCombination,
  handleUpdatePassengersBagCombination,
}: TripSummaryCardProps) {
  return (
    <>
      <Flex justify="space-between" align="center">
        <Text type="h2" text="Main Passenger" />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <FieldString
            options={["adult", "child", "infant"]}
            placeholder="Select category"
            name={`passengers.${count}.category`}
            formik={formik}
          />
        </FormControl>
      </Flex>

      <Box>
        <Box sx={{ marginY: "2rem" }}>
          <Alert>
            To avoid boarding complications, enter all names and surnames
            exactly as they appear in your passport/ID.
          </Alert>
        </Box>

        <Box
          sx={{
            marginY: "2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "1rem",
          }}
        >
          <FormControl>
            <FormLabel required htmlFor="surname">
              Last name
            </FormLabel>

            <FieldInput
              name={`passengers.${count}.surname`}
              placeholder="Last name"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="name">
              First name
            </FormLabel>

            <FieldInput
              name={`passengers.${count}.name`}
              placeholder="First name"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="nationality">
              Nationality
            </FormLabel>
            <FieldAsString
              formik={formik}
              options={COUNTRY_FLAGS.map((x) => ({
                name: x.name,
                flag: x.flag,
                code: x.code,
              }))}
              name={`passengers.${count}.nationality`}
              placeholder="Nationality"
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="title">
              Title
            </FormLabel>
            <FieldString
              formik={formik}
              name={`passengers.${count}.title`}
              placeholder="Select your title"
              options={["Mr", "Mrs"]}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="birthday">
              Date of birth
            </FormLabel>

            <FieldAsDate
              name={`passengers.${count}.birthday`}
              placeholder="Date of Birth"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="cardno">
              Passport or ID number
            </FormLabel>

            <FieldInput
              name={`passengers.${count}.cardno`}
              placeholder="Passport or ID number"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="expiration">
              Passport or ID Expiry date
            </FormLabel>

            <FieldAsDate
              name={`passengers.${count}.expiration`}
              placeholder="Passport or ID Expiry date"
              formik={formik}
            />
          </FormControl>
        </Box>
        <input type="text" name={`passengers.${count}.combinations`} />
        <Box>
          <Text type="h2" text="Add extra check-in bags" />
          <Text
            type="p"
            text="Choose an option. Various airlines have varying restrictions concerning the dimensions of baggage, thus we're presenting you with the maximum acceptable size based on your travel plans"
          />

          <Box sx={{ marginY: "1rem" }}>
            <PassengerBaggagePane
              combinationOptions={combinationOptions}
              count={count}
              handleUpdatePassengersBagCombination={
                handleUpdatePassengersBagCombination
              }
              passengerBagCombination={passengerBagCombination}
            />
            {/* <PassengerCard /> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
