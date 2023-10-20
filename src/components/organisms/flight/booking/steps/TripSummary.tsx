import Button from "@/components/atoms/button";
import ContactDetails from "@/components/organisms/flights/ContactDetails";
import PassengerDetails from "@/components/organisms/flights/PassengerDetails";
import TripSummaryCard from "@/components/organisms/flights/TripSummaryCard";
import { extractSearchParamsFromUrl } from "@/lib/extensions/helpers/constructQuery";
import sleep from "@/lib/extensions/helpers/sleep";
import { manyPassengersAndBaggageDetailsSchema } from "@/lib/extensions/schemas/flight/booking.schema";
import { useFlightBookingStore } from "@/lib/store/flight/booking.store";
import { ttColors } from "@/lib/theme/colors";
import {
  Combination,
  Passenger,
  PassengerBaggageCombinationInterface,
  passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import { Combinations } from "@/lib/types/response-models/flight/check_flight.type";
import { Box } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";

const TripSummary = () => {
  const { checkFlights, saveBooking, checkFlightsResponse } =
    useFlightBookingStore((state) => state);
  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

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
  const { adults, children, infants } = searchParams;
  const params = new URLSearchParams(window.location.search);

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

  const getPassengerBagCombinationOptions = ({
    category,
  }: {
    category: string;
  }): Combinations => {
    const hand_bag = checkFlightsResponse?.baggage.combinations.hand_bag;
    const hold_bag = checkFlightsResponse?.baggage.combinations.hold_bag;
    return {
      hand_bag:
        hand_bag?.filter((el) =>
          el.conditions.passenger_groups.includes(category)
        ) ?? [],
      hold_bag:
        hold_bag?.filter((el) =>
          el.conditions.passenger_groups.includes(category)
        ) ?? [],
    };
  };
  const generateFormsForCategory = ({
    size,
    category,
  }: {
    size: number;
    category: string;
  }): Passenger[] => {
    return Array.from({ length: size }, (_, index): Passenger => {
      return {
        ...passengerAndBaggageDetails,
        category,
      };
    });
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
  const formik = useFormik({
    initialValues: {
      passengers: [
        ...generateFormsForCategory({
          size: parseInt(adults),
          category: "adult",
        }),
        ...generateFormsForCategory({
          size: parseInt(children),
          category: "child",
        }),
        ...generateFormsForCategory({
          size: parseInt(infants),
          category: "infant",
        }),
      ],
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: manyPassengersAndBaggageDetailsSchema,
    onSubmit: (values) => {
      console.log(passengersBagCombination, "passengers");
      saveBooking({
        passengers: values.passengers,
        combinations: passengersBagCombination,
        sessionId: checkFlightsResponse?.session_id ?? "",
        bookingToken: checkFlightsResponse?.booking_token ?? "",
      });
    },
    validateOnChange: false,
  });

  useEffect(() => {
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
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <TripSummaryCard />
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          {/* <ContactDetails formik={formik} /> */}
          <FieldArray
            name="passengers"
            render={(arrayHelpers) => (
              <div>
                {formik.values.passengers.map((passenger, index) => (
                  <div key={index}>
                    <PassengerDetails
                      formik={formik}
                      values={passenger}
                      count={index}
                      combinationOptions={getPassengerBagCombinationOptions({
                        category: passenger.category,
                      })}
                      passengerBagCombination={passengersBagCombination[index]}
                      handleUpdatePassengersBagCombination={
                        handleUpdatePassengersBagCombination
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          />
          <Box sx={{ marginY: "3rem" }}>
            <Button
              type="submit"
              background={ttColors.dark}
              width="100%"
              onClick={() => {
                console.log(formik);
              }}
            >
              Continue
            </Button>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default TripSummary;
