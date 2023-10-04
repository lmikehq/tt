import Flex from "@/components/templates/flex";
import { Grid } from "@/components/templates/grid";
import {
  SeatAvailability,
  SeatInterface,
} from "@/lib/types/response-models/flight/booking.type";
import { styled } from "styled-components";

const SingleSeatBox = styled.div<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor};
  height: 32px;
  width: 22px;
  border-radius: 4px;
  cursor: pointer;
`;
interface SeatGroupProps {
  seatGroup: SeatInterface[];
  selectSeat(params: { seat: SeatInterface }): void;
}
const SeatGroupPane = ({ seatGroup, selectSeat }: SeatGroupProps) => {
  const computeSeatColor = ({ seatClass }: { seatClass: string }) => {
    return "#F17400";
  };
  return (
    <Grid columns={`${seatGroup.length}`} gap="5px">
      {seatGroup.map((seat) => (
        <SingleSeatBox
          key={"seat-" + seat.name}
          onClick={() => selectSeat({ seat })}
          bgColor={
            seat.state == SeatAvailability.unavailable
              ? "#E9E8FC"
              : computeSeatColor({ seatClass: seat.seat_class })
          }
        />
      ))}
    </Grid>
  );
};

export default SeatGroupPane;
