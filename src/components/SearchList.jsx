import styles from "./SearchList.module.css";
import toolbox from "./General.module.css";

import { useWeather } from "../contexts/WeatherContext";

function SearchList() {
  const { cities, city: currCity, loadWeatherData } = useWeather();

  const activeStyle = function (city) {
    if (Object.keys(currCity).length === 0) return;
    const style =
      city.region === currCity.location.region ? toolbox["active"] : null;
    return style;
  };

  return (
    <>
      {Object.keys(cities).length > 0 && (
        <ul className={styles.search}>
          {cities.map((city) => (
            <li
              key={city.id}
              onClick={() => loadWeatherData(`${city.lat},${city.lon}`)}
              className={activeStyle(city)}
            >
              <p>{city.name}</p>
              <p className={toolbox.italic}>{city.country}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchList;
