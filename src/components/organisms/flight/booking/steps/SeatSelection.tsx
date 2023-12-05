import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import PlaneSeatsComponent from "@/components/molecules/flights/booking/PlaneSeatsComponent";
import Section from "@/components/molecules/section";
import CustomConfirmationModal, {
    CustomConfirmationModalProps,
} from "@/components/organisms/visaApplicationModal";
import Flex from "@/components/templates/flex";
import { capitalized } from "@/lib/extensions/helpers/capitalize";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import {
    SeatInterface,
    SeatRowInterface,
    SeatRowWithSegmentCodeInterface,
    mockRows,
    seatClass,
} from "@/lib/types/response-models/flight/booking.type";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { SeatHeader } from "../headers";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import {
    CheckSeatingRequestInput,
    ParticularSeatingOption,
    PassengerCategory,
    SaveBookingRequestInput,
    SeatingSeatPrice,
    findSeatWithPassengerIndex,
} from "@/lib/types/request-models/flight/booking.type";
import { SearchInputAsString } from "@/components/organisms/searchInput";
import { Mode } from "@/lib/types";
import SearchStringInput from "@/components/molecules/searchInputs/searchStringInput";
import { CheckSeatingResponse } from "@/lib/types/response-models/flight/check_seating.type";
import SeatLoadingSkeleton from "./SeatLoadingSkeleton";
import { BiSolidXCircle } from "react-icons/bi";
import Spinner from "@/components/molecules/icons/spinner";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import {
    constructParamsFromQuery,
    constructQueryFromParams,
    extractSearchParamsFromUrl,
} from "@/lib/extensions/helpers/constructQuery";
import { formatPrice } from "@/lib/extensions/helpers/formatPrice";
import { useUserPreferencesStore } from "@/lib/store/preferences.store";

