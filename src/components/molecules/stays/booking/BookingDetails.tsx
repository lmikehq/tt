import React from "react";
import { Container, Header, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import Section from "../../section";
import Input from "@/components/atoms/input";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
    ContactDetailsInterface,
    contactDetails,
} from "@/lib/types/request-models/flight/booking.type";
import { contactDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { FormikProps, useFormik } from "formik";
import { FieldInput } from "@/components/organisms/fieldInput";

interface BookingDetailsProps {
    formik: FormikProps<ContactDetailsInterface>;
}
function BookingDetails({ formik }: BookingDetailsProps) {
    const { isMobile } = useScreenResolution();

    return (
        <Container>
            <Header>
                <Flex direction="column" gap="10px">
                    <Text weight={600} type="h3" text="Booking Details"></Text>
                    <Text
                        type="p"
                        text="Enter your booking details for reservation"
                    ></Text>
                </Flex>
            </Header>
            <Span>
                <Flex
                    // align={"center"}
                    gap={isMobile ? "10px" : "20px"}
                    styles={{ flexDirection: isMobile ? "column" : "row" }}
                >
                    <Section>
                        <Text
                            type="p"
                            text="Email Address"
                            margin={
                                isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                            }
                            size={isMobile ? "14.5px" : "16px"}
                        />
                        <FieldInput
                            formik={formik}
                            name="email"
                            placeholder="Enter Email Address"
                        />
                        <Flex
                            gap="8px"
                            align="center"
                            styles={{
                                color: "var(--text-gray-color)",
                                marginTop: "10px",
                            }}
                        >
                            <ErrorOutlineIcon />
                            <Text
                                type="p"
                                text="Ensure the Email Address is correct"
                            ></Text>
                        </Flex>
                    </Section>
                    <Section>
                        <Text
                            type="p"
                            text="Phone Number"
                            margin={
                                isMobile ? ".7rem  0 .2rem" : "1rem 0 .5rem"
                            }
                            size={isMobile ? "14.5px" : "16px"}
                        />
                        <FieldInput
                            formik={formik}
                            name="phone"
                            placeholder="Enter Your Phone Number "
                        />
                    </Section>
                </Flex>
                <FormControlLabel
                    control={
                        <Checkbox
                            className="mui-checked"
                            disableFocusRipple
                            disableRipple
                        />
                    }
                    label={
                        <Text
                            type="p"
                            text="Receive text alerts about this trip. Message and data rates may apply."
                            styles={{
                                fontSize: "15px",
                                width: "fit-content",
                            }}
                        />
                    }
                />
            </Span>
        </Container>
    );
}

export default BookingDetails;
