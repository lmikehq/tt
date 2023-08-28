import Flex from "@atom/flex";
import Text from "@atom/text";
import { Divider } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FaPlane } from "react-icons/fa";
import { styled } from "styled-components";

type flightProps = {
  departureCountryCode: string;
  arrivalCountryCode: string;
  airportName1: string;
  airportName2: string;
  departureDate: dayjs.Dayjs;
  arrivalDate: dayjs.Dayjs;
  departureTime: dayjs.Dayjs;
  arrivalTime: dayjs.Dayjs;
  stops: number;
};

const FlightContainer = styled.div`
    box-shadow: 0px 4px 16px 0px #8DD3BB1A;
    border: 1px solid #E7E7E7;
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
    padding: 2rem;
    margin: 2rem;
    border-radius: 12.5px;
`

function FlightBox(props: flightProps) {
    const interval: number = props.arrivalTime.valueOf() - props.departureTime.valueOf();

    function formatDate (day: Dayjs) {
      return day.format('dddd, MMMM D')
    }
 

    

  return (
    <FlightContainer>
        <Flex>
          <Flex direction="column">
            <Flex align="center" gap=".5rem">
              <Text type="p" text="Depart" />
              &middot;
              <Text type="p" text={formatDate(props.departureDate)} />
            </Flex>
            <Flex direction="column" gap="1rem">
              <FaPlane />
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                  <Text type="p" text={props.departureTime.toISOString()} />
                  <Text type="p" text={props.airportName1} />
                  <Text type="p" text={props.departureCountryCode} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={interval.toString()} />
                  <Text type="p" text={`${(props.stops)} stops`} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={props.arrivalTime.toISOString()} />
                  <Text type="p" text={props.airportName2} />
                  <Text type="p" text={props.arrivalCountryCode} />
                </Flex>
              </Flex>
            </Flex>
            <Divider/>
            <Flex align="center" gap=".5rem">
              <Text type="p" text="Return" />
              &middot;
              <Text type="p" text={formatDate(props.arrivalDate)} />
            </Flex>
            <Flex direction="column" gap="1rem">
              <FaPlane />
              <Flex direction="column" gap="1rem">
                <Flex gap="1rem">
                  <Text type="p" text={props.departureTime.toISOString()} />
                  <Text type="p" text={props.airportName1} />
                  <Text type="p" text={props.departureCountryCode} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={interval.toString()} />
                  <Text type="p" text={`${(props.stops)} stops`} />
                </Flex>
                <Flex gap="1rem">
                  <Text type="p" text={props.arrivalTime.toISOString()} />
                  <Text type="p" text={props.airportName2} />
                  <Text type="p" text={props.arrivalCountryCode} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
    </FlightContainer>
  );
}

export default FlightBox;
