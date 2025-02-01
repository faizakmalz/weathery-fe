import axios from "axios";

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_WEATHERY_API_URL,
});

// export const getWeather = async (city) => {
//   const { data } = await weatherApi.get(`/foreacsts/${city}`);
//   return data;
// };

export const getCitiesData = async () => {
  const { data } = await weatherApi.get(`/cities`);
  console.log(data);
  return data;
};

export const deleteCity = async (city) => {
  const response = await weatherApi.delete(`cities/${city}`);
  console.log("delete success", response);
  return response;
};

export const updateCity = async (city) => {
  const response = await weatherApi.put(`cities/${city.id}`, city);
  console.log("update successful", city, response);
  return response;
};

export const postCitiesData = async (city) => {
  const response = await weatherApi.post(`/cities`, city);
  console.log("response post city", response);
  return response;
};

export const getForecastbyCity = async (city) => {
  const response = await weatherApi.get(`/forecasts/weather/${city}`);
  console.log("forecast fetched", response);
  return response;
};

export const get5DaysForecast = async (city) => {
  const response = await weatherApi.get(`/forecasts/5days-forecast/${city}`);
  console.log("5 days forecast fetched", response);
  return response;
};
