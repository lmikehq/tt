import PlaneSeatsComponent from "@/components/molecules/flights/booking/PlaneSeatsComponent";
import FormTitleAndSubtitle from "@/components/molecules/forms/FormTitleAndSubtitle";
import Section from "@/components/molecules/section";
import {
  SeatInterface,
  mockRows,
} from "@/lib/types/response-models/flight/booking.type";
import { styled } from "styled-components";

const Wrapper = styled.div`
  background-image: url(${"/assets/images/flights/plane_background.png"});
  background-position: center;
  background-size: 200%;
`;
const SeatSelection = () => {
  const selectSeat = (params: { seat: SeatInterface }) => {};

  return (
    <>
      <Section>
        <Section padding="0 0 4rem 0">
          <FormTitleAndSubtitle
            title={"Seat Selection"}
            subTitle={"Select a seat of your choice"}
          />
        </Section>
        <Wrapper>
          <Section
            width="fit-content"
            margin="auto"
            styles={{ background: "white", borderRadius: "8px" }}
            padding="12px 9px"
          >
            <PlaneSeatsComponent rows={mockRows} selectSeat={selectSeat} />
          </Section>
        </Wrapper>
      </Section>
    </>
  );
};

export default SeatSelection;
