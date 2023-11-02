import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.center}>
      <div className={styles.footer}>
        <a
          href="https://github.com/TomekTopolewski/weather-react-v2"
          title="Browse code on GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/github.png" alt="GitHub logo" border="0" />
        </a>
        <a
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
            alt="Weather data by WeatherAPI.com"
            border="0"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
