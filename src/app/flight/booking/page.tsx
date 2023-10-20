"use client";

import FlightBookingProgress from "@/components/molecules/FormProgress/FlightBookingProgress";
import Section from "@/components/molecules/section";
import {
  OverviewHeader,
  SeatHeader,
  TripHeader,
} from "@/components/organisms/flight/booking/headers";
import OverviewSystem from "@/components/organisms/flight/booking/side-menus/OverviewSystem";
import PriceSummary from "@/components/organisms/flight/booking/side-menus/PriceSummary";
import SeatSelectionMenu from "@/components/organisms/flight/booking/side-menus/SeatSelectionMenu";
import ChooseTicketFare from "@/components/organisms/flight/booking/steps/ChooseTicketFare";
import OverviewAndPayment from "@/components/organisms/flight/booking/steps/OverviewAndPayment";
import SeatSelection from "@/components/organisms/flight/booking/steps/SeatSelection";
import TripSummary from "@/components/organisms/flight/booking/steps/TripSummary";
import MultiStepWithSideMenu from "@/components/templates/MultiStepWithSideMenu";
import SectionLayout from "@/components/templates/SectionLayout";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import {
  Combination,
  PassengerBaggageCombinationInterface,
} from "@/lib/types/request-models/flight/booking.type";
import { useEffect, useState } from "react";

const FlightBookingPage = () => {
  const {
    step,
    setStep,
    prevStep,
    highestStep,
    checkFlights,
    checkFlightsResponse,
  } = useFlightBookingStore((state) => state);

  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

  const { adults, children, infants } = searchParams;

  const [passengersBagCombination, setPassengersBagCombination] = useState<
    PassengerBaggageCombinationInterface[]
  >([]);
  const handleUpdatePassengersBagCombination = ({
    index,
    combination,
    category,
  }: {
    index: number;
    combination: Combination;
    category: string;
  }) => {
    const combinations = passengersBagCombination;

    combinations[index] = {
      ...combinations[index],
      [category]: combination,
    };

    setPassengersBagCombination(combinations);
  };
  const checkFlightsThreeSecondsInterval = (sessionId: string) => {
    console.log(sessionId);
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId,
      },
    })
      .then(async (response) => {
        if (
          response.flights_checked == true &&
          response.price_change == false &&
          response.flights_invalid == false
        ) {
          setPassengersBagCombination([
            ...generateCombinationsForCategory({
              size: parseInt(adults),
              category: "adult",
            }),
            ...generateCombinationsForCategory({
              size: parseInt(children),
              category: "child",
            }),
            ...generateCombinationsForCategory({
              size: parseInt(infants),
              category: "infant",
            }),
          ]);
          return checkFlightsFifteenSecondsInterval(sessionId);
        }
        await sleep(3000);
        return checkFlightsThreeSecondsInterval(sessionId);
      })
      .catch(() => {});
  };

  const checkFlightsFifteenSecondsInterval = (sessionId: string) => {
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
        session_id: sessionId,
      },
    })
      .then(async () => {
        await sleep(15000);
        return checkFlightsFifteenSecondsInterval(sessionId);
      })
      .catch(() => {});
  };

  const generateCombinationsForCategory = ({
    size,
    category,
  }: {
    size: number;
    category: string;
  }): PassengerBaggageCombinationInterface[] => {
    return Array.from(
      { length: size },
      (_, index): PassengerBaggageCombinationInterface => {
        const holdBagCombination = getDefaultBagTypeCombinationForCategory({
          category,
          bagType: "hold_bag",
        });
        const handBagCombination = getDefaultBagTypeCombinationForCategory({
          category,
          bagType: "hand_bag",
        });

        return {
          hold_bag: holdBagCombination,
          hand_bag: handBagCombination,
        };
      }
    );
  };
  //getDefaultBagTypeCombinationForCategory Returns the default combination for bag type.
  const getDefaultBagTypeCombinationForCategory = ({
    category,
    bagType,
  }: {
    category: string;
    bagType: "hand_bag" | "hold_bag";
  }): Combination =>
    (() =>
      bagType == "hand_bag"
        ? checkFlightsResponse?.baggage.combinations.hand_bag
        : checkFlightsResponse?.baggage.combinations.hold_bag)()?.find(
      (el) =>
        el.conditions.passenger_groups.includes(category) &&
        el.price.amount == 0
    )!;

  useEffect(() => {
    const searchParams = extractSearchParamsFromUrl({
      url: window.location.href,
    });
    checkFlights({
      query: {
        bnum: 0,
        ...searchParams,
      },
    }).then((response) =>
      checkFlightsThreeSecondsInterval(response.session_id)
    );
  }, []);

  return (
    <Section>
      <SectionLayout>
        <Section styles={{ paddingTop: "34px", paddingBottom: "99px" }}>
          <FlightBookingProgress
            phase={step}
            highestPhase={highestStep}
            setStep={setStep}
          />
        </Section>
        <MultiStepWithSideMenu
          direction={(() => {
            switch (step) {
              case 4:
              case 5:
                return "column-reverse";
              default:
                return "column";
            }
          })()}
          header={(() => {
            switch (step) {
              case 2:
                return <TripHeader />;
              case 4:
                return <SeatHeader />;
              case 5:
                return <OverviewHeader />;
            }
          })()}
          sideMenu={(() => {
            switch (step) {
              case 2:
              case 3:
                return <PriceSummary />;
              case 4:
                return <SeatSelectionMenu />;
              case 5:
                return <OverviewSystem />;
            }
          })()}
        >
          <>
            {(() => {
              switch (step) {
                case 2:
                  return (
                    <TripSummary
                      passengersBagCombination={passengersBagCombination}
                      handleUpdatePassengersBagCombination={
                        handleUpdatePassengersBagCombination
                      }
                    />
                  );
                case 3:
                  return <ChooseTicketFare />;
                case 4:
                  return <SeatSelection />;
                case 5:
                  return <OverviewAndPayment />;
              }
            })()}
          </>
        </MultiStepWithSideMenu>
      </SectionLayout>
    </Section>
  );
};

export default FlightBookingPage;
