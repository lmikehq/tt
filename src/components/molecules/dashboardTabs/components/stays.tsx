import styled from "styled-components";
import Section from "../../section";
import { ttColors } from "@/lib/theme/colors";
import VisaDashboardHeader from "./visaDashboardHeader";
import { Grid } from "@/components/templates/grid";
import StaysCard from "./stays/card";

const StaysWrapper = styled.div`
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

const StaysHistory = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    // height: 311px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
`;

const TextContainer = styled.div`
    background: #f3f3ff;
    padding: 10px;
    border-radius: 20px;
    width: 88px;
    text-align: center;
    justify-content: center;
`;

function Stays() {
  return (
    <StaysWrapper>
      <VisaDashboardHeader headerText="All Stays Booking" type="radio" />
      <StaysCard />
    </StaysWrapper>
  );
}

export default Stays;