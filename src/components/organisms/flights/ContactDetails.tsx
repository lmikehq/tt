"use client";
import Text from "@/components/atoms/text";
import FormControl from "@mui/material/FormControl";
import { FormikProps, useFormik } from "formik";
import CheckBox from "@/components/molecules/checkbox";
import Box from "@mui/material/Box";
import { FieldInput } from "../fieldInput";
import FormLabel from "@/components/atoms/FormLabel";
import { SaveBookingRequestInput } from "@/lib/types/request-models/flight/booking.type";
import { ChangeEvent } from "react";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";

interface TripSummaryCardProps {
    formik?: FormikProps<SaveBookingRequestInput>;
    contactDetails: {
        email: string;
        phone: string;
        receiveUpdates: boolean;
    };
    handleContactDetails: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactDetails({ contactDetails, handleContactDetails }: TripSummaryCardProps) {
    const { isMobile } = useScreenResolution()
    return (
        <>
            <Text type="h2" size={isMobile ? 18 : 22} text="Contact Details" font="Montserrat" weight={600} />

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
                        onChange={handleContactDetails}
                        value={contactDetails.email}
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
                        onChange={handleContactDetails}
                        value={contactDetails.email}
                    />
                </FormControl>
                    
                <FormControl>
                    <CheckBox
                        name="receiveUpdates"
                        onChange={handleContactDetails}
                        checked={contactDetails.receiveUpdates}
                    >
                        <Text type="p" size={isMobile ? 14 : 16} text="I want to receive SMS updates about my trip." />
                    </CheckBox>
                </FormControl>
            </Box>
        </>
    );
}
