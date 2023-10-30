import styles from "./Forecast.module.css";
import toolbox from "./General.module.css";

import { IoTimeOutline, IoInformation, IoCalendarOutline } from "react-icons/io5";

import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiUmbrella,
  WiDaySunny,
} from "react-icons/wi";

import { Fragment, useState } from "react";
import { useWeather } from "../contexts/WeatherContext";

function Forecast() {
  const { city, uvIndex } = useWeather();
  const [day, setDay] = useState(0);

  if (Object.keys(city).length === 0) return;

  const {
    forecast: { forecastday },
  } = city;

  const now = String(new Date().getTime() - 3600000).slice(0, 10);

  const tabNames = forecastday.map((day) => {
    const date = new Date(0);
    date.setUTCSeconds(day.date_epoch);
    return date.toDateString().slice(0, 3);
  });

  function row(hour) {
    return (
      <Fragment key={hour.time_epoch}>
        <div title={hour.condition.text}>
          <img src={hour.condition.icon} alt={hour.condition.text} />
        </div>
        <div>
          <p className={toolbox.active}>{hour.time.slice(-5).slice(0, 2)}</p>
        </div>
        <div>
          <p className={toolbox.red}>{Math.floor(hour.temp_c)}</p>
        </div>
        <div>
          <p className={toolbox.blue}>{Math.floor(hour.precip_mm)}</p>
        </div>
        <div>
          <p>{hour.chance_of_rain}</p>
        </div>
        <div>
          <p>{Math.floor(hour.wind_kph)}</p>
        </div>
        <div>
          <p className={toolbox[uvIndex.at(hour.uv - 1).color]}>{hour.uv}</p>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={styles.forecast}>
      <div className={toolbox.box}>
        <IoCalendarOutline className={toolbox.small} />
        <p className={toolbox.small}>Forecast</p>
      </div>
      <header className={styles.header}>
        <div>
          {tabNames.map((name, index) => (
            <p
              key={index}
              onClick={() => setDay(index)}
              className={index === day ? toolbox.active : null}
            >
              {name}
            </p>
          ))}
        </div>
      </header>
      <main className={styles.main}>
        <div title="Weather description">
          <IoInformation className={toolbox.icon} />
        </div>
        <div title="Time">
          <IoTimeOutline className={toolbox.icon} />
        </div>
        <div title="Temperature °C">
          <WiThermometer className={toolbox.icon} />
        </div>
        <div title="Rain mm">
          <WiUmbrella className={toolbox.icon} />
        </div>
        <div title="Chance of rain %">
          <WiHumidity className={toolbox.icon} />
        </div>
        <div title="Wind kph">
          <WiStrongWind className={toolbox.icon} />
        </div>
        <div title="UV index">
          <WiDaySunny className={toolbox.icon} />
        </div>
        {forecastday
          .at(day)
          .hour.filter((h) => h.time_epoch >= now)
          .filter((_, i) => !(i % 2))
          .map((hour) => row(hour))}
      </main>
      <footer></footer>
    </div>
  );
}

export default Forecast;
