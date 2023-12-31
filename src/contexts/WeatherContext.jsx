import { createContext, useContext, useEffect, useReducer } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/";

function readLocalStorage() {
  if (!localStorage.getItem("favourities")) return [];
  const fromStorage = localStorage.getItem("favourities");
  return JSON.parse(fromStorage);
}

const initialState = {
  city: {},
  favourities: readLocalStorage(),
  forecDay: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setCity":
      return {
        ...state,
        city: action.payload,
        forecDay: 0,
      };
    case "addToFavourite":
      return { ...state, favourities: [...state.favourities, action.payload] };
    case "setForecastDay":
      return { ...state, forecDay: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [{ city, favourities, forecDay }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function addToFavourite(city) {
    let duplicate = false;
    favourities.map((c) => {
      if (`${c.lat},${c.lon}` === `${city.lat},${city.lon}`) duplicate = true;
    });
    if (!duplicate) {
      dispatch({ type: "addToFavourite", payload: city });
      localStorage.setItem("favourities", JSON.stringify([...favourities, city]));
    }
  }

  async function getData(location) {
    if (!location) return;
    try {
      const response = await fetch(
        `${BASE_URL}forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=yes`
      );
      const data = await response.json();
      dispatch({ type: "setCity", payload: data });
      document.title = `Weather in ${data.location.name}`;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function getPosition() {
    if (!navigator.geolocation)
      throw new Error("Your browser does not support geolocation");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getData(`${position.coords.latitude},${position.coords.longitude}`);
      },
      (error) => {
        throw new Error(error.message);
      }
    );
  }

  useEffect(function () {
    getData(`52.25,21`);
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        favourities,
        forecDay,
        addToFavourite,
        getData,
        getPosition,
        dispatch,
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
