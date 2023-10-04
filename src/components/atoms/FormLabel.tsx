import { ttColors } from "@/lib/theme/colors";
import { styled } from "@mui/material";
import MuiFormLabel, { FormLabelProps } from "@mui/material/FormLabel";

const FormLabel = styled((props: FormLabelProps) => (
  <MuiFormLabel {...props} sx={{ marginBottom: "0.5rem" }}>
    {props.children}
  </MuiFormLabel>
))(() => ({
  "& .MuiFormLabel-asterisk": {
    color: ttColors.red,
  },
}));

export default FormLabel;
