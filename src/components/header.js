import styles from "./header.module.css";
import logo from "../assets/brand/name-transparent.png";

export default function Header({ onOptions }) {
  return (
    <header className={styles.header}>
      <span>
        <img src={logo} className={styles.navLogo} alt="Collab" />
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-more-vertical cursor-pointer"
        title="More Options"
        onClick={onOptions}
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </header>
  );
}
