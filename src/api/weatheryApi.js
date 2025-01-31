import axios from 'axios';

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_WEATHERY_API_URL,
});

export const getWeather = async (city) => {
  const { data } = await weatherApi.get(`/foreacsts/${city}`);
  return data;
};

export const getCitiesData  = async () => {
    const { data } = await weatherApi.get(`/cities`)
    console.log(data)
    return data;
}

export const postCitiesData = async (city) => {
    const response = await weatherApi.post(`/cities`, city)
    console.log('response post city', response)
    return response
}