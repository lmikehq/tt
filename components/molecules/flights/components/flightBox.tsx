import Flex from "@atom/flex";
import Text from "@atom/text";
import { Divider } from "@mui/material";
import dayjs from "dayjs";
import { FaPlane } from "react-icons/fa";

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

function FlightBox(props: flightProps) {
    const interval: number = props.arrivalTime.valueOf() - props.departureTime.valueOf();

  return (
    <Flex>
      <Flex direction="column">
        <Flex align="center" gap=".5rem">
          <Text type="p" text="Depart" />
          &middot;
          <Text type="p" text={props.departureDate.toISOString()} />
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
          <Text type="p" text="Depart" />
          &middot;
          <Text type="p" text={props.departureDate.toISOString()} />
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
  );
}

export default FlightBox;
