import styles from "./Favourities.module.css";
import toolbox from "./General.module.css";

import { useWeather } from "../contexts/WeatherContext";

import { IoMapOutline } from "react-icons/io5";

function Favourities() {
  const { favourities, loadWeatherData } = useWeather();

  if (favourities.length === 0) return;

  return (
    <div className={styles.favourities}>
      <div className={toolbox.box}>
        <IoMapOutline className={toolbox.small} />
        <p className={toolbox.small}>My locations</p>
      </div>
      <ul>
        {favourities.map((city) => (
          <li
            key={`${city.lat},${city.lon}`}
            onClick={() => loadWeatherData(`${city.lat},${city.lon}`)}
          >
            <p>{city.name}</p>
            <p className={toolbox.italic}>{city.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourities;
