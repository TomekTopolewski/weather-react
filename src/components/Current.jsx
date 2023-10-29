import styles from "./Current.module.css";

import {
  WiThermometer,
  WiStrongWind,
  WiUmbrella,
  WiSunrise,
  WiSunset,
  WiDaySunny,
  WiBarometer,
  WiRaindrops,
} from "react-icons/wi";

import { useWeather } from "../contexts/WeatherContext";

function Current() {
  const { city } = useWeather();
  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  const uvIndex = [
    { name: "low", color: "green" },
    { name: "low", color: "green" },
    { name: "moderate", color: "yellow" },
    { name: "moderate", color: "yellow" },
    { name: "moderate", color: "yellow" },
    { name: "high", color: "orange" },
    { name: "high", color: "orange" },
    { name: "very high", color: "red" },
    { name: "very high", color: "red" },
    { name: "very high", color: "red" },
    { name: "extreme", color: "purple" },
  ];

  return (
    <div className={styles.current}>
      <header className={styles.header}>
        <div>
          <p>{location.name}</p>
          <p className={`${styles.smallText} ${styles.italic}`}>
            {location.country}
          </p>
        </div>
        <p className={`${styles.smallText} ${styles.top}`}>
          {location.localtime}
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.box} title="Temperature °C">
          <WiThermometer className={styles.icon} />
          <p className={styles.red}>{current.temp_c}°</p>
          <p className={`${styles.smallText} ${styles.red}`}>
            ({current.feelslike_c}°)
          </p>
        </div>
        <div className={styles.box} title="Precipitation mm">
          <WiUmbrella className={styles.icon} />
          <p className={styles.blue}>{current.precip_mm}</p>
          <p className={`${styles.smallText} ${styles.blue}`}>mm</p>
        </div>
        <div className={styles.box} title="Wind kph">
          <WiStrongWind className={styles.icon} />
          <p>{current.wind_kph}</p>
          <p className={styles.smallText}>kph</p>
        </div>
        <div className={styles.box} title="UV index">
          <WiDaySunny className={styles.icon} />
          <p className={styles[uvIndex.at(current.uv - 1).color]}>
            {current.uv}
          </p>
          <p
            className={`${styles.smallText} ${
              styles[uvIndex.at(current.uv - 1).color]
            }`}
          >
            {uvIndex.at(current.uv - 1).name}
          </p>
        </div>
        <div className={styles.box} title="Pressure hPa">
          <WiBarometer className={styles.icon} />
          <p>{current.pressure_mb}</p>
          <p className={styles.smallText}>hPa</p>
        </div>
        <div className={styles.box} title="Humidity %">
          <WiRaindrops className={styles.icon} />
          <p>{current.humidity}</p>
          <p className={styles.smallText}>%</p>
        </div>
        <div className={styles.box} title="Sunrise">
          <WiSunrise className={styles.icon} />
          <p>{forecast.forecastday[0].astro.sunrise.slice(0, 5)}</p>
          <p className={styles.smallText}>
            {forecast.forecastday[0].astro.sunrise.slice(-2)}
          </p>
        </div>
        <div className={styles.box} title="Sunset">
          <WiSunset className={styles.icon} />
          <p>{forecast.forecastday[0].astro.sunset.slice(0, 5)}</p>
          <p className={styles.smallText}>
            {forecast.forecastday[0].astro.sunset.slice(-2)}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Current;
