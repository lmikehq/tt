"use client";
import Text from "@/components/atoms/text";
import FormControl from "@mui/material/FormControl";
import { FormikProps, useFormik } from "formik";
import CheckBox from "@/components/molecules/checkbox";
import Box from "@mui/material/Box";
import { FieldInput } from "../fieldInput";
import FormLabel from "@/components/atoms/FormLabel";
import { SaveBookingRequestInput } from "@/lib/types/request-models/flight/booking.type";
interface TripSummaryCardProps {
  formik: FormikProps<SaveBookingRequestInput>;
}

export default function ContactDetails({ formik }: TripSummaryCardProps) {
  return (
    <>
      <Text type="h2" text="Contact Details" />

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
            Email
          </FormLabel>

          <FieldInput
            formik={formik}
            name="email"
            placeholder="Enter your Email Address"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone-input" required>
            Phone Number
          </FormLabel>

          <FieldInput
            formik={formik}
            name="phone"
            placeholder="Enter your Phone Number"
          />
        </FormControl>
      </Box>
    </>
  );
}
