import { staysService } from "@/lib/extensions/hook/apiService";

export class FavouriteService {
  static fetchFavourites = async () => {
    return await staysService(`/stays-likes/user`).then((response) => {
      return response;
    }).catch((error) => {
      throw (error);
    });
  };
}