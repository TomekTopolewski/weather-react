import { useWeather } from "../contexts/WeatherContext";
import styles from "./Search.module.css";
import toolbox from "./Toolbox.module.css";

function Search() {
  const { query, cities, showSearchList, search, getData } = useWeather();

  function list() {
    if (cities.length === 0) {
      return (
        <div className={styles.searchList}>
          <p className={toolbox.italic}>Type more...</p>
        </div>
      );
    }

    return (
      <ul className={styles.searchList}>
        {cities.map((city) => (
          <li key={city.id} onClick={() => getData(`${city.lat},${city.lon}`)}>
            <p>{city.name}</p>
            <p className={toolbox.italic}>{city.country}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(event) => search(event.target.value)}
      />

      {showSearchList && list()}
    </div>
  );
}

export default Search;
