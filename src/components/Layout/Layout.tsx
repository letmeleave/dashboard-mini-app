import type { FC, ReactNode } from "react";

import styles from "./Layout.module.scss";

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ title = "Mini App", children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
      <div className={styles.mainContainer}>
        <main>{children}</main>
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
