import styles from "./Main.module.css";

function Main({ children }) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Main;
