import { httpService } from "./HttpService";

const BASE_URL = "places/";

const getPlaces = async () => {
  const places = await httpService.get(BASE_URL);
  return places;
};

export const PlaceService = {
  getPlaces,
};
