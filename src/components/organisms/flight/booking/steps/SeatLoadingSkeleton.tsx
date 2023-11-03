import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import { SeatRowInterface } from "@/lib/types/response-models/flight/booking.type";
import { Skeleton } from "@mui/material";

const SeatLoadingSkeleton = () => {
    return (
        <Section>
            <Flex
                width="fit-content"
                direction="column"
                gap="12px"
                styles={{
                    background: "white",
                    borderRadius: "8px",
                }}
                padding="12px 9px"
                margin="1.5rem auto"
            >
                <Flex direction="column" gap="12px">
                    {Array.from(
                        { length: 40 },
                        (_, index): SeatRowInterface => ({
                            row_number: index + 1,
                            seat_groups: [
                                [
                                    {
                                        column: "A",
                                        features: ["window"],
                                        name: `${index + 1}` + "-A",
                                        price: {
                                            amount: "0",
                                            base: "0",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "0",
                                        },
                                        seat_class: "standard",
                                        state: "unavailable",
                                        type: "seat",
                                    },
                                    {
                                        column: "B",
                                        features: [],
                                        name: `${index + 1}` + "-B",
                                        price: {
                                            amount: "248",
                                            base: "236",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                    {
                                        column: "C",
                                        features: ["aisle"],
                                        name: `${index + 1}` + "-C",
                                        price: {
                                            amount: "261",
                                            base: "249",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                ],
                                [
                                    {
                                        column: "D",
                                        features: ["aisle"],
                                        name: `${index + 1}` + "-D",
                                        price: {
                                            amount: "261",
                                            base: "249",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                    {
                                        column: "E",
                                        features: [],
                                        name: `${index + 1}` + "-E",
                                        price: {
                                            amount: "240",
                                            base: "228",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                    {
                                        column: "F",
                                        features: ["aisle"],
                                        name: `${index + 1}` + "-F",
                                        price: {
                                            amount: "261",
                                            base: "249",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                ],
                                [
                                    {
                                        column: "J",
                                        features: ["aisle"],
                                        name: `${index + 1}` + "-J",
                                        price: {
                                            amount: "261",
                                            base: "249",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                    {
                                        column: "K",
                                        features: [],
                                        name: `${index + 1}` + "-K",
                                        price: {
                                            amount: "248",
                                            base: "236",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "12",
                                        },
                                        seat_class: "standard",
                                        state: "available",
                                        type: "seat",
                                    },
                                    {
                                        column: "L",
                                        features: ["window"],
                                        name: `${index + 1}` + "-L",
                                        price: {
                                            amount: "0",
                                            base: "0",
                                            currency: "EUR",
                                            merchant: "0",
                                            service: "0",
                                            service_flat: "0",
                                        },
                                        seat_class: "standard",
                                        state: "unavailable",
                                        type: "seat",
                                    },
                                ],
                            ],
                        })
                    ).map((row, index) => (
                        <Flex
                            key={"row-" + index}
                            width=""
                            justify="space-between"
                        >
                            {row.seat_groups.map((seatGroup, index) => (
                                <>
                                    <Grid
                                        columns={`${seatGroup.length}`}
                                        width="fit-content"
                                        gap="5px"
                                    >
                                        {seatGroup.map((seat, index) => (
                                            <Skeleton
                                                key={"s-" + index}
                                                variant="rectangular"
                                                height={"32px"}
                                                width={"22px"}
                                            />
                                        ))}
                                    </Grid>
                                    {index != row.seat_groups.length - 1 && (
                                        <Flex
                                            width="30px"
                                            height="32px"
                                            styles={{ flex: "none" }}
                                            justify="center"
                                            align="center"
                                        >
                                            <Text
                                                text={`${row.row_number}`}
                                                type="p"
                                                size={14}
                                                color="#7C8DB0"
                                            />
                                        </Flex>
                                    )}
                                </>
                            ))}
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Section>
    );
};

export default SeatLoadingSkeleton;
