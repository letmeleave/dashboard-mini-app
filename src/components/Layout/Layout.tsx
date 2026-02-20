import type { FC } from "react";
import { Outlet } from "react-router";

import styles from "./Layout.module.scss";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Mini-App</h1>
      </header>
      <div className={styles.mainContainer}>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className={styles.footer}>
        <a
          target="_blank"
          href="https://github.com/letmeleave/dashboard-mini-app"
        >
          Link to GitHub
        </a>
      </footer>
    </div>
  );
};

export default Layout;
