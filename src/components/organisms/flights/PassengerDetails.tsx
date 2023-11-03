import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { FormEvent, useState } from "react";
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
    PassengerCategory,
    PassengerCategoryDesc,
    PassengerFormInterface,
    SaveBookingRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import {
    Combinations,
    Definitions,
} from "@/lib/types/response-models/flight/check_flight.type";
import PassengerBaggagePane from "./PassengerBaggagePane";
import { PiWarningCircleBold } from "react-icons/pi";
import { ttColors } from "@/lib/theme/colors";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

interface TripSummaryCardProps {
    index: number;
    formik: FormikProps<{
        passengers: PassengerFormInterface[];
    }>;
    values: PassengerFormInterface;
    count: number;
    combinationOptions: Combinations;
    passengerBagCombination: PassengerBaggageCombinationInterface;
    shouldUpdateCategory(params: {
        index: number;
        combination?: Combination;
        category: string;
    }): void;
    handleUpdatePassengersBagCombination(params: {
        index: number;
        combination: Combination;
        category: string;
    }): void;
    checkedBags: {
        order: { [key: number]: number[] };
        definition?: Definitions;
    };

    handleCheckedBags: (index: number, value: number[], bagDef?: Definitions) => void;
    removePassenger: (index: number) => void; 

}

export default function MainPassenger({
    index,
    formik,
    count,
    values,
    combinationOptions,
    passengerBagCombination,
    handleUpdatePassengersBagCombination,
    shouldUpdateCategory,
    checkedBags,
    handleCheckedBags,
    removePassenger,
}: TripSummaryCardProps) {
    const { isMobile } = useScreenResolution();
    return (
        <Box
            mt="30px"
            pt="30px"
            borderTop={index === 0 ? "" : "1px solid lightgrey"}
        >
            <Flex justify="space-between" align="center">
                <Text
                    type="h2"
                    size={isMobile ? 18 : 22}
                    text={
                        index === 0
                            ? "Main Passenger"
                            : `Passenger ${index + 1}`
                    }
                    font="Montserrat"
                    weight={600}
                />
                <FormControl sx={{ m: 1, width: isMobile ? "45%" : "30%" }}>
                    <FieldString
                        options={[
                            PassengerCategory.ADULT,
                            PassengerCategory.CHILD,
                            PassengerCategory.INFANT,
                        ]}
                        placeholder="Select category"
                        name={`passengers.${count}.category`}
                        formik={formik}
                        onChanged={(value) =>
                            shouldUpdateCategory({ index, category: value })
                        }
                    />
                </FormControl>
            </Flex>
            <Box>
                <Box sx={{ marginY: "2rem" }}>
                    <Alert>
                        To avoid boarding complications, enter all names and
                        surnames exactly as they appear in your passport/ID.
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
                    {values.category !== "infant" && (
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
                    )}
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
                    {values.category !== "infant" && (
                        <React.Fragment>
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
                        </React.Fragment>
                    )}
                </Box>
                <Box>
                    <Flex gap="1rem" align="center" padding="1rem 0">
                        <Text
                            type="h2"
                            size={isMobile ? 18 : 22}
                            text="Add extra check-in bags"
                            weight={600}
                        />
                        <PiWarningCircleBold
                            size={30}
                            color={ttColors.primaryLight}
                        />
                    </Flex>
                    <Text
                        type="p"
                        text="Choose an option. Airlines have varying restrictions concerning the dimensions of baggage, thus we're presenting you with the maximum acceptable size based on your travel plans"
                        color="#414141"
                        size={isMobile ? 14 : 16}
                    />
                    <Box sx={{ marginY: "1rem" }}>
                        <PassengerBaggagePane
                            index={index}
                            values={values}
                            combinationOptions={combinationOptions}
                            count={count}
                            handleUpdatePassengersBagCombination={
                                handleUpdatePassengersBagCombination
                            }
                            passengerBagCombination={passengerBagCombination}
                            checkedBags={checkedBags}
                            handleCheckedBags={handleCheckedBags}
                            removePassenger={removePassenger}
                        />
                        {/* <PassengerCard /> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
