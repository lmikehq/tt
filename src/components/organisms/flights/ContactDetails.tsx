"use client";
import Text from "@/components/atoms/text";
import FormControl from "@mui/material/FormControl";
import { FormikProps, useFormik } from "formik";
import CheckBox from "@/components/molecules/checkbox";
import Box from "@mui/material/Box";
import { FieldInput } from "../fieldInput";
import FormLabel from "@/components/atoms/FormLabel";
import {
    ContactDetailsInterface,
    SaveBookingRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import { ChangeEvent } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

interface TripSummaryCardProps {
    formik: FormikProps<ContactDetailsInterface>;
}

export default function ContactDetails({ formik }: TripSummaryCardProps) {
    const { isMobile } = useScreenResolution();
    return (
        <>
            <Text
                type="h2"
                size={isMobile ? 18 : 22}
                text="Contact Details"
                font="Montserrat"
                weight={600}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "1rem",
                    marginY: "1rem",
                }}
            >
                <FormControl>
                    <FormLabel htmlFor="email-input" required>
                        Email Address
                    </FormLabel>
                    <FieldInput
                        name="email"
                        placeholder="Enter your Email Address"
                        formik={formik}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="phone-input" required>
                        Phone Number
                    </FormLabel>
                    <FieldInput
                        name="phone"
                        type="number"
                        placeholder="Enter your Phone Number"
                        formik={formik}
                    />
                </FormControl>

                <FormControl>
                    <CheckBox name="receiveUpdates" onChange={() => {}} checked>
                        <Text
                            type="p"
                            size={isMobile ? 14 : 16}
                            text="I want to receive SMS updates about my trip."
                        />
                    </CheckBox>
                </FormControl>
            </Box>
        </>
    );
}
