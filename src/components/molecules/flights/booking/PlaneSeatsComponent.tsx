import Flex from "@/components/templates/flex";
import {
    SeatInterface,
    SeatRowInterface,
    SeatRowWithSegmentCodeInterface,
} from "@/lib/types/response-models/flight/booking.type";
import SeatRowPane from "./SeatRowPane";

interface PlaneSeatsComponentProps {
    rows: SeatRowWithSegmentCodeInterface[];
    selectSeat(params: { seat: SeatInterface; segmentCode: string }): void;
}
const PlaneSeatsComponent = ({
    rows,
    selectSeat,
}: PlaneSeatsComponentProps) => {
    return (
        <Flex direction="column" gap="12px">
            {rows.map((row) => (
                <SeatRowPane
                    key={"row-" + row.row_number}
                    row={row}
                    selectSeat={selectSeat}
                />
            ))}
        </Flex>
    );
};

export default PlaneSeatsComponent;
