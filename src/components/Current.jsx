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
            <IoStarOutline onClick={() => addToFavourite(location)} />
            <p>{location.name}</p>
          </div>
          <p>{location.country}</p>
        </div>
        <img src={current.condition.icon} />
      </div>
      <div className={toolbox.grid4c}>
        <div className={toolbox.flex} title="Temperature °C">
          <WiThermometer />
          <p>{current.temp_c}°</p>
          <p>({current.feelslike_c}°)</p>
        </div>
        <div className={toolbox.flex} title="Precipitation mm">
          <WiUmbrella />
          <p>{current.precip_mm}</p>
          <p>mm</p>
        </div>
        <div className={toolbox.flex} title="Wind kph">
          <WiStrongWind />
          <p>{current.wind_kph}</p>
          <p>kph</p>
        </div>
        <div className={toolbox.flex} title="UV index">
          <WiDaySunny />
          {/* className={toolbox[uvIndex.at(current.uv - 1).color]} */}
          <p>{current.uv}</p>
          <p>{uvIndex.at(current.uv - 1).name}</p>
        </div>
        <div className={toolbox.flex} title="Pressure hPa">
          <WiBarometer />
          <p>{current.pressure_mb}</p>
          <p>hPa</p>
        </div>
        <div className={toolbox.flex} title="Humidity %">
          <WiRaindrops />
          <p>{current.humidity}</p>
          <p>%</p>
        </div>
        <div className={toolbox.flex} title="Sunrise">
          <WiSunrise />
          <p>{forecast.forecastday[0].astro.sunrise.slice(0, 5)}</p>
          <p>{forecast.forecastday[0].astro.sunrise.slice(-2)}</p>
        </div>
        <div className={toolbox.flex} title="Sunset">
          <WiSunset />
          <p>{forecast.forecastday[0].astro.sunset.slice(0, 5)}</p>
          <p>{forecast.forecastday[0].astro.sunset.slice(-2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Current;
