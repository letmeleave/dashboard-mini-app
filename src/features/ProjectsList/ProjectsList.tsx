import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useEffect } from "react";

import styles from "./ProjectsList.module.scss";

interface ProjectsListProps {
  search: string;
}

const ProjectsList = ({ search }: ProjectsListProps) => {
  const {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
    handleSearch,
  } = useProjects(20, true);

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        !loadingMore &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore, loadMore]);

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
          <li>
            <ProjectCard {...project} key={project.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
