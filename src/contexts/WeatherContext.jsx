import { createContext, useContext, useEffect, useReducer } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1/";

function readLocalStorage() {
  if (!localStorage.getItem("favourities")) return [];
  const fromStorage = localStorage.getItem("favourities");
  return JSON.parse(fromStorage);
}

const initialState = {
  query: "",
  cities: [],
  city: {},
  favourities: readLocalStorage(),
  uvIndex: [
    { name: "low", color: "green" },
    { name: "low", color: "green" },
    { name: "moderate", color: "yellow" },
    { name: "moderate", color: "yellow" },
    { name: "moderate", color: "yellow" },
    { name: "high", color: "orange" },
    { name: "high", color: "orange" },
    { name: "very high", color: "red" },
    { name: "very high", color: "red" },
    { name: "very high", color: "red" },
    { name: "extreme", color: "purple" },
  ],
  showSearchList: false,
  forecDay: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuery":
      return {
        ...state,
        query: action.payload.query,
        showSearchList: action.payload.flag,
      };
    case "setCities":
      return { ...state, cities: action.payload };
    case "setCity":
      return {
        ...state,
        city: action.payload,
        query: "",
        cities: [],
        showSearchList: false,
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
  const [
    { query, cities, city, uvIndex, favourities, showSearchList, forecDay },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  async function search(query) {
    dispatch({ type: "setQuery", payload: { query, flag: true } });

    if (query.length < 3) return;

    const controller = new AbortController();
    try {
      const response = await fetch(
        `${BASE_URL}search.json?key=${API_KEY}&q=${query}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      dispatch({ type: "setCities", payload: data });
    } catch (error) {
      if (error.name !== "AbortError") throw new Error(error.message);
    }
    return () => {
      controller.abort();
    };
  }

  async function getData(location) {
    if (!location) return;

    const controller = new AbortController();
    try {
      const response = await fetch(
        `${BASE_URL}forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=yes`,
        { signal: controller.signal }
      );
      const data = await response.json();
      dispatch({ type: "setCity", payload: data });
      document.title = `Weather in ${data.location.name}`;
    } catch (error) {
      if (error.name !== "AbortError") throw new Error(error.message);
    }
    return () => {
      controller.abort();
    };
  }

  useEffect(function () {
    getData(`52.25,21`);
  }, []);

  useEffect(() => {
    function callback(event) {
      if (event.code === "Escape") {
        dispatch({ type: "setQuery", payload: { query: "", flag: false } });
      }
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  });

  return (
    <WeatherContext.Provider
      value={{
        query,
        cities,
        city,
        uvIndex,
        favourities,
        showSearchList,
        forecDay,
        addToFavourite,
        search,
        getData,
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
