import Flex from "@components/templates/flex";
import Text from "@atom/text";
import dayjs from "dayjs";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BsInfoCircle, BsSortUp } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { styled } from "styled-components";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { ttColors } from "@/lib/theme/colors";
import { FlightInfo } from "@/lib/types/response-models/flight/booking.type";
import SkeletonLoader from "@/components/organisms/SkeletonLoader/Skeleton";

export const FlightContainer = styled.div`
  box-shadow: 0px 4px 16px 0px #8dd3bb1a;
  border: 1px solid #8dd3bb1a;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  padding: 1rem;
  border-radius: 12.5px;
  width: 100%;

  @media only screen and (max-width: 992px) {
    background: none;
    border: none;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
`;

export const ButtonBox = styled.div<{ active: boolean }>`
  background: ${({ active }) => (active ? "#06062A" : "transparent")};
  color: ${({ active }) => (active ? "white" : "#606060")};
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  width: 35%;
  display: flex;
  justify-content: center;

  h1 {
    color: ${({ active }) => (active ? "white" : ttColors.primary)};
  }

  &:hover {
    background: ${({ active }) => (active ? "" : "#F3F3FF")};
  }

  @media only screen and (max-width: 992px) {
    svg {
      display: ${({ active }) => (active ? "inline-flex" : "none")};
    }
  }
`;

type sortProps = {
  cheapPrice: number | 0;
  fastPrice: number | 0;
  bestPrice: number | 0;
  sortType: string;
  data: FlightInfo[];
  setSortType: Dispatch<SetStateAction<string>>;
  updateSearchQueryHandler: (updatedParams: Record<string, any>) => void;
};

const initialDurations = {
  cheapest_depature: "",
  cheapest_arrival: "",
  best_depature: "",
  best_arrival: "",
  fastest_depature: "",
  fastest_arrival: "",
};

const prices = {
  best_price: "",
  cheapest_price: "",
  fastest_price: "",
};

function SortOption({ label, price, flightTime }: { label: string; price: number; flightTime: string; }) {
    const { isMobile } = useScreenResolution()

    return (
        <Flex
              direction="column"
              gap=".5rem"
              align="center"
              justify={isMobile ? "center" : "flex-start"}
              padding=".5rem 1.25rem"
            >
            <Flex
                gap="1rem"
                align="center"
                justify={isMobile ? "center" : "flex-start"}
            >
                <Text type="p" text={label} />
                <BsInfoCircle size={20} />
            </Flex>
            <Flex
                direction={isMobile ? "column" : "row"}
                gap=".5rem"
                align="center"
            >
                <Text
                    type={isMobile ? "h1" : "p"}
                    text={`$${Number(price?.toFixed(0)).toLocaleString()}`}
                    weight={600}
                />
                {!isMobile && <GoDotFill size={15} />}
                <Text type="p" text={flightTime} whiteSpace="nowrap" />
            </Flex>
        </Flex>
    )
}

