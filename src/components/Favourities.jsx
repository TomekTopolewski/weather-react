import { useWeather } from "../contexts/WeatherContext";
import { IoMapOutline } from "react-icons/io5";
import toolbox from "./Toolbox.module.css";

function Favourities() {
  const { favourities, getData } = useWeather();

  if (favourities.length === 0) return;

  return (
    <div className={toolbox.container}>
      <div className={toolbox.flex}>
        <IoMapOutline />
        <p>My locations</p>
      </div>
      <ul>
        {favourities.map((city) => (
          <li
            key={`${city.lat},${city.lon}`}
            onClick={() => getData(`${city.lat},${city.lon}`)}
          >
            <p>{city.name}</p>
            <p>{city.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourities;
