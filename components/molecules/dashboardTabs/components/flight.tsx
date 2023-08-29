import styled from "styled-components";
import NoVisaApplication from "./noVisaApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
import NoVisaBg from "@image/background.png";
import FlightImg from "@image/flight.png";
import { ttColors } from "theme/colors";

const FlightWrapper = styled.div`
  background: ${ttColors.defaultColor};
  align-items: center;
  margin-top: 15px;

  & button {
    width: 154px !important;
  }

  @media screen and (max-width: 900px) {
    height: fit-content;
    padding: 20px 16px;
  }
`;

const Flight = () => {

     const content = {
       title: "You’ve booked no Flight Ticket yet - Let’s help you get Started",
       links: [
         { text: "Search Flights", url: "/flight" },
         { text: "Search Stays", url: "/stays" },
       ],
     };
  return (
    <FlightWrapper>
      <VisaDashboardHeader headerText="All Flight Applications" />
      <NoVisaApplication
        noVisaImage={FlightImg}
        content={content}
      />
    </FlightWrapper>
  );
};

export default Flight;
