import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Location, {
    LocationType,
} from "@/lib/types/response-models/flight/location.type";
import { BiSolidCity, BiSolidPlane } from "react-icons/bi";
import Flex from "../templates/flex";
import Section from "../molecules/section";
import Text from "../atoms/text";
import { debounce } from "debounce";
import { InputAdornment, Popper } from "@mui/material";
import { IoLocationOutline } from "react-icons/io5";
import { ttColors } from "@/lib/theme/colors";

interface SearchInputAsLocationTypesProps {
    locations: Location[];
    handleSetSearchText: (params: { text: string }) => void;
    onChange: (value: Location) => void;
    value?: Location;
    placeholder: string;
}

const PopperMy = function (props: any) {
    return (
        <Popper
            {...props}
            style={{ width: "300px" }}
            placement="bottom-start"
        />
    );
};
export default function SearchInputAsLocationTypes({
    locations,
    handleSetSearchText,
    onChange,
    value,
    placeholder,
}: SearchInputAsLocationTypesProps) {
    const handleSetSearchTextDebounce = debounce((value: string) => {
        handleSetSearchText({ text: value });
    }, 800);
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
                        {option.type == LocationType.airport ? (
                            <BiSolidPlane size={20} color="#929292" />
                        ) : (
                            <BiSolidCity size={20} color="#929292" />
                        )}
                    </Section>
                    <Section styles={{ flexGrow: 1, minWidth: 0 }}>
                        <Text
                            type="p"
                            size={16}
                            color="#929292"
                            className="truncate"
                            text={`${option.name} (${option.code})`}
                        />
                        <Text
                            type="p"
                            size={12}
                            weight={300}
                            className="truncate"
                            color="#929292"
                            text={
                                option.city?.country?.name ??
                                option.country?.name ??
                                option.city?.name ??
                                option.alternative_names[0] ??
                                option.name
                            }
                        />
                    </Section>
                </Box>
            )}
            renderInput={(params) => (
                <TextField
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
                            // borderColor: "red",
                        },
                        "& .MuiFormControl-root": {
                            outline: "none !important",
                        },
                        "& .MuiOutlinedInput-root": {
                            outline: "none !important",

                            padding: "0  .875rem !important",
                        },
                        "&:hover .MuiInputBase-root": {
                            color: `${ttColors.primary} !important`,
                        },
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
                                <IoLocationOutline size={20} />
                            </InputAdornment>
                        ),
                        endAdornment: <></>,
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
