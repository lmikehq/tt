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
  PassengerBaggageCombinationInterface,
  PassengerFormInterface,
  SaveBookingRequestInput,
  arrangeBaggageDataForOrdering,
  passengerAndBaggageDetails,
} from "@/lib/types/request-models/flight/booking.type";
import { Combinations } from "@/lib/types/response-models/flight/check_flight.type";
import { Box } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";

interface TripSummaryProps {
  passengersBagCombination: PassengerBaggageCombinationInterface[];
  handleUpdatePassengersBagCombination(params: {
    index: number;
    combination: Combination;
    category: string;
  }): void;
}
const TripSummary = ({
  passengersBagCombination,
  handleUpdatePassengersBagCombination,
}: TripSummaryProps) => {
  const {
    saveBooking,
    checkFlightsResponse,
    saveBookingDetails,
    setSaveBookingDetails,
    setStep,
  } = useFlightBookingStore((state) => state);
  const searchParams = extractSearchParamsFromUrl({
    url: window.location.href,
  });

  const { adults, children, infants } = searchParams;

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
  }): PassengerFormInterface[] => {
    return Array.from({ length: size }, (_, index): PassengerFormInterface => {
      return {
        ...passengerAndBaggageDetails,
        category,
      };
    });
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

      setSaveBookingDetails({
        data: {
          ...saveBookingDetails,
          passengers: values.passengers.map((el) => ({
            ...el,
            nationality: el.nationality.code.toLowerCase(),
          })),
          baggage: arrangeBaggageDataForOrdering(passengersBagCombination),
        },
      });
      setStep({ step: 4 });
    },
    validateOnChange: false,
  });

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
