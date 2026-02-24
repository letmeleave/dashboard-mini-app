import { useEffect, useState } from "react";
import styles from "./ProjectDetails.module.scss";
import type { ProjectCardProps } from "@/components/ProjectCard/ProjectCard";
import { getProjectById } from "@/services/getProjectById";
import { useNavigate, useParams } from "react-router";
import Layout from "@/components/Layout/Layout";

const ProjectDetails = () => {
  const [project, setProject] = useState<ProjectCardProps>();
  const [error, setError] = useState<Error>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getProjectById(Number(id));
        setProject(response as ProjectCardProps);
      } catch (err) {
        setError(err as Error);
      }
    };

    load();
  }, [id]);

  if (error) {
    navigate("/404");
  }

  if (!project) {
    return (
      <Layout title="Project Details">
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Project Details">
      <div className={styles.container}>
        <h2>{project?.name}</h2>
        <p>{project?.description}</p>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
