import { kiwiClientV1 } from "../../axios/axios-client";
import { FetchLocationsRequestQuery } from "@/lib/types/request-models/flight/location.type";
import { FetchLocationsResponse } from "@/lib/types/response-models/flight/location.type";

export class TopDestinationService {
  static fetchLocations = async ({
    data,
    latitude,
    longitude,
  }: {
    data: FetchLocationsRequestQuery;
    latitude?: string;
    longitude?: string;
  }) => {
    try {
      return data.term === "london_gb" && !latitude && !longitude
        ? await kiwiClientV1.get<any, FetchLocationsResponse>(
          `/locations/topdestinations?term=london_gb&locale=en-US&sort=name&active_only=true&source_popularity=searches`
        )
        : null;
    } catch (error) {
      console.error("Error fetching top destinations:", error);
      throw error;
    }
  };
}
