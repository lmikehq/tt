import { Button } from "@mui/material";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { ttColors } from "theme/colors";

interface buttonProps {
  onClick: (event: any) => void;
  disabled: boolean;
}

export default function AddButton({ onClick, disabled }: buttonProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      <AiFillPlusCircle
        size={30}
        color={!disabled ? ttColors.primary : ttColors.gray}
        cursor="pointer"
      />
    </Button>
  );
}
