import { useWeather } from "../contexts/WeatherContext";

function Current() {
  const { city } = useWeather();

  if (Object.keys(city).length === 0) return;

  const { location, current, forecast } = city;

  return (
    <div>
      <header>{location.name}</header>
      <p>{location.localtime}</p>
      <p>{location.country}</p>
      <p>{current.temp_c}</p>
      <p>{current.wind_kph}</p>
      <p>{current.precip_mm}</p>
      <p>{current.uv}</p>
      <p>{current.pressure_mb}</p>
      <p>{current.humidity}</p>
      <p>{forecast.forecastday[0].astro.sunrise}</p>
      <p>{forecast.forecastday[0].astro.sunset}</p>
    </div>
  );
}

export default Current;
