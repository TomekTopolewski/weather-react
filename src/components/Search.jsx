import { useWeather } from "../contexts/WeatherContext";
import styles from "./Search.module.css";
import toolbox from "./Toolbox.module.css";
import { IoSearchOutline, IoLocateOutline } from "react-icons/io5";

function Search() {
  const { query, cities, showSearchList, search, getData, getPosition } =
    useWeather();

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
      <div className={styles.wrapper}>
        <div className={toolbox.flex}>
          <IoSearchOutline className={toolbox.medium} />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => search(event.target.value)}
          />
        </div>
        <IoLocateOutline className={styles.gpsIcon} onClick={getPosition} />
      </div>

      {showSearchList && list()}
    </div>
  );
}

export default Search;
