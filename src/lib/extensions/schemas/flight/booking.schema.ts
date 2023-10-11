import {
  Baggage,
  Combination,
  CombinationConditions,
  CombinationPrice,
  Passenger,
  PassengerAndBaggageCombinationInterface,
  SaveBookingRequestInput,
} from "@/lib/types/request-models/flight/booking.type";
import * as yup from "yup";

const passengerSchema: yup.ObjectSchema<Passenger> = yup.object().shape({
  name: yup.string().required("Required"),
  surname: yup.string().required("Required"),
  phone: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  cardno: yup.string().required("Required"),
  birthday: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .required("Required"),
  nationality: yup
    .string()
    .matches(/^[A-Z]{2}$/, "Invalid nationality format (ISO 3166-1 alpha-2)")
    .required("Required"),
  title: yup.string().required("Required"),
  expiration: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .required("Required"),
  category: yup.string().required("Required"),
});

const combinationPriceSchema: yup.ObjectSchema<CombinationPrice> = yup
  .object()
  .shape({
    currency: yup.string().required("Required"),
    amount: yup.number().required("Required"),
    base: yup.number().required("Required"),
    service: yup.number().required("Required"),
    service_flat: yup.number().required("Required"),
    merchant: yup.number().required("Required"),
  });

const combinationConditionsSchema: yup.ObjectSchema<CombinationConditions> = yup
  .object()
  .shape({
    passenger_groups: yup.array().of(yup.string().required()).defined(),
  });

const combinationSchema: yup.ObjectSchema<Combination> = yup.object().shape({
  indices: yup.array().of(yup.number().required()).defined().min(1, "Required"),
  category: yup.string().required("Required"),
  conditions: combinationConditionsSchema.required("Required"),
  price: combinationPriceSchema.required("Required"),
});

const baggageSchema: yup.ObjectSchema<Baggage> = yup.object().shape({
  combination: combinationSchema.required("Required"),
  passengers: yup.array().of(yup.number().required()).defined(),
});

const passengerAndBaggageDetailsSchema: yup.ObjectSchema<PassengerAndBaggageCombinationInterface> =
  yup.object().shape({
    name: yup.string().required("Required"),
    surname: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    cardno: yup.string().required("Required"),
    birthday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .required("Required"),
    nationality: yup
      .string()
      .matches(/^[A-Z]{2}$/, "Invalid nationality format (ISO 3166-1 alpha-2)")
      .required("Required"),
    title: yup.string().required("Required"),
    expiration: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .required("Required"),
    category: yup.string().required("Required"),
    combinations: yup.array().of(combinationSchema).defined(),
  });

export const passengersAndBaggageDetailsArraySchema = yup
  .array()
  .of(passengerAndBaggageDetailsSchema);

export const manyPassengersAndBaggageDetailsSchema = yup
  .object()
  .shape({ passengers: passengerAndBaggageDetailsSchema });
