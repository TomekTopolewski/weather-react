import { useWeather } from "../../contexts/WeatherContext";
import styles from "./List.module.css";
import toolbox from "../Toolbox.module.css";
import { useSearch } from "../../contexts/SearchContext";

function List() {
  const { getData } = useWeather();
  const { cities, showSearchList, clear } = useSearch();

  function handleClick(city) {
    getData(`${city.lat},${city.lon}`);
    clear();
  }

  if (!showSearchList) return;

  if (cities.length === 0) {
    return (
      <div className={styles.list}>
        <p className={toolbox.italic}>Type more...</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {cities.map((city) => (
        <li key={city.id} onClick={() => handleClick(city)}>
          <p>{city.name}</p>
          <p className={toolbox.italic}>{city.country}</p>
        </li>
      ))}
    </ul>
  );
}

export default List;
