import { createContext, useContext, useEffect, useReducer } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/";

const initialState = {
  query: "",
  cities: [],
  showSearchList: false,
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
    case "clear":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [{ query, cities, showSearchList }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function search(query) {
    dispatch({ type: "setQuery", payload: { query, flag: true } });
    if (query.length < 3) return;
    try {
      const response = await fetch(
        `${BASE_URL}search.json?key=${API_KEY}&q=${query}`
      );
      const data = await response.json();
      dispatch({ type: "setCities", payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function clear() {
    dispatch({ type: "clear", payload: { query: "", cities: [] } });
  }

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
    <SearchContext.Provider
      value={{ query, cities, showSearchList, search, clear }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error("An attempt to use WeatherContext outside WeatherProvider");
  return context;
}

export { SearchProvider, useSearch };
