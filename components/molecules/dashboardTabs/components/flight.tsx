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
       title: "You’ve got no Visa Application - Let’s help you get Started",
       links: [
         { text: "Search Flights", url: "/" },
         { text: "Search Stays", url: "/" },
       ],
     };
  return (
    <FlightWrapper>
      <VisaDashboardHeader />
      <NoVisaApplication
        noVisaImage={FlightImg}
        content={content}
      />
    </FlightWrapper>
  );
};

export default Flight;
