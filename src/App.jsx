import styles from "./App.module.css";

import SearchQuery from "./components/SearchQuery";
import SearchList from "./components/SearchList";
// import Favourities from "./components/Favourities";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";

import { WeatherProvider } from "./contexts/WeatherContext";

function App() {
  return (
    <div className={styles.app}>
      <WeatherProvider>
        <SearchQuery />
        <SearchList />
        {/* <Favourities /> */}
        <Current />
        <Forecast />
        <Footer />
      </WeatherProvider>
    </div>
  );
}

export default App;
