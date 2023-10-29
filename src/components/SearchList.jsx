import styles from "./SearchList.module.css";

import { useWeather } from "../contexts/WeatherContext";

function SearchList() {
  const { cities, city: currCity, loadWeatherData } = useWeather();

  const activeStyle = function (city) {
    if (Object.keys(currCity).length === 0) return;
    const style =
      city.region === currCity.location.region ? styles["active"] : null;
    return style;
  };

  return (
    <ul className={styles.search}>
      {cities.map((city) => (
        <li
          key={city.id}
          data-name={city.name}
          onClick={() => loadWeatherData(`${city.lat},${city.lon}`)}
          className={activeStyle(city)}
        >
          <p>{city.name}</p>
          <p className={styles.italic}>{city.country}</p>
        </li>
      ))}
    </ul>
  );
}

export default SearchList;
