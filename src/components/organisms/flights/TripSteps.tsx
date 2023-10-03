"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import { ttColors } from "@/lib/theme/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const StyledStepper = styled(Stepper)(() => ({
  "& .MuiStepIcon-root.Mui-completed, .MuiStepIcon-root.Mui-active": {
    color: ttColors.primary,
  },
  "& .MuiStepIcon-root:not(.Mui-completed):not(.Mui-active)": {
    color: ttColors.gray,
  },
  "& .MuiStepConnector-root": {
    minHeight: 2,
    margin: "0 auto",
    boxShadow: "none",
  },
  "& .MuiStepConnector-root.Mui-active": {
    borderTop: `2px solid ${ttColors.primary}`,
  },
  "& .MuiStepConnector-root:not(.Mui-active)": {
    borderTop: `2px solid ${ttColors.gray}`,
  },
}));

export default function TripSteps() {
  const steps = [
    "Search Flight",
    "Passengers & baggage",
    "Choose Ticket fare",
    "Seat Selection",
    "Overview & Payment",
  ];
  const [activeStep] = useState(2);

  return (
    <Box sx={{ width: "100%" }}>
      <StyledStepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </StyledStepper>
    </Box>
  );
}
