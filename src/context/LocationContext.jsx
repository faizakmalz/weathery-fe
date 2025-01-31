import { createContext, useContext, useEffect } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { useReverseGeocode } from "../hooks/useReverseGeoLocation";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const { location, error: geoError, loading: geoLoading, refreshLocation } = useGeolocation();
    const { data: city, error: geoCodeError, isLoading: geoCodeLoading } = useReverseGeocode(location);

    console.log('loc', location)

    useEffect(() => {
        if (city) {
            console.log("current city", city)
        }
    }, [city])

    const value = {
        location,
        geoError,
        geoLoading,
        geoCodeError,
        geoCodeLoading,
        city,
        refreshLocation
    }

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocationContext = () =>{
    return useContext(LocationContext)
}