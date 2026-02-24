import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useEffect } from "react";

import styles from "./ProjectsList.module.scss";

interface ProjectsListProps {
  search: string;
}

const ProjectsList = ({ search }: ProjectsListProps) => {
  const { projects, loading, error, refetch, handleSearch } = useProjects(
    20,
    true,
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  if (loading && projects.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Загрузка проектов...</p>
        </div>
      </div>
    );
  }

  if (error && projects.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Ошибка: {error}</p>
          <button onClick={refetch}>Повторить попытку</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard {...project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
