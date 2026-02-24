import type { ProjectCardProps } from "@/components/ProjectCard/ProjectCard";
import mockData from "@/mock/projects.json";

export const getProjectById = async (
  id: number,
): Promise<Error | ProjectCardProps> => {
  try {
    const response = await Promise.resolve(
      mockData.find((item) => item.id === id),
    );

    if (!response) {
      throw Error("Отсутствует проект с указанным идентификатором");
    }
    return response;
  } catch (err) {
    throw err as Error;
  }
};
