import toolbox from "../Toolbox.module.css";
import styles from "./AppLogo.module.css";

function AppLogo() {
  return (
    <div className={toolbox.flex}>
      <img src="/logo.png" className={toolbox.imgSmall} />
      <p className={styles.text}>Simple weather app</p>
    </div>
  );
}

export default AppLogo;
