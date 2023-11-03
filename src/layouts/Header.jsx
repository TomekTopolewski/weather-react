import styles from "./Header.module.css";
function Header({ children }) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Header;
