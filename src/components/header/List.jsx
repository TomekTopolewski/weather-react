import { useWeather } from "../../contexts/WeatherContext";
import styles from "./List.module.css";
import toolbox from "../Toolbox.module.css";

function List() {
  const { cities, showSearchList, getData } = useWeather();

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
        <li key={city.id} onClick={() => getData(`${city.lat},${city.lon}`)}>
          <p>{city.name}</p>
          <p className={toolbox.italic}>{city.country}</p>
        </li>
      ))}
    </ul>
  );
}

export default List;
