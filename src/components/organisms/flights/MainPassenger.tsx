import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormEvent, useState } from "react";
import Alert from "../Alert";
import PassengerCard from "./PassengerCard";
import { FieldAsDate, FieldInput } from "../fieldInput";
import { useFormik } from "formik";
import { ttColors } from "@/lib/theme/colors";
import FormLabel from "@/components/atoms/FormLabel";

export default function MainPassenger() {
  const [age, setAge] = useState<string>("18");

  const handleNameChange = (event: SelectChangeEvent) => {
    const target = event.target as HTMLSelectElement;

    setAge(target?.value);
  };

  const [formData, setFormData] = useState({
    nationality: "select-nationality",
    gender: "Male",
  });

  const handleInputChange = (event: FormEvent | SelectChangeEvent<string>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      ...formData,
      dateOfBirth: "",
      passportOrIdNumber: "",
      passportOrIdIssueDate: "",
      passportOrIdExpiryDate: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Flex justify="space-between" align="center">
        <Text type="h2" text="Main Passenger" />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={age}
            onChange={handleNameChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"18"}>Adult (18+ year)</MenuItem>
            <MenuItem value={"20"}>Child (3 to 18 years)</MenuItem>
            <MenuItem value={"30"}>Infant (0 to 3 years)</MenuItem>
          </Select>
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
            <FormLabel required htmlFor="lastName">
              Last name
            </FormLabel>

            <FieldInput
              name="lastName"
              placeholder="Last name"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="firstName">
              First name
            </FormLabel>

            <FieldInput
              name="firstName"
              placeholder="First name"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="nationality">
              Nationality
            </FormLabel>

            <Select
              value={formData.nationality}
              onChange={handleInputChange}
              name="nationality"
              inputProps={{ "aria-label": "Without label" }}
              sx={{ color: ttColors.gray }}
            >
              <MenuItem value={"select-nationality"}>
                Select your nationality
              </MenuItem>
              <MenuItem value={"Nigerian"}>Nigerian</MenuItem>
              <MenuItem value={"Ghanian"}>Ghanian</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="gender">
              Gender
            </FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              inputProps={{ "aria-label": "Without label" }}
              sx={{ color: ttColors.gray }}
            >
              <MenuItem value={""}>Select your gender</MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="dateOfBirth">
              Date of birth
            </FormLabel>

            <FieldAsDate
              name="dateOfBirth"
              placeholder="Date of Birth"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="passportOrIdNumber">
              Passport or ID number
            </FormLabel>

            <FieldInput
              name="passportOrIdNumber"
              placeholder="Passport or ID number"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="passportOrIdIssueDate">
              Passport or ID Issued date
            </FormLabel>

            <FieldAsDate
              name="passportOrIdIssueDate"
              placeholder="Passport or ID Issued date"
              formik={formik}
            />
          </FormControl>

          <FormControl>
            <FormLabel required htmlFor="passportOrIdExpiryDate">
              Passport or ID Expiry date
            </FormLabel>

            <FieldAsDate
              name="passportOrIdExpiryDate"
              placeholder="Passport or ID Expiry date"
              formik={formik}
            />
          </FormControl>
        </Box>

        <Box>
          <Text type="h2" text="Add extra check-in bags" />
          <Text
            type="p"
            text="Choose an option. Various airlines have varying restrictions concerning the dimensions of baggage, thus we're presenting you with the maximum acceptable size based on your travel plans"
          />

          <Box sx={{ marginY: "1rem" }}>
            <PassengerCard />
            <PassengerCard />
          </Box>
        </Box>
      </Box>
    </>
  );
}
