"use client";
import Text from "@/components/atoms/text";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useFormik } from "formik";
import CheckBox from "@/components/molecules/checkbox";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

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
          marginY: "2rem",
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email-input" required>
            Email
          </FormLabel>

          <OutlinedInput
            id="email-input"
            sx={{ paddingX: "1rem" }}
            placeholder="Email"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="phone-input" required>
            Phone Number
          </FormLabel>

          <OutlinedInput
            id="phone-input"
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">🇳🇬</InputAdornment>
              ),
            }}
            type="number"
            sx={{ paddingX: "1rem" }}
            placeholder="Phone number"
          />
        </FormControl>
      </Box>

      <FormControl>
        <CheckBox checked={contactFormik.values.receiveSMSUpdates}>
          I want to receive SMS updates about my trip.
        </CheckBox>
      </FormControl>
    </>
  );
}
