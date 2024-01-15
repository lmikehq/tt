import React, { CSSProperties, ChangeEvent, FocusEvent } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Flex from "@components/templates/flex";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";

interface Option {
  value: any;
  label: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>, value?: string) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  justifyContent?: string;
  direction?: "row" | "column";
  align?: "center" | "flex-start" | "flex-end";
  value?: any;
  scroll?: boolean;
  styles?: CSSProperties;
}

export function CustomRadioGroup({
  options,
  onChange,
  onBlur,
  name,
  justifyContent,
  align = "center",
  direction = "row",
  value,
  scroll,
  styles,
}: CustomRadioGroupProps) {
  const { isMobile } = useScreenResolution();
  return (
    <FormControl style={{ width: "100%", ...styles }}>
      <RadioGroup
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ justifyContent: justifyContent, width: "100%" }}
      >
        <Flex
          align={align}
          gap=".6rem"
          direction={direction}
          className={scroll ? "no-scrollbar" : ""}
          overflowX={scroll ? "auto" : "initial"}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: ttColors.primary,
                    },
                  }}
                />
              }
              label={option.label}
              sx={{
                marginLeft: "0px",
                ".MuiFormControlLabel-label": {
                  width: scroll ? "max-content" : "100%",
                  fontFamily: "Poppins",
                  fontWeight: "400 !important",
                  fontSize: isMobile ? ".9rem !important" : ".9rem !important",
                  marginLeft: "2px",
                },
              }}
            />
          ))}
        </Flex>
      </RadioGroup>
    </FormControl>
  );
}
