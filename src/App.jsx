import Search from "./components/Search";
import Favourities from "./components/Favourities";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";
import { WeatherProvider } from "./contexts/WeatherContext";
import styles from "./App.module.css";

function App() {
  return (
    <WeatherProvider>
      <Search />
      <div className={styles.center}>
        <div className={styles.window}>
          <Favourities />
          <Current />
          <Forecast />
        </div>
      </div>
      <Footer />
    </WeatherProvider>
  );
}

export default App;
