import { Link } from "react-router-dom";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link to="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
