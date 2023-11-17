import React, { ChangeEvent, FocusEvent } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import Flex from "@components/templates/flex";
import { useScreenResolution } from "@lib/extensions/hook/useScreenResolution";

interface Option {
  value: any;
  label: string;
}

interface CustomRadioGroupProps {
    options: Option[];
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement>, value?: string) => void;
    onBlur?: (e: FocusEvent<any, Element>) => void;
    justifyContent: string;
    direction?: "row" | "column";
    align?: "center" | "flex-start" | "flex-end";
    value?: any;
    scroll?: boolean;
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
    scroll
}: CustomRadioGroupProps) {
  const { isMobile } = useScreenResolution();
  return (
    <FormControl style={{ width: '100%' }}>
        <RadioGroup
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            style={{ justifyContent: justifyContent, width: '100%' }}
        >
              <Flex align={align} gap="1rem" direction={direction} className={scroll ? "no-scrollbar" : ""} overflowX={scroll ? "auto" : "initial"}>
                {options.map((option) =>
                    <FormControlLabel
                        key={option.label}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        sx={{
                            marginLeft: "0px",
                            
                            ".MuiFormControlLabel-label": {
                                width: scroll ? 'max-content' : '100%',
                                fontFamily: "Poppins",
                                fontWeight: "400 !important",
                                fontSize: isMobile ? ".9rem !important" : ".9rem !important",
                                marginLeft: "2px",
                            },
                        }}
                    />
                )}
            </Flex>
        </RadioGroup>
    </FormControl>
  );
}
