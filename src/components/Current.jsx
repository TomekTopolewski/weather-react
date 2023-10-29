import styles from "./Current.module.css";
import toolbox from "./General.module.css";

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
  const { city, uvIndex } = useWeather();
  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  return (
    <div className={styles.current}>
      <header className={styles.header}>
        <div>
          <p>{location.name}</p>
          <p className={`${toolbox.smallText} ${toolbox.italic}`}>
            {location.country}
          </p>
        </div>
        <p className={`${toolbox.smallText} ${toolbox.top}`}>
          {location.localtime}
        </p>
      </header>
      <main className={styles.main}>
        <div className={toolbox.box} title="Temperature °C">
          <WiThermometer className={toolbox.icon} />
          <p className={toolbox.red}>{current.temp_c}°</p>
          <p className={`${toolbox.smallText} ${toolbox.red}`}>
            ({current.feelslike_c}°)
          </p>
        </div>
        <div className={toolbox.box} title="Precipitation mm">
          <WiUmbrella className={toolbox.icon} />
          <p className={toolbox.blue}>{current.precip_mm}</p>
          <p className={`${toolbox.smallText} ${toolbox.blue}`}>mm</p>
        </div>
        <div className={toolbox.box} title="Wind kph">
          <WiStrongWind className={toolbox.icon} />
          <p>{current.wind_kph}</p>
          <p className={toolbox.smallText}>kph</p>
        </div>
        <div className={toolbox.box} title="UV index">
          <WiDaySunny className={toolbox.icon} />
          <p className={toolbox[uvIndex.at(current.uv - 1).color]}>
            {current.uv}
          </p>
          <p
            className={`${toolbox.smallText} ${
              toolbox[uvIndex.at(current.uv - 1).color]
            }`}
          >
            {uvIndex.at(current.uv - 1).name}
          </p>
        </div>
        <div className={toolbox.box} title="Pressure hPa">
          <WiBarometer className={toolbox.icon} />
          <p>{current.pressure_mb}</p>
          <p className={toolbox.smallText}>hPa</p>
        </div>
        <div className={toolbox.box} title="Humidity %">
          <WiRaindrops className={toolbox.icon} />
          <p>{current.humidity}</p>
          <p className={toolbox.smallText}>%</p>
        </div>
        <div className={toolbox.box} title="Sunrise">
          <WiSunrise className={toolbox.icon} />
          <p>{forecast.forecastday[0].astro.sunrise.slice(0, 5)}</p>
          <p className={toolbox.smallText}>
            {forecast.forecastday[0].astro.sunrise.slice(-2)}
          </p>
        </div>
        <div className={toolbox.box} title="Sunset">
          <WiSunset className={toolbox.icon} />
          <p>{forecast.forecastday[0].astro.sunset.slice(0, 5)}</p>
          <p className={toolbox.smallText}>
            {forecast.forecastday[0].astro.sunset.slice(-2)}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Current;
