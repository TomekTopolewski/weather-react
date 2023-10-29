import styles from "./Current.module.css";

import { useWeather } from "../contexts/WeatherContext";
import { useState } from "react";

function Current() {
  const { city } = useWeather();
  const [moreData, setMoreData] = useState(false);

  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  function handleClick() {
    setMoreData((value) => !value);
  }

  return (
    <div className={styles.current}>
      <header className={styles.header}>
        <div>
          <p>{location.name}</p>
          <p>{location.country}</p>
        </div>
        <p>{location.localtime}</p>
      </header>
      <main className={styles.main}>
        <p>{current.temp_c}</p>
        <p>{current.precip_mm}</p>
        <p>{current.wind_kph}</p>
        <p>{current.uv}</p>

        {moreData && (
          <>
            <p>{current.pressure_mb}</p>
            <p>{current.humidity}</p>
            <p>{forecast.forecastday[0].astro.sunrise}</p>
            <p>{forecast.forecastday[0].astro.sunset}</p>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <button onClick={handleClick}>...</button>
      </footer>
    </div>
  );
}

export default Current;
