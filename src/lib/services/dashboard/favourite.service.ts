import { constructQueryFromParams } from "@/lib/extensions/helpers/constructQuery";
import { staysService } from "@/lib/extensions/hook/apiService";
import { DashboardFilters } from "@/lib/types/request-models/dashboard";

export class FavouriteService {
  static fetchFavourites = async (params: DashboardFilters) => {
    const query = constructQueryFromParams(params);
    // /stays-likes/user${query}
    return await staysService(`/stays-likes/user`).then((response) => {

      return response;
    }).catch((error) => {
      throw (error);
    });
  };
}