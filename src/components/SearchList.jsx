import styles from "./SearchList.module.css";
import toolbox from "./General.module.css";

import { useWeather } from "../contexts/WeatherContext";

import { IoSearchOutline } from "react-icons/io5";

function SearchList() {
  const { cities, loadWeatherData } = useWeather();

  return (
    <>
      {Object.keys(cities).length > 0 && (
        <div className={styles.search}>
          <div className={toolbox.box}>
            <IoSearchOutline className={toolbox.small} />
            <p className={toolbox.small}>Search</p>
          </div>
          <ul>
            {cities.map((city) => (
              <li
                key={city.id}
                onClick={() => loadWeatherData(`${city.lat},${city.lon}`)}
              >
                <p>{city.name}</p>
                <p className={toolbox.italic}>{city.country}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchList;
