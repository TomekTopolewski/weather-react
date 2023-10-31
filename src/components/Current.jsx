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
import toolbox from "./Toolbox.module.css";
import styles from "./Current.module.css";

function Current() {
  const { city, uvIndex, addToFavourite } = useWeather();
  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  return (
    <div className={toolbox.container}>
      <div className={toolbox.flexSpaceBetween}>
        <div className={toolbox.flex}>
          <IoTimeOutline />
          <p>Current conditions</p>
        </div>
        <p>{location.localtime}</p>
      </div>
      <div className={toolbox.flexSpaceBetween}>
        <div className={toolbox.flexColumn}>
          <div className={toolbox.flex}>
            <p className={toolbox.big}>{location.name}</p>
            <IoStarOutline
              className={styles.favouriteIcon}
              onClick={() => addToFavourite(location)}
            />
          </div>
          <p className={toolbox.italic}>{location.country}</p>
        </div>
        <img src={current.condition.icon} />
      </div>
      <div className={`${toolbox.grid4c} ${toolbox.big}`}>
        <div className={toolbox.flex} title="Temperature °C">
          <WiThermometer />
          <p className={toolbox.red}>{current.temp_c}°</p>
          <p className={`${toolbox.small} ${toolbox.red}`}>
            ({current.feelslike_c}°)
          </p>
        </div>
        <div className={toolbox.flex} title="Precipitation mm">
          <WiUmbrella />
          <p className={toolbox.blue}>{current.precip_mm}</p>
          <p className={`${toolbox.small} ${toolbox.blue}`}>mm</p>
        </div>
        <div className={toolbox.flex} title="Wind kph">
          <WiStrongWind />
          <p>{current.wind_kph}</p>
          <p className={toolbox.small}>kph</p>
        </div>
        <div className={toolbox.flex} title="UV index">
          <WiDaySunny />
          <p>{current.uv}</p>
          <p className={toolbox.small}>{uvIndex.at(current.uv - 1).name}</p>
        </div>
        <div className={toolbox.flex} title="Pressure hPa">
          <WiBarometer />
          <p>{current.pressure_mb}</p>
          <p className={toolbox.small}>hPa</p>
        </div>
        <div className={toolbox.flex} title="Humidity %">
          <WiRaindrops />
          <p>{current.humidity}</p>
          <p className={toolbox.small}>%</p>
        </div>
        <div className={toolbox.flex} title="Sunrise">
          <WiSunrise />
          <p>{forecast.forecastday[0].astro.sunrise.slice(0, 5)}</p>
          <p className={toolbox.small}>
            {forecast.forecastday[0].astro.sunrise.slice(-2)}
          </p>
        </div>
        <div className={toolbox.flex} title="Sunset">
          <WiSunset />
          <p>{forecast.forecastday[0].astro.sunset.slice(0, 5)}</p>
          <p className={toolbox.small}>
            {forecast.forecastday[0].astro.sunset.slice(-2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Current;
