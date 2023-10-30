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

import { IoStarOutline, IoTimeOutline } from "react-icons/io5";

import { useWeather } from "../contexts/WeatherContext";

function Current() {
  const { city, uvIndex, saveCity } = useWeather();
  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  return (
    <div className={styles.current}>
      <div className={styles.header}>
        <div className={toolbox.box}>
          <IoTimeOutline className={toolbox.small} />
          <p className={toolbox.small}>Current conditions</p>
        </div>
        <p className={`${toolbox.small} ${toolbox.top}`}>{location.localtime}</p>
      </div>

      <header className={styles.header}>
        <div>
          <div className={toolbox.box}>
            <IoStarOutline
              className={styles.icon}
              onClick={() => saveCity(location)}
            />
            <p>{location.name}</p>
          </div>
          <p className={`${toolbox.small} ${toolbox.italic}`}>
            {location.country}
          </p>
        </div>
        <img src={current.condition.icon} />
      </header>
      <main className={styles.main}>
        <div className={toolbox.box} title="Temperature °C">
          <WiThermometer className={toolbox.icon} />
          <p className={toolbox.red}>{current.temp_c}°</p>
          <p className={`${toolbox.small} ${toolbox.red}`}>
            ({current.feelslike_c}°)
          </p>
        </div>
        <div className={toolbox.box} title="Precipitation mm">
          <WiUmbrella className={toolbox.icon} />
          <p className={toolbox.blue}>{current.precip_mm}</p>
          <p className={`${toolbox.small} ${toolbox.blue}`}>mm</p>
        </div>
        <div className={toolbox.box} title="Wind kph">
          <WiStrongWind className={toolbox.icon} />
          <p>{current.wind_kph}</p>
          <p className={toolbox.small}>kph</p>
        </div>
        <div className={toolbox.box} title="UV index">
          <WiDaySunny className={toolbox.icon} />
          <p className={toolbox[uvIndex.at(current.uv - 1).color]}>
            {current.uv}
          </p>
          <p
            className={`${toolbox.small} ${
              toolbox[uvIndex.at(current.uv - 1).color]
            }`}
          >
            {uvIndex.at(current.uv - 1).name}
          </p>
        </div>
        <div className={toolbox.box} title="Pressure hPa">
          <WiBarometer className={toolbox.icon} />
          <p>{current.pressure_mb}</p>
          <p className={toolbox.small}>hPa</p>
        </div>
        <div className={toolbox.box} title="Humidity %">
          <WiRaindrops className={toolbox.icon} />
          <p>{current.humidity}</p>
          <p className={toolbox.small}>%</p>
        </div>
        <div className={toolbox.box} title="Sunrise">
          <WiSunrise className={toolbox.icon} />
          <p>{forecast.forecastday[0].astro.sunrise.slice(0, 5)}</p>
          <p className={toolbox.small}>
            {forecast.forecastday[0].astro.sunrise.slice(-2)}
          </p>
        </div>
        <div className={toolbox.box} title="Sunset">
          <WiSunset className={toolbox.icon} />
          <p>{forecast.forecastday[0].astro.sunset.slice(0, 5)}</p>
          <p className={toolbox.small}>
            {forecast.forecastday[0].astro.sunset.slice(-2)}
          </p>
        </div>
      </main>
    </div>
  );
}

export default Current;
