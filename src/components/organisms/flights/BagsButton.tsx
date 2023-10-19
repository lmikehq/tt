"use client";
import Text from "@/components/atoms/text";
import { Box } from "@mui/material";
import { useState } from "react";
import DropdownButton from "./DropdownButton";
import PlusMinusButton from "./PlusMinusButton";
import styled from "styled-components";

const StyledText = styled.div`
  width: 300px;
  overflow: hidden;
`

export default function BagsButton() {
  const [cabinBaggage, setCabinBaggage] = useState(0);
  const [checkedBaggage, setCheckedBaggage] = useState(0);

  return (
    <DropdownButton title="Bags">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          justifyContent: "space-between",
          columnGap: "3rem",
        }}
      >
        <div
          style={{
            width: '300px',
            overflow: 'hidden'
          }}
        >
          <Text text="Cabin Baggage" type="p" />
        </div>

        <Box sx={{ display: "flex", columnGap: 1.5, alignItems: "center" }}>
          <PlusMinusButton onClick={() => setCabinBaggage(cabinBaggage + 1)}>
            +
          </PlusMinusButton>
          {cabinBaggage.toString()}
          <PlusMinusButton
            isDisabled={cabinBaggage === 0}
            onClick={() => setCabinBaggage(cabinBaggage - 1)}
          >
            -
          </PlusMinusButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          justifyContent: "space-between",
          columnGap: "3rem",
        }}
      >
        <p>Checked Baggage</p>

        <Box sx={{ display: "flex", columnGap: 1.5, alignItems: "center" }}>
          <PlusMinusButton
            onClick={() => setCheckedBaggage(checkedBaggage + 1)}
          >
            +
          </PlusMinusButton>
          {checkedBaggage.toString()}
          <PlusMinusButton
            isDisabled={checkedBaggage === 0}
            onClick={() => setCheckedBaggage(checkedBaggage - 1)}
          >
            -
          </PlusMinusButton>
        </Box>
      </Box>
    </DropdownButton>
  );
}
