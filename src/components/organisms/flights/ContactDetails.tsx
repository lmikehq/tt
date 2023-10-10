"use client";
import Text from "@/components/atoms/text";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import CheckBox from "@/components/molecules/checkbox";
import Box from "@mui/material/Box";
import { FieldInput } from "../fieldInput";
import FormLabel from "@/components/atoms/FormLabel";

export default function ContactDetails() {
  const contactFormik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      receiveSMSUpdates: false,
    },
    onSubmit: (values: any) => {
      console.log(values);
    },
  });

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
            formik={contactFormik}
            name="email"
            placeholder="Enter your Email Address"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone-input" required>
            Phone Number
          </FormLabel>

          <FieldInput
            formik={contactFormik}
            name="phone"
            placeholder="Enter your Phone Number"
          />
        </FormControl>
      </Box>

      <FormControl>
        <CheckBox
          onChange={contactFormik.handleChange}
          checked={contactFormik.values.receiveSMSUpdates}
        >
          I want to receive SMS updates about my trip.
        </CheckBox>
      </FormControl>
    </>
  );
}
