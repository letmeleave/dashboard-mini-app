import type { FC } from "react";

import styles from "./ProjectCard.module.scss";
import { useNavigate } from "react-router";

export interface ProjectCardProps {
  name: string;
  description: string;
  id: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ name, description, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/projects/${id}`);
      }}
      className={styles.container}
    >
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ProjectCard;