function SortedFlightsTab(props: sortProps) {
  const { isMobile } = useScreenResolution();
  const [durations, setDurations] = useState(initialDurations);
  const [bestFlights, setBestFlights] = useState<FlightInfo[]>([]);
  const [shortestDuration, setShortestDuration] = useState<number>(0);
  const [price, setPrice] = useState(prices);
  const {
    cheapest_depature,
    cheapest_arrival,
    best_depature,
    best_arrival,
    fastest_depature,
    fastest_arrival,
  } = durations;

  // get the total flight duration for the sortedFlights tab
  const getDuration = useCallback(() => {
    if (props.data) {
      const cheapest = props.data.find(
        (itm: FlightInfo) => itm.price === props.cheapPrice
      );
      const best = props.data.find(
        (itm: FlightInfo) => itm.price === props.bestPrice
      );
      const fastest = props.data.find(
        (itm: FlightInfo) => itm.price === props.fastPrice
      );

      setDurations({
        ...durations,
        cheapest_depature: cheapest?.utc_departure ?? '',
        cheapest_arrival: cheapest?.utc_arrival ?? '',
        best_depature: best?.utc_departure ?? '',
        best_arrival: best?.utc_arrival ?? '',
        fastest_depature: fastest?.utc_departure ?? '',
        fastest_arrival: fastest?.utc_arrival ?? '',
      });
    }
  }, [props.data, props.cheapPrice]);

//   const getPrices = useCallback(() => {
//     if (props.data) {
//       const best_price = props.data.findIndex(0);
//     }
//   }, []);


  // calculate the flight duration by using it's utc_departure and utc_arrival values
  const calculateDuration = (depature: string, arrival: string) => {
    const utcDeparture = depature;
    const utcArrival = arrival;
    const departureTime = dayjs(utcDeparture);
    const arrivalTime = dayjs(utcArrival);

    //calculate the diff in minutes
    const duration = arrivalTime.diff(departureTime, "minute");
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const formattedDuration = `${hours}hr ${minutes}mins`;

    return formattedDuration;
  };

  //take in the utcs and convert to mins
  function filteredBest(utcDeparture: string, utcArrival: string) {
    const departureTime = dayjs(utcDeparture);
    const arrivalTime = dayjs(utcArrival);
    return arrivalTime.diff(departureTime, "minutes");
  }

  //format the shortestDuration in hrs mins
  const formatBestFlightTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}hr ${remainingMinutes}mins`;
  };

    useEffect(() => {
        getDuration();
    }, [getDuration]);
    
  useEffect(() => {
    const cheapFlights = props.data?.filter(
      (flight) => flight.price === props.cheapPrice
    );
    setBestFlights(cheapFlights);

    const durations =
      bestFlights.map((flight) =>
        filteredBest(flight.utc_departure, flight.utc_arrival)
      );

    const shortestDuration = Math.min(...durations);
    setShortestDuration(shortestDuration);
  }, [props.data, props.cheapPrice, bestFlights]);

    
    return (props.data.length > 0 ? (
        <FlightContainer>
            <Flex justify={isMobile ? "center" : "flex-start"}>
                <ButtonBox
                    active={props.sortType === "best"}
                    onClick={() => {
                        props.setSortType("best")
                        props.updateSearchQueryHandler({ sort: "" });
                    }}
                >
                    <SortOption
                        label="Best"
                        price={props.bestPrice}
                        flightTime={calculateDuration(best_depature, best_arrival)}
                    />
                </ButtonBox>
                        
                <ButtonBox
                    active={props.sortType === "cheapest"}
                    onClick={() => {
                        props.setSortType("cheapest") 
                        props.updateSearchQueryHandler({ sort: "price" });
                    }}
                >
                    <SortOption
                        label="Cheapest"
                        price={props.cheapPrice}
                        flightTime={calculateDuration(cheapest_depature, cheapest_arrival)}
                    />
                </ButtonBox>

                <ButtonBox
                    active={props.sortType === "fastest"}
                    onClick={() => {
                    props.setSortType("fastest");
                    props.updateSearchQueryHandler({ sort: "duration" });
                }}>
                    
                    <SortOption
                        label="Fastest"
                        price={props.fastPrice}
                        flightTime={calculateDuration(fastest_depature, fastest_arrival)}
                    />
                </ButtonBox>

                {!isMobile &&
                    <Flex direction="column" justify="center" align="center" gap=".2rem" padding="0 0rem 0 0">
                        <BsSortUp size={30} color="#606060" />
                        <Text type="p" text="Other Sort" color="#606060" whiteSpace="nowrap" />
                    </Flex>
                }
            </Flex>
                

        </FlightContainer>
        ) : (
            <SkeletonLoader text={false} rectangularHeight={10} tabs={1} />
        )
  );
}

export default SortedFlightsTab;
