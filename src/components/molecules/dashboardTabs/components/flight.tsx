import styled from "styled-components";
import NoVisaApplication from "./noApplication";
import VisaDashboardHeader from "./visaDashboardHeader";
// import NoVisaBg from "@image/background.png"
// import FlightImg from "@image/flight.png"
import Text from "@atom/text";
import Image from "@atom/image";
import FlightIcon from "public/assets/icons/dashboard/plane-track.svg";
import { ttColors } from "@lib/theme/colors";
import Flex from "@/components/templates/flex";
import Center from "@/components/templates/center";
import { useScreenResolution } from "@/lib/extensions/hook/useScreenResolution";
import { Divider } from "@mui/material";
import { Grid } from "@/components/templates/grid";
// import { useState } from "react";
// import SimplePopper from "@/components/organisms/SimplePopper/SimplePopper";
import { useDashboardFlight } from "@/lib/hooks/dashboard/flight.hook";
import { useDashboardStore } from "@/lib/store/dashboard/index.store";
import { DashboardFlightBookingProps } from "@/lib/types/response-models/dashboard";
import Spinner from "../../icons/spinner";
import { mockFlightBooking } from "@/lib/extensions/data/mock";
import { MobileReturnFlightComp, ReturnFlightComp } from "./flight/returnFlight";
import PaginationCtrl from "../../pagination";
import { MobileSingleFlightComp, SingleFlightComp } from "./flight/singleFlight";

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
export const FlightHistory = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    // height: 311px;
    border: 1px solid #e7e7e7;
    border-radius: 14px;
`;

const NotificationWrapper = styled.div`
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

export const TextContainer = styled.div`
    background: #f3f3ff;
    padding: 10px;
    border-radius: 20px;
    width: 88px;
    text-align: center;
    justify-content: center;
`;

const Flight = () => {
  const { param, search, page, limit, setPage } = useDashboardStore((state) => state);
  const { isMobile } = useScreenResolution();
  const content = {
    title: "You’ve booked no Flight Ticket yet - Let’s help you get Started",
    links: [
      { text: "Search Flights", url: "/flight" },
      { text: "Search Stays", url: "/stays" },
    ],
  };

  // function NoFlightImg() {
  //   return <Image src="/assets/images/flight.png" alt="" />;
  // }

  function renderFlight(isMobile: boolean, type: 'ONE WAY' | 'RETURN' | 'MULTI CITY', flight: DashboardFlightBookingProps) {

    switch (type) {
      case 'ONE WAY':
        return (
          <>
            {isMobile ? (
              <MobileSingleFlightComp flight={flight} />
            ) : (
              <SingleFlightComp flight={flight} />
            )}
          </>
        );
      case 'RETURN':
        return (
          <>
            {isMobile ? (
              <MobileReturnFlightComp />
            ) : (
              <ReturnFlightComp />
            )}
          </>
        );
      case 'MULTI CITY':
        return (
          <>
            {isMobile ? ('') : ('')}
          </>
        );
    }
  }

  const { data, isLoading } = useDashboardFlight({
    query: { status: param, limit, currentPage: page, search },
    options: { retry: 2 }
  });

  const flights: DashboardFlightBookingProps[] = data as DashboardFlightBookingProps[];

  return (
    <FlightWrapper>
      <VisaDashboardHeader headerText="All Flight Booking" type="radio" />

      {isLoading ? (
        <Flex height="450px" align="center" justify="center">
          <Spinner size="60px" fill={ttColors.blackishBlue} />
        </Flex>
      ) : (
        <>
          {
            mockFlightBooking.length > 0 ? (
              <Flex direction="column" gap="1rem">
                {mockFlightBooking.map((flight: DashboardFlightBookingProps) => {
                  return (
                    <>
                      {renderFlight(isMobile, flight.flightType, flight)}
                    </>
                  );
                })}
                <PaginationCtrl<DashboardFlightBookingProps>
                  page={page}
                  setPage={setPage}
                  data={mockFlightBooking}
                />
              </Flex>
            ) : (
              <Center>
                <NoVisaApplication
                  noVisaImage={"/assets/images/flight.png"}
                  content={content}
                />
              </Center>
            )
          }
        </>
      )}

    </FlightWrapper>
  );
};

export default Flight;
