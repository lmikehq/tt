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
  PassengerAndBaggageCombinationInterface,
  passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import { Box } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect } from "react";

const TripSummary = () => {
  const { checkFlights, saveBookingForm, checkFlightsResponse } =
    useFlightBookingStore((state) => state);
  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

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
        )
          return checkFlightsFifteenSecondsInterval(sessionId);
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

  const generateFormsForCategory = ({
    size,
    category,
  }: {
    size: number;
    category: string;
  }): PassengerAndBaggageCombinationInterface[] => {
    return Array.from(
      { length: size },
      (_, index): PassengerAndBaggageCombinationInterface => ({
        ...passengerAndBaggageDetails,
        category,
        combinations: [
          getDefaultBagTypeCombinationForCategory({
            category,
            bagType: "hold_bag",
          }),
          getDefaultBagTypeCombinationForCategory({
            category,
            bagType: "hand_bag",
          }),
        ],
      })
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
    onSubmit: (values) => {},
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
                    />
                  </div>
                ))}
              </div>
            )}
          />
          <Box sx={{ marginY: "3rem" }}>
            <Button background={ttColors.dark} width="100%">
              Continue
            </Button>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};

export default TripSummary;
