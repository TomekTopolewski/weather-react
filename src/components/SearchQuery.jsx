import styles from "./SearchQuery.module.css";

import { useState } from "react";
import { useWeather } from "../contexts/WeatherContext";

function SearchQuery() {
  const { getCities } = useWeather();
  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
    getCities(event.target.value);
  }

  return (
    <div className={styles.query}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(event) => handleChange(event)}
      ></input>
    </div>
  );
}

export default SearchQuery;
