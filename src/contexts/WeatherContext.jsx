import { createContext, useContext, useReducer } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1/";

const initialState = {
  cities: [],
  city: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "search":
      return { ...state, cities: action.payload };
    case "getWeather":
      return { ...state, city: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [{ cities, city }, dispatch] = useReducer(reducer, initialState);

  async function getCities(query) {
    try {
      if (query.length < 3) return;
      const response = await fetch(
        `${BASE_URL}search.json?key=${API_KEY}&q=${query}`
      );
      const data = await response.json();
      dispatch({ type: "search", payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function loadWeatherData(location) {
    try {
      if (!location) return;
      const response = await fetch(
        `${BASE_URL}forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=yes`
      );
      const data = await response.json();
      dispatch({ type: "getWeather", payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <WeatherContext.Provider
      value={{
        cities,
        city,
        getCities,
        loadWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);

  if (context === undefined)
    throw new Error("An attempt to use WeatherContext outside WeatherProvider");

  return context;
}

export { WeatherProvider, useWeather };
