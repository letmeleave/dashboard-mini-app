import { useState, type ChangeEventHandler, type FC } from "react";
import Input from "@/components/Input/Input";

import styles from "./Dashboard.module.scss";
import Layout from "@/components/Layout/Layout";
import ProjectsList from "@/features/ProjectsList/ProjectsList";

const Dashboard: FC = () => {
  const [search, setSearch] = useState<string>("");

  const inputOnChange: ChangeEventHandler<
    HTMLInputElement,
    HTMLInputElement
  > = (target) => {
    setSearch(target.currentTarget.value);
  };

  return (
    <Layout title="Dashboard">
      <section className={styles.top}>
        <Input
          label="Search"
          name="search_input"
          onChange={inputOnChange}
          value={search}
        />
      </section>
      <section className={styles.main}>
        <ProjectsList search={search} />
      </section>
    </Layout>
  );
};

export default Dashboard;
