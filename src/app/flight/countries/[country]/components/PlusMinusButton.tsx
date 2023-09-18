import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { ttColors } from "@lib/theme/colors";
import { alpha } from "@mui/material";

const RoundedButton = styled(Button)(({ theme }) => ({
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  minWidth: 0,
  padding: 0,
  color: ttColors.foundation.gray,
  "&:hover": {
    backgroundColor: alpha("#87CEEB", 0.2),
  },
  "&:active": {
    backgroundColor: alpha("#87CEEB", 0.4),
  },
  "&.Mui-disabled": {
    color: theme.palette.text.disabled,
    backgroundColor: "transparent",
  },
}));

interface IPlusMinusButton {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick: () => void;
}

function PlusMinusButton({
  children,
  isDisabled = false,
  onClick,
}: IPlusMinusButton) {
  return (
    <RoundedButton
      variant="outlined"
      color="primary"
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </RoundedButton>
  );
}

export default PlusMinusButton;
