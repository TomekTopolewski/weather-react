import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import AppLogo from "../components/header/AppLogo";
import Query from "../components/header/Query";
import List from "../components/header/List";
import Favourities from "../components/main/Favourities";
import Current from "../components/main/Current";
import Forecast from "../components/main/Forecast";
import GithubLogo from "../components/footer/GithubLogo";
import ApiLogo from "../components/footer/ApiLogo";

import { WeatherProvider } from "../contexts/WeatherContext";
import styles from "./App.module.css";
import { SearchProvider } from "../contexts/SearchContext";

function App() {
  return (
    <div className={styles.app}>
      <WeatherProvider>
        <SearchProvider>
          <Header>
            <AppLogo />
            <Query />
            <List />
          </Header>
        </SearchProvider>
        <Main>
          <Favourities />
          <Current />
          <Forecast />
        </Main>
        <Footer>
          <GithubLogo />
          <ApiLogo />
        </Footer>
      </WeatherProvider>
    </div>
  );
}

export default App;
