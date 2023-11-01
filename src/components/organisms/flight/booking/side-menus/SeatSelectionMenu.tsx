import Button from "@/components/atoms/button";
import Text from "@/components/atoms/text";
import Section from "@/components/molecules/section";
import Flex from "@/components/templates/flex";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import {
    SeatInterface,
    seatClass,
} from "@/lib/types/response-models/flight/booking.type";
import { BiArrowToRight, BiRightArrow, BiRightArrowAlt } from "react-icons/bi";

const SeatSelectionMenu = () => {
    const { particularSeats, saveBookingDetails, seatRows } =
        useFlightBookingStore();
    const passengers = saveBookingDetails.passengers.map((el) => ({
        nationality: el.nationality,
        birthday: el.birthday,
        category: el.category,
    }));
    const findSeatWithPassengerIndex = ({
        index,
    }: {
        index: number;
    }): string | null => {
        for (const segment of particularSeats) {
            for (const seat of segment.seats) {
                if (seat.passenger_idx === index) {
                    return "Seat " + seat.seat;
                }
            }
        }

        return null;
    };

    const leastStandardSeat = findSeatWithLeastAmount({
        seatClass: seatClass.standard.name,
    });
    const leastExtraLegRoomSeat = findSeatWithLeastAmount({
        seatClass: seatClass.standard.name,
    });

    function findSeatWithLeastAmount({
        seatClass,
    }: {
        seatClass: string;
    }): SeatInterface | null {
        let leastAmount: number | null = null;
        let leastSeat: SeatInterface | null = null;

        for (const row of seatRows) {
            for (const group of row.seat_groups) {
                for (const seat of group) {
                    if (seat.seat_class === seatClass) {
                        const amount = parseFloat(seat.price.amount);

                        if (leastAmount === null || amount < leastAmount) {
                            leastAmount = amount;
                            leastSeat = seat;
                        }
                    }
                }
            }
        }

        return leastSeat;
    }

    function countAvailableSeats({ seatClass }: { seatClass: string }): number {
        let availableSeatsCount = 0;

        for (const row of seatRows) {
            for (const group of row.seat_groups) {
                for (const seat of group) {
                    if (
                        seat.seat_class === seatClass &&
                        seat.state === "available"
                    ) {
                        availableSeatsCount++;
                    }
                }
            }
        }

        return availableSeatsCount;
    }
    return (
        <Section>
            <Section>
                <Flex justify="space-between" align="center">
                    <Section>
                        <Text
                            size={16}
                            weight={500}
                            type="h1"
                            text="Lagos, Murtala Mohammed Airport (LOS)"
                        />
                    </Section>
                    <Section width="fit-content" padding={"1.5rem"}>
                        <BiRightArrowAlt size={24} />
                    </Section>
                    <Section>
                        <Text
                            size={16}
                            weight={500}
                            type="h1"
                            text="Lagos, Murtala Mohammed Airport (LOS)"
                        />
                    </Section>
                </Flex>
            </Section>
            <Section margin="20px 0 48px 0">
                <Text
                    type="p"
                    text="Saturday, 26 August 2023"
                    color="#606060"
                    weight={400}
                />
            </Section>
            <Flex direction="column" align="center" gap="1rem">
                <Flex align="center" gap="19px">
                    <Section
                        height="48px"
                        width="48px"
                        styles={{
                            backgroundColor: "#8E4400",
                            flex: "none",
                            borderRadius: "6px",
                        }}
                    >
                        <></>
                    </Section>
                    <Flex
                        justify="space-between"
                        align="center"
                        styles={{ flexGrow: 1 }}
                    >
                        <Section>
                            <Text
                                type="p"
                                color="#101010"
                                size={16}
                                weight={400}
                                text="Standard"
                            />
                            <Text
                                type="p"
                                color={"#101010"}
                                size={16}
                                weight={400}
                                text={
                                    "From " +
                                    leastStandardSeat?.price.currency +
                                    " " +
                                    leastStandardSeat?.price.amount
                                }
                            />
                        </Section>
                        <Text
                            type="p"
                            size={16}
                            weight={400}
                            text={
                                countAvailableSeats({
                                    seatClass: seatClass.standard.name,
                                }) + " seats left"
                            }
                            color="#6092A7"
                        />
                    </Flex>{" "}
                </Flex>
                <Flex align="center" gap="19px">
                    <Section
                        height="48px"
                        width="48px"
                        styles={{
                            backgroundColor: "#8E4400",
                            flex: "none",
                            borderRadius: "6px",
                        }}
                    >
                        <></>
                    </Section>
                    <Flex
                        justify="space-between"
                        align="center"
                        styles={{ flexGrow: 1 }}
                    >
                        <Section>
                            <Text
                                type="p"
                                color="#101010"
                                size={16}
                                weight={400}
                                text={seatClass.extra_legroom_seat.name}
                            />
                            <Text
                                type="p"
                                color={"#101010"}
                                size={16}
                                weight={400}
                                text={
                                    "From " +
                                    leastExtraLegRoomSeat?.price.currency +
                                    " " +
                                    leastExtraLegRoomSeat?.price.amount
                                }
                            />
                        </Section>
                        <Text
                            type="p"
                            size={16}
                            weight={400}
                            text={
                                countAvailableSeats({
                                    seatClass:
                                        seatClass.extra_legroom_seat.name,
                                }) + " seats left"
                            }
                            color="#6092A7"
                        />
                    </Flex>{" "}
                </Flex>
            </Flex>

            <Section margin="40px 0 0 0">
                <Text type="h5" text="Seat Selection" size={20} weight={600} />
                {passengers.map((el, index) => {
                    const selected = findSeatWithPassengerIndex({ index });
                    return (
                        <Flex
                            key={"passenger" + index}
                            justify="space-between"
                            align="center"
                            margin="0 0 16px 0"
                            styles={{ flexGrow: 1 }}
                        >
                            <Section>
                                <Text
                                    type="p"
                                    color="#101010"
                                    size={16}
                                    weight={400}
                                    text={
                                        index == 0
                                            ? "Main Passenger"
                                            : "Passenger " + (index + 1)
                                    }
                                />
                                <Text
                                    type="p"
                                    color="#101010"
                                    size={16}
                                    weight={400}
                                    text={selected ?? "Not Selected"}
                                />
                            </Section>
                            <Button
                                background="transparent"
                                width="fit content"
                            >
                                <Text
                                    type="p"
                                    size={16}
                                    weight={400}
                                    text={selected ? "Change" : "Select"}
                                    color="#6092A7"
                                />
                            </Button>
                        </Flex>
                    );
                })}
            </Section>
        </Section>
    );
};

export default SeatSelectionMenu;
