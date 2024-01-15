import React from "react";
import { Container, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
    formatPriceWithoutCurrency,
    getCurrency,
} from "@/lib/extensions/helpers/formatPrice";
import { ttColors } from "@/lib/theme/colors";
import { numberOfAdultsAndChildrenGuestsToString } from "@/lib/types/request-models/stay/search.type";
import { ViewSingleStayResponse } from "@/lib/types/response-models/stay/search.type";
import { StayPaymentOption } from "@/lib/types/response-models/stay/booking.type";
interface PriceDetailProps {
    guests: string;
    currentPaymentOption?: StayPaymentOption;
    durationDays: number;
    hotel: ViewSingleStayResponse;
}
function PriceDetail({
    guests,
    currentPaymentOption,
    durationDays,
    hotel,
}: PriceDetailProps) {
    return (
        <Container>
            <Span>
                <Flex direction="column" gap="20px">
                    <Flex justify="space-between" align="center">
                        <Flex>
                            <Text
                                type="h3"
                                weight={600}
                                whiteSpace="nowrap"
                                text="Price Details"
                            ></Text>
                        </Flex>
                        <Flex align="center" gap="5px" justify="flex-end">
                            <PeopleAltIcon />
                            <Text
                                type="p"
                                text={numberOfAdultsAndChildrenGuestsToString(
                                    guests
                                )}
                            ></Text>
                        </Flex>
                    </Flex>
                    <Flex justify="space-between" align="center">
                        <Flex>
                            <Text
                                type="p"
                                text={durationDays + " nights"}
                                whiteSpace="nowrap"
                            ></Text>
                        </Flex>
                        <Flex gap="5px" align="center" justify="flex-end">
                            <Text
                                type="p"
                                size={18}
                                weight={600}
                                text={
                                    hotel?.rates[0].payment_options
                                        .payment_types[0].show_currency_code ??
                                    ""
                                }
                            />
                            <Text
                                type="p"
                                size={18}
                                weight={600}
                                text={formatPriceWithoutCurrency(
                                    parseInt(
                                        hotel?.rates[0].payment_options
                                            .payment_types[0].show_amount ?? ""
                                    )
                                )}
                            />
                        </Flex>
                    </Flex>
                    {/* <Flex justify="space-between" align="center">
                        <Flex>
                            <Text
                                type="p"
                                text="Taxes & Fees"
                                whiteSpace="nowrap"
                            ></Text>
                        </Flex>
                        <Flex gap="5px" align="center" justify="flex-end">
                            <Text
                                type="p"
                                size={18}
                                weight={600}
                                text={
                                    
                                }
                            />
                            <Text
                                type="p"
                                size={18}
                                weight={600}
                                text={formatPriceWithoutCurrency(35800)}
                            />
                        </Flex>
                    </Flex> */}
                    <Span
                        className="vat_percentage"
                        style={{
                            backgroundColor: ttColors.grayishAsh,
                            padding: "15px",
                            borderRadius: "8px",
                        }}
                    >
                        <Flex direction="column" gap="10px">
                            <Flex justify="space-between" align="center">
                                <Flex>
                                    <Text type="p" text="5% VAT"></Text>
                                </Flex>
                                <Flex
                                    gap="5px"
                                    align="center"
                                    justify="flex-end"
                                >
                                    <Text
                                        type="p"
                                        size={18}
                                        weight={600}
                                        text={
                                            hotel?.rates[0].payment_options
                                                .payment_types[0].vat_data
                                                .currency_code ?? ""
                                        }
                                    />
                                    <Text
                                        type="p"
                                        size={18}
                                        weight={600}
                                        text={formatPriceWithoutCurrency(
                                            parseInt(
                                                hotel?.rates[0].payment_options
                                                    .payment_types[0].vat_data
                                                    .amount ?? ""
                                            )
                                        )}
                                    />
                                </Flex>
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <Flex>
                                    <Text type="p" text="Service Charge"></Text>
                                </Flex>
                                <Flex
                                    gap="5px"
                                    align="center"
                                    justify="flex-end"
                                >
                                    <Text
                                        type="p"
                                        size={18}
                                        weight={600}
                                        text={getCurrency()}
                                    />
                                    <Text
                                        type="p"
                                        size={18}
                                        weight={600}
                                        text={formatPriceWithoutCurrency(9200)}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Span>
                    <Flex justify="space-between" align="center">
                        <Flex>
                            <Text type="h3" weight={600} text="Total"></Text>
                        </Flex>
                        <Flex gap="5px" align="center" justify="flex-end">
                            <Text
                                type="p"
                                size={24}
                                weight={600}
                                text={getCurrency()}
                            />
                            <Text
                                type="p"
                                size={30}
                                weight={600}
                                text={formatPriceWithoutCurrency(105800)}
                            />
                        </Flex>
                    </Flex>
                </Flex>
            </Span>
        </Container>
    );
}

export default PriceDetail;
