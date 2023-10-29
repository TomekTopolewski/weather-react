import styles from "./Forecast.module.css";

import { Fragment, useState } from "react";
import { useWeather } from "../contexts/WeatherContext";

function Forecast() {
  const { city } = useWeather();
  const [day, setDay] = useState(0);

  if (Object.keys(city).length === 0) return;

  const {
    forecast: { forecastday },
  } = city;

  const now = String(new Date().getTime() - 3600000).slice(0, 10);

  function row(hour) {
    return (
      <Fragment key={hour.time_epoch}>
        <div>
          <img src={hour.condition.icon} alt={hour.condition.text} />
        </div>
        <div>
          <p>{hour.time.slice(-5).slice(0, 2)}</p>
        </div>
        <div>
          <p>{Math.floor(hour.temp_c)}</p>
        </div>
        <div>
          <p>{hour.precip_mm}</p>
        </div>
        <div>
          <p>{hour.chance_of_rain}</p>
        </div>
        <div>
          <p>{Math.floor(hour.wind_kph)}</p>
        </div>
        <div>
          <p>{hour.uv}</p>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={styles.forecast}>
      <header className={styles.header}>
        {forecastday.map((d, i) => (
          <p
            key={i}
            onClick={() => setDay(i)}
            className={i === day ? styles.active : null}
          >
            {d.date}
          </p>
        ))}
      </header>
      <main className={styles.main}>
        {forecastday
          .at(day)
          .hour.filter((h) => h.time_epoch >= now)
          .map((hour) => row(hour))}
      </main>
      <footer></footer>
    </div>
  );
}

export default Forecast;
