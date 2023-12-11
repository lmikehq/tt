import {
    CardInfo,
    CheckFlightsQuery,
    CheckFlightsRequestInput,
    CheckSeatingRequestInput,
    ConfirmPaymentZoozRequestInput,
    SaveBookingRequestInput,
    SearchFlightsRequestQuery,
    TokenizeDataRequestInput,
} from "../../types/request-models/flight/booking.type";
import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import {
    axiosClient,
    kiwiClient,
    kiwiClientV1,
    kiwiResourceClient,
} from "../../axios/axios-client";
import { constructQueryFromParams } from "../../extensions/helpers/constructQuery";
import { SearchFlightsResponse } from "../../types/response-models/flight/booking.type";
import { CheckFlightResponse } from "../../types/response-models/flight/check_flight.type";
import { CheckSeatingResponse } from "../../types/response-models/flight/check_seating.type";
import { FetchLocationsRequestQuery } from "@/lib/types/request-models/flight/location.type";
import { FetchLocationsResponse } from "@/lib/types/response-models/flight/location.type";

export class FlightLocationService {
    static fetchLocations = async ({
        data,
        latitude,
        longitude,
    }: {
        data: FetchLocationsRequestQuery;
        latitude?: string;
        longitude?: string;
    }) => {
        const query = constructQueryFromParams(data);
        return await kiwiClientV1
            .get<any, FetchLocationsResponse>(
                !data.term
                    ? `/locations/radius?lon=${longitude}&lat=${latitude}&location_types=airport`
                    : `/locations/query${query}&limit=10&location_types=airport&location_types=city&location_types=country&location_types=region`
            )
            .then((response) => response)
            .catch((error) => {
                throw error;
            });
    };
}
