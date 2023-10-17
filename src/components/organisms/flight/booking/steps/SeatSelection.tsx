import Button from "@/components/atoms/button";
import Image from "@/components/atoms/image";
import Text from "@/components/atoms/text";
import PlaneSeatsComponent from "@/components/molecules/flights/booking/PlaneSeatsComponent";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Section from "@/components/molecules/section";
import CustomConfirmationModal from "@/components/organisms/visaApplicationModal";
import Flex from "@/components/templates/flex";
import { capitalized } from "@/lib/extensions/helpers/capitalize";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import {
  SeatInterface,
  mockRows,
} from "@/lib/types/response-models/flight/booking.type";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SeatHeader } from "../headers";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { CheckSeatingRequestInput } from "@/lib/types/request-models/flight/booking.type";

const Wrapper = styled.div`
  background-image: url(${"/assets/images/flights/plane_background.png"});
  background-position: center;
  background-size: 200%;
`;
const SeatSelection = () => {
  const { isMobile } = useScreenResolution();
  const [showSeatSelectionModal, setShowSeatSelectionModal] = useState(false);
  const [selectionModalContent, setSelectionModalContent] = useState({
    seatDescription: <></>,
    seatName: "",
  });
  const selectSeat = ({
    seat: {
      seat_class,
      name,
      price: { amount, currency },
    },
  }: {
    seat: SeatInterface;
  }) => {
    setSelectionModalContent({
      seatDescription: (
        <Flex width="fit-content" margin="auto" align="center" gap="19px">
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
    });
    setShowSeatSelectionModal(true);
  };

  const { checkSeating, bookingToken, sessionId, saveBookingDetails } =
    useFlightBookingStore((state) => state);

  const fetchSeats = async () => {
    await checkSeating({
      data: {
        ancillaries: ["seating"],
        booking_token: bookingToken ?? "",
        currency: "EUR",
        passengers: saveBookingDetails.passengers.map((el) => ({
          nationality: el.nationality,
          birthday: el.birthday,
          category: el.category,
        })),
        session_id: sessionId ?? "",
      },
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
          " for Jonathan Adah? "
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
              onClick={() => {}}
            >
              Continue
            </Button>
          </>
        }
      />
      <Section>
        {!isMobile && (
          <Section padding="0 0 4rem 0">
            <SeatHeader />
          </Section>
        )}
        <Wrapper>
          <Section
            width="fit-content"
            styles={{ background: "white", borderRadius: "8px" }}
            padding="12px 9px"
            margin="1.5rem auto"
          >
            <PlaneSeatsComponent rows={mockRows} selectSeat={selectSeat} />
          </Section>
        </Wrapper>
      </Section>
    </>
  );
};

export default SeatSelection;
