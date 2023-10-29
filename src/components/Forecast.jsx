import { Fragment } from "react";
import { useWeather } from "../contexts/WeatherContext";

function Forecast() {
  const { city } = useWeather();

  if (Object.keys(city).length === 0) return;

  const {
    forecast: { forecastday },
  } = city;

  function row(hour) {
    return (
      <Fragment key={hour.time_epoch}>
        <div>
          <img src={hour.condition.icon} alt={hour.condition.text} />
          <p>{hour.condition.text}</p>
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

  return <div>{forecastday.at(0).hour.map((hour) => row(hour))}</div>;
}

export default Forecast;
