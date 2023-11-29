import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { BiSolidCity, BiSolidPlane } from "react-icons/bi";
import Flex from "../templates/flex";
import Section from "../molecules/section";
import Text from "../atoms/text";
import { debounce } from "debounce";
import { InputAdornment, Popper } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import { ttColors } from "@/lib/theme/colors";
import Spinner from "../molecules/icons/spinner";
import {
    KiwiLocation,
    KiwiLocationType,
} from "@/lib/types/response-models/flight/location.type";
import { RateHawkRegionType } from "@/lib/types/response-models/stay/location.type";

interface SearchInputAsLocationTypesProps {
    locations: (KiwiLocation | RateHawkRegionType)[];
    handleSetSearchText: (params: { text: string }) => void;
    onChange: (value: KiwiLocation | RateHawkRegionType) => void;
    value?: KiwiLocation | RateHawkRegionType;
    placeholder: string;
    loading: boolean;
}

export default function SearchInputAsLocationTypes({
    locations,
    handleSetSearchText,
    onChange,
    value,
    placeholder,
    loading,
}: SearchInputAsLocationTypesProps) {
    const fieldRef = React.useRef<HTMLDivElement | null>(null);
    const fieldWidth = fieldRef?.current
        ? fieldRef.current.clientWidth
        : "300px";

    const handleSetSearchTextDebounce = debounce((value: string) => {
        handleSetSearchText({ text: value });
    }, 800);

    const PopperMy = (props: any) => (
        <Popper
            {...props}
            sx={{
                width: fieldWidth,
                "& div > ul::-webkit-scrollbar": {
                    backgroundColor: "transparent",
                    width: "9px",
                    height: "9px",
                },
                "& div > ul::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                    borderRadius: "6px",
                },
            }}
            placement="bottom-start"
        />
    );

    return (
        <Autocomplete
            id="country-select-demo"
            sx={{
                width: "auto",
                outline: "none !important",

                "& .MuiFormControl-root": {
                    outline: "none !important",
                },
            }}
            options={locations}
            autoHighlight
            PopperComponent={PopperMy}
            getOptionLabel={(option) => option.name}
            filterOptions={(x) => x}
            defaultValue={value}
            disableClearable={true}
            onChange={(event, value, reason) => onChange(value)}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                    padding={"0.875rem 1.125rem"}
                    minWidth={0}
                >
                    <Section
                        width="fit-content"
                        styles={{ flexShrink: 0, marginRight: "1.125rem" }}
                    >
                        {option.type == KiwiLocationType.airport ? (
                            <BiSolidPlane
                                size={20}
                                color={ttColors.foundation.black600}
                            />
                        ) : (
                            <BiSolidCity
                                size={20}
                                color={ttColors.foundation.black600}
                            />
                        )}
                    </Section>
                    <Section styles={{ flexGrow: 1, minWidth: 0 }}>
                        <Text
                            type="p"
                            size={15}
                            color={ttColors.foundation.black600}
                            className="truncate"
                            text={`${option.name} (${
                                "code" in option
                                    ? option.code
                                    : option.country_code
                            })`}
                        />
                        <Text
                            type="p"
                            size={12}
                            weight={300}
                            className="truncate"
                            color={ttColors.foundation.black600}
                            text={
                                "code" in option
                                    ? option.city?.country?.name ??
                                      option.country?.name ??
                                      option.city?.name ??
                                      option.alternative_names[0] ??
                                      option.name
                                    : option.name
                            }
                        />
                    </Section>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    ref={fieldRef}
                    sx={{
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: `${ttColors.primary} !important`,
                        },
                        "&:focus .MuiOutlinedInput-notchedOutline": {
                            borderColor: `${ttColors.primary} !important`,
                        },
                        "&:focus-visible .MuiOutlinedInput-notchedOutline": {
                            borderColor: `${ttColors.primary} !important`,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            outline: "none !important",
                        },
                        "& .MuiFormControl-root": {
                            outline: "none !important",
                        },
                        "& .MuiOutlinedInput-root": {
                            outline: "none !important",
                            padding: "0  .6rem !important",
                            fontFamily: "Poppins",
                            fontSize: "15px",
                            color: ttColors.foundation.black,
                        },
                        // "&:hover .MuiInputBase-root": {
                        //     color: `${ttColors.primary} !important`,
                        // },
                        "& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root":
                            {
                                display: "block!important",
                                position: "relative",
                                // color: "inherit !important",
                                borderBottom: "1px solid #E7E7E7",
                                borderRadius: "4px",
                            },
                        "& label": {
                            fontSize: "16px!important",
                            // color: "inherit !important",
                        },
                        "& input": {
                            height: "45px",
                            padding: "0px !important",
                            cursor: "pointer !important",
                        },
                        "& svg": {
                            // display: "none",
                        },
                    }}
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                            <InputAdornment position="start">
                                <IoLocationOutline size={22} />
                            </InputAdornment>
                        ),
                        endAdornment: loading ? (
                            <Spinner fill={ttColors.dark} size="22px" />
                        ) : null,
                        autoComplete: "new-password",
                        placeholder: placeholder,
                    }}
                    onChange={(e) =>
                        handleSetSearchTextDebounce(e.target.value)
                    }
                />
            )}
        />
    );
}
