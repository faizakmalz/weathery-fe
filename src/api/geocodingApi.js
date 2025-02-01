import axios from "axios";

const nominatimApi = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: {
    "User-Agent": "WeatherApp/1.0",
  },
});

export const getGeoDataFromCoords = async (latitude, longitude) => {
  const { data } = await nominatimApi.get("/reverse", {
    params: {
      lat: latitude,
      lon: longitude,
      format: "json",
    },
  });

  const city =
    data.address.city ||
    data.address.town ||
    data.address.village ||
    data.address.suburb ||
    data.address.county;

  const country = data.address.country;

  const geoData = { country, city };
  return geoData;
};
