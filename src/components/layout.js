import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthButton from "./auth/AuthButton";

export default function Layout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="min-h-100 p-relative">
      <Header onOptions={() => setOpenNav((prev) => !prev)} />
      <div className={styles.drawer + `${openNav ? styles.show : ""}`}>
        <div className={styles.drawerOverlay}></div>
        <div className={styles.drawerSidebar}>
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
            className="feather feather-x-square cursor-pointer"
            onClick={() => setOpenNav((prev) => !prev)}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
          <nav className={styles.nav}>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <Link to="/">Home</Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/about">About</Link>
              </li>
              <li>
                <AuthButton />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
