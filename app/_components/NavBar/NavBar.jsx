/* eslint-disable @next/next/no-img-element */
import Units from "../Units/Units";
import styles from "./NavBar.module.css";
export default function NavBar({ children }) {
  return (
    <div className={styles.nav}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.navItems}>
          <img
            src="./assets/images/logo.svg"
            alt="logo"
            className={styles.logo}
          />
          <Units />
        </div>
      </div>
    </div>
  );
}
