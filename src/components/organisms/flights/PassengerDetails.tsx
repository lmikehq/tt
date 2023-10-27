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
  PassengerBaggageCombinationInterface,
  PassengerFormInterface,
  SaveBookingRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import { Combinations } from "@/lib/types/response-models/flight/check_flight.type";
import PassengerBaggagePane from "./PassengerBaggagePane";
import { PiWarningCircleBold } from "react-icons/pi";
import { ttColors } from "@/lib/theme/colors";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

interface TripSummaryCardProps {
  formik: FormikProps<{
    passengers: PassengerFormInterface[];
  }>;
  values: PassengerFormInterface;
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
    const { isMobile } = useScreenResolution()
  return (
    <>
      <Flex justify="space-between" align="center">
        <Text type="h2" size={isMobile ? 18 : 22} text="Main Passenger" font="Montserrat" weight={600} />
        <FormControl sx={{ m: 1, width: isMobile ? '45%' : '30%' }}>
          <FieldString
            options={[
              "Adult (Over 11 years)",
              "Child (2 - 11 years)",
              "Infant (Under 2 years)",
            ]}
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
              Last Name
            </FormLabel>
            <FieldInput
              name={`passengers.${count}.surname`}
              placeholder="Enter Last name"
              formik={formik}
            />
          </FormControl>
          <FormControl>
            <FormLabel required htmlFor="name">
              First Name
            </FormLabel>
            <FieldInput
              name={`passengers.${count}.name`}
              placeholder="Enter First Name"
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
              Date of Birth
            </FormLabel>
            <FieldAsDate
              name={`passengers.${count}.birthday`}
              placeholder="Date of Birth"
              formik={formik}
              format="YYYY-MM-DD"
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
            <FormLabel htmlFor="issuingdate">
              Passport or ID Issued Date
            </FormLabel>
            <FieldAsDate
              name={`passengers.${count}.issuingdate`}
              placeholder="Passport or ID Expiry Date"
              formik={formik}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="expiration">
              Passport or ID Expiry Date
            </FormLabel>
            <FieldAsDate
              name={`passengers.${count}.expiration`}
              placeholder="Passport or ID Expiry Date"
              formik={formik}
              format="YYYY-MM-DD"
            />
          </FormControl>
        </Box>
        <Box>
          <Flex gap="1rem" align="center" padding="1rem 0">
            <Text type="h2" size={isMobile ? 18 : 22} text="Add extra check-in bags" weight={600} />
            <PiWarningCircleBold size={30} color={ttColors.primaryLight} />
          </Flex>
          <Text
            type="p"
            text="Choose an option. Various airlines have varying restrictions concerning the dimensions of baggage, thus we're presenting you with the maximum acceptable size based on your travel plans"
            color="#414141"
            size={isMobile ? 14 : 16}
          />
          <Box sx={{ marginY: "1rem" }}>
            <PassengerBaggagePane
              values={values}
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
