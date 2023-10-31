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
import toolbox from "./Toolbox.module.css";

function Forecast() {
  const { city } = useWeather();
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
          <p>{hour.time.slice(-5).slice(0, 2)}</p>
        </div>
        <div>
          <p>{Math.floor(hour.temp_c)}</p>
        </div>
        <div>
          <p>{Math.floor(hour.precip_mm)}</p>
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
    <div className={toolbox.container}>
      <div className={toolbox.flexSpaceBetween}>
        <div className={toolbox.flex}>
          <IoCalendarOutline />
          <p>Forecast</p>
        </div>
        <ul className={toolbox.flex}>
          {tabNames.map((name, index) => (
            <li key={index} onClick={() => setDay(index)}>
              {name}
            </li>
          ))}
        </ul>
      </div>
      <div className={toolbox.grid7c}>
        <div title="Weather description">
          <IoInformation />
        </div>
        <div title="Time">
          <IoTimeOutline />
        </div>
        <div title="Temperature °C">
          <WiThermometer />
        </div>
        <div title="Rain mm">
          <WiUmbrella />
        </div>
        <div title="Chance of rain %">
          <WiHumidity />
        </div>
        <div title="Wind kph">
          <WiStrongWind />
        </div>
        <div title="UV index">
          <WiDaySunny />
        </div>
        {forecastday
          .at(day)
          .hour.filter((h) => h.time_epoch >= now)
          .filter((_, i) => !(i % 2))
          .map((hour) => row(hour))}
      </div>
      <footer></footer>
    </div>
  );
}

export default Forecast;
