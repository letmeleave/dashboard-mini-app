import { Link } from "react-router";

import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Error 404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
};

export default PageNotFound;
