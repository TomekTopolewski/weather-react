import styles from "./Footer.module.css";

function Footer({ children }) {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

export default Footer;
