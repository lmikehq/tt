import Text from "@/components/atoms/text";
import Flex from "@/components/templates/flex";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
import { MenuItem, Select } from "@mui/material";
import { PiCaretDownBold } from "react-icons/pi";
import { Container, Span } from "../view/styles";

interface SelectCurrencyProps {
    paymentOptions: StayPaymentOption[];
    currentPaymentOption?: StayPaymentOption;
    onChangePaymentOption: (id: string) => void;
}
const SelectCurrency = ({
    paymentOptions,
    currentPaymentOption,
    onChangePaymentOption,
}: SelectCurrencyProps) => {
    return (
        <Container>
            <Span>
                {currentPaymentOption && (
                    <Flex justify="space-between">
                        <Select
                            defaultValue={currentPaymentOption?.currency_code}
                            value={currentPaymentOption?.currency_code}
                            onChange={(e) =>
                                onChangePaymentOption(e.target.value)
                            }
                            IconComponent={PiCaretDownBold}
                            MenuProps={{
                                sx: {
                                    "& .MuiPaper-root": {
                                        maxHeight: "50vh",
                                        top: "55px !important",
                                        boxShadow:
                                            "0px 0px 1px rgba(0,0,0,0.3)",
                                    },
                                    "& .MuiPaper-root::-webkit-scrollbar": {
                                        backgroundColor: "transparent",
                                        width: "9px",
                                        height: "9px",
                                    },
                                    "& .MuiPaper-root::-webkit-scrollbar-thumb":
                                        {
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.15)",
                                            borderRadius: "6px",
                                        },
                                    '& li[aria-selected="true"]': {
                                        background: "#DAF0F9",
                                    },
                                },
                            }}
                            sx={{
                                boxShadow: "none",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                ".MuiSvgIcon-root": {
                                    display: "none",
                                },
                                ".MuiSelect-select": {
                                    width: "min-content",
                                    padding: "0",
                                    fontFamily: "Poppins",
                                    appearance: "none !important",
                                },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                            }}
                        >
                            {paymentOptions.map(
                                (el: StayPaymentOption, index: number) => (
                                    <MenuItem
                                        key={"item-" + index}
                                        value={el.currency_code}
                                        sx={{ fontSize: "16px" }}
                                    >
                                        {el.currency_code}
                                    </MenuItem>
                                )
                            )}
                        </Select>

                        {currentPaymentOption && (
                            <Flex gap="0.5rem" width="fit-content">
                                <Text
                                    type="h5"
                                    size={20}
                                    text={currentPaymentOption?.currency_code.toUpperCase()}
                                />
                                <Text
                                    type="h5"
                                    size={20}
                                    text={currentPaymentOption?.amount}
                                />
                            </Flex>
                        )}
                    </Flex>
                )}
            </Span>
        </Container>
    );
};

export default SelectCurrency;
