import Button from "@atom/button";
import { Autocomplete, TextField, Typography } from "@mui/material";
import CustomModal from "@organism/customModal";
import { isoLangs } from "data/isoLangs";
import React from "react";
import { styled } from "styled-components";
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
`;
function LanguageCurrencyModal() {
  return (
    <CustomModal width="400px" height="400px" open={true}>
      <>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          style={{ textAlign: "center" }}
        >
          Please Choose Your Country & Currency Preferences
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          <Form>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={isoLangs}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Language" />
              )}
            />

            <Button>Submit</Button>
          </Form>
        </Typography>
      </>
    </CustomModal>
  );
}

export default LanguageCurrencyModal;
