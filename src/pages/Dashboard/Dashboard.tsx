import type { FC } from "react";
import Input from "@/components/Input/Input";

import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  return (
    <>
      <section className={styles.top}>
        <Input label="Search" name="search_input" />
      </section>
    </>
  );
};

export default Dashboard;
