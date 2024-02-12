import {
  GuestRoomsFormDataInterface,
  StayOrderBookingFinishRoomGuest,
} from "@/lib/types/request-models/stay/booking.type";
import { RoomForGuest } from "@/lib/types/request-models/stay/search.type";
import * as yup from "yup";
import { contactDetailsSchema } from "../flight/booking.schema";

export const guestNamesSchema: yup.ObjectSchema<StayOrderBookingFinishRoomGuest> =
  yup.object().shape({
    first_name: yup.string().when("required", {
      is: true,
      then: (schema) => schema.required("Required for first guest"),
    }),
    last_name: yup.string().when("required", {
      is: true,
      then: (schema) => schema.required("Required for first guest"),
    }),
  });

export const generateValidationSchemaForRoomsAndGuests = (
  rooms: RoomForGuest[]
): yup.ObjectSchema<GuestRoomsFormDataInterface> => {
  let roomDataSchema = yup.object().shape({});
  rooms.forEach((el, index) => {
    roomDataSchema = roomDataSchema.concat(
      yup.object().shape({
        [`${index}`]: yup.object().shape({
          displayOtherGuests: yup.boolean(),
          guests: yup.array().of(guestNamesSchema),
        }),
      })
    );
  });

  return roomDataSchema;
};
