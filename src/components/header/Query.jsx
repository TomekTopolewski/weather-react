import styles from "./Query.module.css";
import toolbox from "../Toolbox.module.css";
import { IoSearchOutline, IoLocateOutline } from "react-icons/io5";
import { useWeather } from "../../contexts/WeatherContext";

function Query() {
  const { query, search, getPosition } = useWeather();

  return (
    <div className={styles.query}>
      <div className={toolbox.flex}>
        <IoSearchOutline className={toolbox.medium} />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(event) => search(event.target.value)}
        />
      </div>
      <IoLocateOutline className={styles.gpsIcon} onClick={getPosition} />
    </div>
  );
}

export default Query;
