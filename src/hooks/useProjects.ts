import type { ProjectCardProps } from "@/components/ProjectCard/ProjectCard";
import { useCallback, useEffect, useRef, useState } from "react";
import mockData from "@/mock/projects.json";

interface UseProjectsResult {
  projects: ProjectCardProps[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  total: number;
  loadMore: () => void;
  refetch: () => Promise<void>;
  reset: () => void;
  handleSearch: (search: string) => void;
}

const useProjects = (
  limit: number = 20,
  initialLoad: boolean = true,
  initialSearch: string = "",
): UseProjectsResult => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(initialLoad);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [searchString, setSearchString] = useState<string>(initialSearch);

  const initialLoadRef = useRef<boolean>(false);
  const searchTimeoutRef = useRef<number>(null);

  const filterProjectsBySearch = useCallback(
    (projects: ProjectCardProps[], search: string): ProjectCardProps[] => {
      if (!search.trim()) {
        return projects;
      }

      const searchLower = search.toLowerCase().trim();
      return projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower),
      );
    },
    [],
  );

  const fetchProjectsPage = useCallback(
    async (
      pageNum: number,
      pageLimit: number,
      search: string,
    ): Promise<{
      data: ProjectCardProps[];
      total: number;
      hasMore: boolean;
    }> => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const filteredProjects = filterProjectsBySearch(mockData, search);

      const start = (pageNum - 1) * pageLimit;
      const end = start + pageLimit;

      const paginatedData = filteredProjects.slice(start, end);
      const hasMoreData = end < filteredProjects.length;

      return {
        data: paginatedData,
        total: filteredProjects.length,
        hasMore: hasMoreData,
      };
    },
    [filterProjectsBySearch],
  );

  const loadProjects = useCallback(
    async (pageNum: number, search: string, isLoadMore: boolean = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const response = await fetchProjectsPage(pageNum, limit, search);

        setTotal(response.total);
        setHasMore(response.hasMore);

        if (isLoadMore) {
          setProjects((prev) => [...prev, ...response.data]);
        } else {
          setProjects(response.data);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ошибка при загрузке проектов",
        );
      } finally {
        if (isLoadMore) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [limit, fetchProjectsPage],
  );

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProjects(nextPage, searchString, true);
    }
  }, [loadingMore, hasMore, page, searchString, loadProjects]);

  const reset = useCallback(() => {
    setProjects([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    setLoading(true);
    setLoadingMore(false);
    loadProjects(1, searchString, false);
  }, [searchString, loadProjects]);

  const refetch = useCallback(async () => {
    setError(null);
    await loadProjects(page, searchString, false);
  }, [page, searchString, loadProjects]);

  const handleSearch = useCallback(
    (search: string) => {
      setSearchString(search);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        setPage(1);
        setProjects([]);
        loadProjects(1, search, false);
      }, 500);
    },
    [loadProjects],
  );

  useEffect(() => {
    if (initialLoad && !initialLoadRef.current) {
      initialLoadRef.current = true;
      loadProjects(1, searchString, false);
    }
  }, [initialLoad, searchString, loadProjects]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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

  return {
    projects,
    loading,
    loadingMore,
    error,
    hasMore,
    total,
    loadMore,
    refetch,
    reset,
    handleSearch,
  };
};

export { useProjects };
