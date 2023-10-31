import toolbox from "./Toolbox.module.css";

function Footer() {
  return (
    <div className={toolbox.footer}>
      <a href="https://www.weatherapi.com/" title="Free Weather API">
        <img
          src="//cdn.weatherapi.com/v4/images/weatherapi_logo.png"
          alt="Weather data by WeatherAPI.com"
          border="0"
        />
      </a>
    </div>
  );
}

export default Footer;
