import { IoTimeOutline, IoInformation, IoCalendarOutline } from "react-icons/io5";
import {
  WiThermometer,
  WiStrongWind,
  WiHumidity,
  WiUmbrella,
  WiDaySunny,
  WiSunrise,
  WiSunset,
} from "react-icons/wi";
import { Fragment } from "react";
import { useWeather } from "../contexts/WeatherContext";
import toolbox from "./Toolbox.module.css";
import styles from "./Forecast.module.css";

function Forecast() {
  const { city, forecDay, dispatch } = useWeather();

  if (Object.keys(city).length === 0) return;

  const {
    forecast: { forecastday },
  } = city;

  const tabNames = forecastday.map((day) => {
    const date = new Date(0);
    date.setUTCSeconds(day.date_epoch);
    return date.toDateString().slice(0, 3);
  });

  function row(hour) {
    return (
      <Fragment key={hour.time_epoch}>
        <div title={hour.condition.text}>
          <img
            className={toolbox.imgSmall}
            src={hour.condition.icon}
            alt={hour.condition.text}
          />
        </div>
        <div>
          <p>{hour.time.slice(-5).slice(0, 2)}</p>
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
          <p>{hour.uv}</p>
        </div>
      </Fragment>
    );
  }

  return (
    <div className={styles.window}>
      <div className={toolbox.container}>
        <div className={toolbox.flexSpaceBetween}>
          <div className={toolbox.flex}>
            <IoCalendarOutline />
            <p>Forecast</p>
          </div>
          <div className={toolbox.flexFlip}>
            <div className={toolbox.flex} title="Sunrise">
              <WiSunrise className={toolbox.medium} />
              <p>{forecastday.at(forecDay).astro.sunrise.slice(0, 5)}</p>
              <p className={toolbox.small}>
                {forecastday.at(forecDay).astro.sunrise.slice(-2)}
              </p>
            </div>
            <div className={toolbox.flex} title="Sunset">
              <WiSunset className={toolbox.medium} />
              <p>{forecastday.at(forecDay).astro.sunset.slice(0, 5)}</p>
              <p className={toolbox.small}>
                {forecastday.at(forecDay).astro.sunset.slice(-2)}
              </p>
            </div>
          </div>
          <ul className={toolbox.flex}>
            {tabNames.map((name, index) => (
              <li
                key={index}
                className={`${
                  index === forecDay ? toolbox["activeTab"] : toolbox["tab"]
                }`}
                onClick={() =>
                  dispatch({ type: "setForecastDay", payload: index })
                }
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${toolbox.grid7c} ${toolbox.small}`}>
          <div title="Weather description">
            <IoInformation className={toolbox.medium} />
          </div>
          <div title="Time">
            <IoTimeOutline className={toolbox.medium} />
          </div>
          <div title="Temperature °C">
            <WiThermometer className={toolbox.medium} />
          </div>
          <div title="Rain mm">
            <WiUmbrella className={toolbox.medium} />
          </div>
          <div title="Chance of rain %">
            <WiHumidity className={toolbox.medium} />
          </div>
          <div title="Wind kph">
            <WiStrongWind className={toolbox.medium} />
          </div>
          <div title="UV index">
            <WiDaySunny className={toolbox.medium} />
          </div>
          {forecastday
            .at(forecDay)
            .hour.filter((_, i) => !(i % 2))
            .map((hour) => row(hour))}
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default Forecast;
