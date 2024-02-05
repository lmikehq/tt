import apiService from "@/lib/extensions/hook/apiService";

export class FavouriteService {
  static fetchFavourites = async () => {
    return await apiService(`/user`).then((response) => {
      console.log('response from the favourites api', response);
      return response.data;
    }).catch((error) => {
      throw (error);
    });
  };
}