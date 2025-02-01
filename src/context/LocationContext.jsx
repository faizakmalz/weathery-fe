import { createContext, useContext, useEffect } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useReverseGeocode } from "../hooks/useReverseGeoLocation";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const {
    location,
    error: geoError,
    loading: geoLoading,
    refreshLocation,
  } = useGeolocation();
  const {
    data: geoData,
    error: geoCodeError,
    isLoading: geoCodeLoading,
  } = useReverseGeocode(location);

  console.log("city", geoData?.city);
  console.log("country", geoData?.country);

  useEffect(() => {
    if (geoData?.city) {
      console.log("current city", geoData.city);
      console.log("current country", geoData.country);
    }
  }, [geoData?.city]);

  const city = geoData?.city;
  const country = geoData?.country;

  const value = {
    location,
    city,
    country,
    geoError,
    geoLoading,
    geoCodeError,
    geoCodeLoading,
    geoData,
    refreshLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  return useContext(LocationContext);
};
