import { useState, useEffect } from "react";
import { fetchRepositories } from "../services/api";
import { Repository } from "../types";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRepositories();
        setRepositories(data.repositories);
      } catch (error) {
        console.error("Erro ao buscar repositórios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    repo.organization.toLowerCase().includes(search.toLowerCase())
  );

  return { repositories: filteredRepositories, loading, search, setSearch };
};
