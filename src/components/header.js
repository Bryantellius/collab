import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../assets/brand/name-transparent.png";

export default function Header() {
  return (
    <header className={styles.header}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <img src={logo} className={styles.navLogo} alt="Collab" />
          </li>
          <li className={styles.navItem}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
