import styles from "./SearchList.module.css";

import { useWeather } from "../contexts/WeatherContext";

function SearchList() {
  const { cities, loadWeatherData } = useWeather();

  function handleClick(event) {
    const parent = event.target.closest("li");
    loadWeatherData(parent.dataset.name);
  }

  return (
    <ul className={styles.search}>
      {cities.map((city) => (
        <li
          key={city.id}
          data-name={city.name}
          onClick={(event) => handleClick(event)}
        >
          {city.name}
        </li>
      ))}
    </ul>
  );
}

export default SearchList;
