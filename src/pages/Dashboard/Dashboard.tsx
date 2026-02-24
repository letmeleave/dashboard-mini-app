import type { FC } from "react";
import Input from "@/components/Input/Input";

import styles from "./Dashboard.module.scss";
import Layout from "@/components/Layout/Layout";

const Dashboard: FC = () => {
  return (
    <Layout title="Dashboard">
      <section className={styles.top}>
        <Input label="Search" name="search_input" />
      </section>
      <section className={styles.main}>{/* list */}</section>
    </Layout>
  );
};

export default Dashboard;