const Wrapper = styled.div``;
// background-image: url(${"/assets/images/flights/plane_background.png"});
// background-position: center;
// background-size: 200%;
const SeatSelection = () => {
    const { isMobile } = useScreenResolution();
    const [showSeatSelectionModal, setShowSeatSelectionModal] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { preFerredCurrency, conversionRate } = useUserPreferencesStore(
        (state) => state
    );
    const [selectionModalContent, setSelectionModalContent] = useState<{
        seatDescription: ReactNode;
        seatName: string;
        price: SeatingSeatPrice | null;
        segmentCode: string;
    }>({
        seatDescription: <></>,
        seatName: "",
        price: null,
        segmentCode: "",
    });
    const selectSeat = ({
        seat,
        segmentCode,
    }: {
        seat: SeatInterface;
        segmentCode: string;
    }) => {
        const { seat_class, name, price } = seat;
        const { amount, currency } = price;
        setSelectionModalContent({
            seatDescription: (
                <Flex
                    width="fit-content"
                    margin="auto"
                    align="center"
                    gap="19px"
                >
                    <Section
                        height="48px"
                        width="48px"
                        styles={{
                            backgroundColor:
                                seatClass[
                                    seat_class
                                        .toLowerCase()
                                        .replaceAll(" ", "_")
                                ].color,
                            flex: "none",
                            borderRadius: "6px",
                        }}
                    >
                        <></>
                    </Section>
                    <Section>
                        <Text
                            type="p"
                            color="#101010"
                            size={16}
                            weight={400}
                            text={capitalized(seat_class)}
                            textAlign="left"
                        />
                        <Text
                            type="p"
                            color="#101010"
                            size={16}
                            weight={400}
                            textAlign="left"
                            text={
                                "From " +
                                formatPrice({
                                    total: parseInt(amount) * conversionRate,
                                    currency: preFerredCurrency,
                                })
                            }
                        />
                    </Section>
                </Flex>
            ),
            seatName: name,
            price,
            segmentCode,
        });
        setShowSeatSelectionModal(true);
    };
    const [currentPassenger, setCurrentPassenger] = useState("Main Passenger");

    const {
        checkSeating,
        checkSeatingResponse,
        bookingToken,
        sessionId,
        saveBookingDetails,
        setSaveBookingDetails,
        checkSeatingMode,
        saveBooking,
        particularSeats,
        nextStep,
        setParticularSeats,
        seatRows,
        setSeatRows,
        saveBookingMode,
        updateSeatAvailablity,
    } = useFlightBookingStore((state) => state);
    const [emptySeatsModalOpen, setEmptySeatsModalOpen] = useState(false);

    const handleDisplayEmptySeatModal = () => {
        setEmptySeatsModalOpen(true);
    };

    const passengers = saveBookingDetails.passengers
        .filter((el) => el.category !== PassengerCategory.INFANT)
        .map((el) => ({
            nationality: el.nationality,
            birthday: el.birthday,
            category: el.category,
        }));

    const selectParticularSeat = ({
        name,
        price,
        segmentCode,
    }: {
        name: string;
        price: SeatingSeatPrice;
        segmentCode: string;
    }) => {
        const passengerIdx =
            currentPassenger == "Main Passenger"
                ? 0
                : parseInt(currentPassenger.split("Passenger ")[1]) - 1;

        const formerSeatSearchIndices: number[] | null = (() => {
            for (let i = 0; i < particularSeats.length; i++) {
                const particular = particularSeats[i];
                const index = particular.seats.findIndex(
                    (el) => el.passenger_idx == passengerIdx
                );
                if (index !== -1) return [i, index];
            }
            return null;
        })();

        const checkIfSegmentHasBeenCreated = particularSeats.findIndex(
            (el) => el.segment_code == segmentCode
        );
        const seats = particularSeats;

        if (!formerSeatSearchIndices) {
            //This condition means passenger has not selected a seat before
            if (checkIfSegmentHasBeenCreated == -1)
                return setParticularSeats([
                    ...particularSeats,
                    {
                        segment_code: segmentCode,
                        option: "particular_seat",
                        seats: [
                            {
                                seat: name,
                                passenger_idx: passengerIdx,
                                price: price,
                            },
                        ],
                    },
                ]);

            seats[checkIfSegmentHasBeenCreated].seats = [
                ...seats[checkIfSegmentHasBeenCreated].seats,
                {
                    seat: name,
                    passenger_idx: passengerIdx,
                    price: price,
                },
            ];

            return setParticularSeats(seats);
        }

        if (segmentCode == seats[formerSeatSearchIndices[0]].segment_code) {
            //This condition means passenger's newly selected seat is in the same segment as passenger's formerly selected seat
            seats[formerSeatSearchIndices[0]].seats[
                formerSeatSearchIndices[1]
            ] = {
                seat: name,
                passenger_idx: passengerIdx,
                price: price,
            };

            return setParticularSeats(seats);
        } else {
            //This condition means passenger's newly selected seat is not in the same segment as passenger's formerly selected seat

            //This is to delete the passenger's formerly assigned seat before assigning new seat
            seats[formerSeatSearchIndices[0]].seats.splice(
                formerSeatSearchIndices[1],
                1
            );
            if (seats[formerSeatSearchIndices[0]].seats.length == 0)
                seats.splice(formerSeatSearchIndices[0]);

            if (checkIfSegmentHasBeenCreated == -1)
                //This code runs if a segment has not been created the above else condition
                return setParticularSeats([
                    ...particularSeats,
                    {
                        segment_code: segmentCode,
                        option: "particular_seat",
                        seats: [
                            {
                                seat: name,
                                passenger_idx: passengerIdx,
                                price: price,
                            },
                        ],
                    },
                ]);

            // This code runs otherwise

            seats[checkIfSegmentHasBeenCreated].seats = [
                ...seats[checkIfSegmentHasBeenCreated].seats,
                {
                    seat: name,
                    passenger_idx: passengerIdx,
                    price: price,
                },
            ];

            return setParticularSeats(seats);
        }
    };
    const computePassengerOptions = () => {
        return passengers.map((el, index) =>
            index == 0 ? "Main Passenger" : "Passenger " + (index + 1)
        );
    };

    const fetchSeats = async (): Promise<CheckSeatingResponse> => {
        return checkSeating({
            data: {
                ancillaries: ["seating"],
                booking_token: bookingToken ?? "",
                currency: "EUR",
                passengers,
                session_id: sessionId ?? "",
            },
        }).then((res) => {
            if (res.seating.status !== "complete") return fetchSeats();
            return res;
        });
    };
    const computeSeatRows = (checkSeatingResponse: CheckSeatingResponse) => {
        let rows: SeatRowWithSegmentCodeInterface[] = [];
        const offers = checkSeatingResponse.seating.offers;
        if (offers.length == 0) return handleDisplayEmptySeatModal();
        for (let i = offers.length - 1; i >= 0; i--) {
            const offer = offers[i];
            (offer.seatmap?.sections ?? []).forEach((section) => {
                rows = [
                    ...section.rows.map((el) => ({
                        ...el,
                        segmentCode: offer.segment_code,
                    })),
                ];
            });
            if (rows.length == 0) handleDisplayEmptySeatModal();
            setSeatRows(rows);
        }
    };
    const collectSeatNames = (
        seatDetails: ParticularSeatingOption[]
    ): string[] => {
        const seatNames: string[] = [];

        seatDetails.forEach((option) => {
            option.seats.forEach((seat) => {
                seatNames.push(seat.seat);
            });
        });

        return seatNames;
    };

    const handleSaveBooking = () => {
        let data: SaveBookingRequestInput;
        data =
            particularSeats.length == 0
                ? saveBookingDetails
                : {
                      ...saveBookingDetails,
                      seatId: collectSeatNames(particularSeats),
                      additional_services: {
                          seating: [...particularSeats],
                      },
                  };
        saveBooking({
            data,
        })
            .then((res) => {
                toast.success(
                    "Flight booking successful. Proceed to make Payment"
                );

                const searchParams = extractSearchParamsFromUrl({
                    url: window.location.href,
                });
                router.push(
                    pathname +
                        constructQueryFromParams({
                            ...searchParams,
                            id: res.flightId,
                            step: 5,
                        })
                );
                nextStep();
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                });
            })
            .catch((error) => {
                toast.error("Unable to save booking");
            });
    };

    useEffect(() => {
        fetchSeats().then((response) => {
            computeSeatRows(response);
        });
    }, []);
    return (
        <>
            <CustomConfirmationModal
                open={showSeatSelectionModal}
                handleClose={() => setShowSeatSelectionModal(false)}
                child={
                    <Flex
                        direction="column"
                        align="center"
                        gap="2rem"
                        padding="3rem 3rem"
                        maxWidth={isMobile? "95vw" : "35vw"}
                    >
                        <Image
                            src={"/assets/icons/favourite_icon.svg"}
                            alt="delete-icon"
                            width={70}
                            height={70}
                        />
                        <Text type="h2" text="Fancy this seat?" weight={600} size={28} />
                        
                        {selectionModalContent.seatDescription}
                        
                        <Text type="p" text={"Would you like to pick seat " + selectionModalContent.seatName + " for " + currentPassenger} weight={500} size={16} />
                        
                        <Flex gap="1rem" direction={isMobile ? "column" : "row"}>
                            <Button
                                background="transparent"
                                color={ttColors.dark}
                                border="1px solid #19013b"
                                onClick={() => setShowSeatSelectionModal(false)}
                                width={isMobile ? "100%" : "50%"}
                            >
                                Cancel
                            </Button>
                            <Button
                                background={ttColors.blackishBlue}
                                color="#fff"
                                width={isMobile ? "100%" : "50%"}
                                onClick={() => {
                                    updateSeatAvailablity({
                                        previousSeat:
                                            findSeatWithPassengerIndex({
                                                index:
                                                    currentPassenger ==
                                                    "Main Passenger"
                                                        ? 0
                                                        : parseInt(
                                                            currentPassenger.split(
                                                                "Passenger "
                                                            )[1]
                                                        ) - 1,
                                                particularSeats,
                                            })?.split("Seat ")[1] ?? null,
                                        newSeat: selectionModalContent.seatName,
                                    });

                                    selectParticularSeat({
                                        name: selectionModalContent.seatName,
                                        segmentCode:
                                            selectionModalContent.segmentCode,
                                        price: selectionModalContent.price!,
                                    });

                                    setShowSeatSelectionModal(false);
                                }}
                            >
                                Continue
                            </Button>
                        </Flex>
                    </Flex>
                }
            />
            <Section>
                {!isMobile && (
                    <Section padding="0 0 4rem 0">
                        <Flex justify="space-between" align="center">
                            <SeatHeader />
                            <Section width="180px" styles={{ flex: "none" }}>
                                <SearchStringInput
                                    options={computePassengerOptions()}
                                    onChange={(value: string) =>
                                        setCurrentPassenger(value)
                                    }
                                    value={currentPassenger}
                                    placeholder={"Select Passenger"}
                                />
                            </Section>
                        </Flex>
                    </Section>
                )}
                {checkSeatingMode == Mode.loaded && seatRows.length > 0 ? (
                    <Wrapper>
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
                            <PlaneSeatsComponent
                                rows={seatRows}
                                selectSeat={selectSeat}
                            />
                        </Flex>
                    </Wrapper>
                ) : (
                    <SeatLoadingSkeleton />
                )}

                <Button
                    type="submit"
                    background={ttColors.dark}
                    height={"3.5rem"}
                    width="100%"
                    onClick={handleSaveBooking}
                >
                    {saveBookingMode == Mode.loading ? (
                        <Spinner size="40px" fill={ttColors.primary} />
                    ) : (
                        <Text
                            type="span"
                            text={"Continue"}
                            weight={600}
                            size={16}
                            color={ttColors.light}
                        />
                    )}
                </Button>
            </Section>

            <CustomConfirmationModal
                open={emptySeatsModalOpen}
                handleClose={() => setEmptySeatsModalOpen(false)}
                child={
                    <Section
                        padding="3rem 3.5rem"
                        height="unset"
                        maxWidth={isMobile? "95vw" : "40vw"}
                    >
                        <Flex direction="column" justify="center">
                            <Section margin="0 0  14px" height="unset">
                                <Image
                                    src={"/assets/icons/empty_icon.svg"}
                                    alt="empty-icon"
                                    width={95.5}
                                    height={95.5}
                                />
                            </Section>
                            <Section margin="0 0  24px" height="unset">
                                <Text
                                    type="h3"
                                    text="Empty seat offer"
                                    size={28}
                                    weight={700}
                                    color={ttColors.dark}
                                />
                            </Section>
                            <Section margin="0 0  57.5px" height="unset">
                                <Text
                                    type="p"
                                    text="There is currently no seat offer for the flight filters selected. Don't worry, you can still proceed to save booking"
                                    weight={400}
                                    size={15}
                                    color="#929292"
                                />
                            </Section>
                            <Flex gap="1rem" direction={isMobile ? "column" : "row"}>
                                <Button
                                    width={isMobile ? "100%" : "50%"}
                                    color={ttColors.dark}
                                    background={ttColors.light}
                                    border="1px solid #19013b"
                                    onClick={() => router.push("/")}
                                >
                                    <Text
                                        type="span"
                                        text={"Change Search"}
                                        weight={600}
                                        size={16}
                                        color={ttColors.dark}
                                    />
                                </Button>
                                <Button
                                    width={isMobile ? "100%" : "50%"}
                                    background={ttColors.dark}
                                    color={ttColors.light}
                                    // border="1px solid #19013b"
                                    onClick={handleSaveBooking}
                                >
                                    {saveBookingMode == Mode.loading ? (
                                        <Spinner
                                            size="40px"
                                            fill={ttColors.primary}
                                        />
                                    ) : (
                                        <Text
                                            type="span"
                                            text={"Continue"}
                                            weight={600}
                                            size={16}
                                            color={ttColors.light}
                                        />
                                    )}
                                </Button>
                            </Flex>
                        </Flex>
                    </Section>
                }
            />
        </>
    );
};

export default SeatSelection;
