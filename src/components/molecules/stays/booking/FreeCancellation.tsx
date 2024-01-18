import React from "react";
import { Container, Span } from "../view/styles";
import Flex from "@/components/templates/flex";
import Text from "@/components/atoms/text";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import dayjs from "dayjs";

interface FreeCancellationProps {
    freeCancelationBefore: string;
}
function FreeCancellation({ freeCancelationBefore }: FreeCancellationProps) {
    return (
        <Container>
            <Span>
                <Flex direction="column">
                    <Flex align="center" gap="10px">
                        <CurrencyExchangeIcon />
                        <Text
                            size={16}
                            weight={600}
                            type="h4"
                            text="Free Cancellation"
                        ></Text>
                    </Flex>
                    <Flex styles={{ marginTop: "15px" }}>
                        <Text
                            type="p"
                            text={`You have the option to cancel for free until 11:59 PM on ${dayjs(
                                freeCancelationBefore
                            )
                                .subtract(1, "day")
                                .format(
                                    "MMMM DD, YYYY"
                                )} (in the hotel's local time). However, if you cancel after that time, you will incur a 100% charge of the total cost.`}
                        ></Text>
                    </Flex>
                </Flex>
            </Span>
        </Container>
    );
}

export default FreeCancellation;
