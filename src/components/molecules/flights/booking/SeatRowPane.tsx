import Flex from "@/components/templates/flex";
import {
  SeatInterface,
  SeatRowInterface,
} from "@/lib/types/response-models/flight/booking.type";
import SeatGroupPane from "./SeatGroupPane";
import Section from "../../section";
import Text from "@/components/atoms/text";

interface SeatRowPaneProps {
  row: SeatRowInterface;
  selectSeat(params: { seat: SeatInterface }): void;
}
const SeatRowPane = ({ row, selectSeat }: SeatRowPaneProps) => {
  return (
    <Flex width="fit-content">
      {row.seat_groups.map((seatGroup, index) => (
        <>
          <SeatGroupPane seatGroup={seatGroup} selectSeat={selectSeat} />
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
  );
};

export default SeatRowPane;
