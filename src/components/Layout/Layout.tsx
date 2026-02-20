import type { FC } from "react";
import { Outlet } from "react-router";

import styles from "./Layout.module.scss";

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Mini-App</header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/letmeleave/dashboard-mini-app">
          Link to GitHub
        </a>
      </footer>
    </div>
  );
};

export default Layout;
