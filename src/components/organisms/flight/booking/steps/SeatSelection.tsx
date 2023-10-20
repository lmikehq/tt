import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import PlaneSeatsComponent from "@/components/molecules/flights/booking/PlaneSeatsComponent";
import Section from "@/components/molecules/section";
import CustomConfirmationModal from "@/components/organisms/visaApplicationModal";
import Flex from "@/components/templates/flex";
import { capitalized } from "@/lib/extensions/helpers/capitalize";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import {
  SeatInterface,
  SeatRowInterface,
  mockRows,
} from "@/lib/types/response-models/flight/booking.type";
import { ReactNode, useEffect, useState } from "react";
import { styled } from "styled-components";
import { SeatHeader } from "../headers";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import {
  CheckSeatingRequestInput,
  ParticularSeatingOption,
  SaveBookingRequestInput,
  SeatingSeatPrice,
} from "@/lib/types/request-models/flight/booking.type";
import { SearchInputAsString } from "@/components/organisms/searchInput";
import { Mode } from "@/lib/types";
import SearchStringInput from "@/components/molecules/searchInputs/searchStringInput";

const Wrapper = styled.div`
  background-image: url(${"/assets/images/flights/plane_background.png"});
  background-position: center;
  background-size: 200%;
`;
const SeatSelection = () => {
  const { isMobile } = useScreenResolution();
  const [showSeatSelectionModal, setShowSeatSelectionModal] = useState(false);
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
        <Flex width="fit-content" margin="auto" align="center" gap="19px">
          <Section
            height="48px"
            width="48px"
            styles={{
              backgroundColor: "#F17400",
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
              text={"From " + currency + " " + amount}
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
    setParticularSeats,
  } = useFlightBookingStore((state) => state);
  const passengers = saveBookingDetails.passengers.map((el) => ({
    nationality: el.nationality,
    birthday: el.birthday,
    category: el.category,
  }));
  const offers = checkSeatingResponse?.seating.offers;

  const selectParticularSeat = ({
    name,
    price,
    segmentCode,
  }: {
    name: string;
    price: SeatingSeatPrice;
    segmentCode: string;
  }) => {
    const findIndex = particularSeats.findIndex(
      (el, index) => el.segment_code == segmentCode
    );

    if (findIndex == -1)
      return setParticularSeats([
        ...particularSeats,
        {
          segment_code: segmentCode,
          option: "particular_seat",
          seats: [
            {
              seat: name,
              passenger_idx:
                currentPassenger == "Main Passenger"
                  ? 0
                  : parseInt(currentPassenger.split("Passenger ")[1]) - 1,
              price: price,
            },
          ],
        },
      ]);

    const seats = particularSeats;
    seats[findIndex].seats = [
      ...seats[findIndex].seats,
      {
        seat: name,
        passenger_idx:
          currentPassenger == "Main Passenger"
            ? 0
            : parseInt(currentPassenger.split("Passenger ")[1]) - 1,
        price: price,
      },
    ];

    setParticularSeats(seats);
  };
  const computePassengerOptions = () => {
    return passengers.map((el, index) =>
      index == 0 ? "Main Passenger" : "Passenger " + (index + 1)
    );
  };

  const fetchSeats = async () => {
    await checkSeating({
      data: {
        ancillaries: ["seating"],
        booking_token: bookingToken ?? "",
        currency: "EUR",
        passengers,
        session_id: sessionId ?? "",
      },
    }).then((res) => {
      if (res.seating.status !== "complete") return fetchSeats();
    });
  };

  useEffect(() => {
    fetchSeats();
  }, []);
  return (
    <>
      <CustomConfirmationModal
        open={showSeatSelectionModal}
        handleClose={() => setShowSeatSelectionModal(false)}
        icon={
          <Image
            src={"/assets/icons/favourite_icon.svg"}
            alt="delete-icon"
            width={95.5}
            height={95.5}
          />
        }
        title={"Fancy this seat?"}
        description={selectionModalContent.seatDescription}
        subTitle={
          "Would you like to pick seat " +
          selectionModalContent.seatName +
          " for " +
          currentPassenger
        }
        buttons={
          <>
            <Button
              background="transparent"
              color={ttColors.dark}
              border="1px solid #19013b"
              onClick={() => setShowSeatSelectionModal(false)}
            >
              Cancel
            </Button>
            <Button
              background={ttColors.blackishBlue}
              color="#fff"
              onClick={() => {
                selectParticularSeat({
                  name: selectionModalContent.seatName,
                  segmentCode: selectionModalContent.segmentCode,
                  price: selectionModalContent.price!,
                });
                setShowSeatSelectionModal(false);
              }}
            >
              Continue
            </Button>
          </>
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
                  onChange={(value: string) => setCurrentPassenger(value)}
                  value={currentPassenger}
                  placeholder={"Select Passenger"}
                />
              </Section>
            </Flex>
          </Section>
        )}
        {checkSeatingMode == Mode.loaded ? (
          <Wrapper>
            <Flex
              width="fit-content"
              direction="column"
              gap="12px"
              styles={{ background: "white", borderRadius: "8px" }}
              padding="12px 9px"
              margin="1.5rem auto"
            >
              {offers && offers[1] ? (
                <PlaneSeatsComponent
                  rows={offers![1].seatmap.sections[0].rows}
                  selectSeat={({ seat }: { seat: SeatInterface }) =>
                    selectSeat({ seat, segmentCode: offers![1].segment_code })
                  }
                />
              ) : null}
              {offers && offers[0] ? (
                <PlaneSeatsComponent
                  rows={offers![0].seatmap.sections[0].rows}
                  selectSeat={({ seat }: { seat: SeatInterface }) =>
                    selectSeat({ seat, segmentCode: offers![0].segment_code })
                  }
                />
              ) : null}
            </Flex>
          </Wrapper>
        ) : (
          <>Fetching passenger seats</>
        )}

        <Button
          type="submit"
          background={ttColors.dark}
          width="100%"
          onClick={() => {
            saveBooking({
              data: {
                ...saveBookingDetails,
                additional_services: {
                  seating: [...particularSeats],
                },
              },
            });
          }}
        >
          Continue
        </Button>
      </Section>
    </>
  );
};

export default SeatSelection;
