import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";

interface Options {
  id: number;
  name: string;
  slug: string;
}

interface Response {
  results: Options[];
}

function useFilter() {
  const [selectFilter, setSelectedFilter] = useState<Options[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlatforms = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<Response>("/platforms/lists/parents", {
          signal: controller.signal,
        });
        setSelectedFilter(data.results);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof AxiosError) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();

    return () => controller.abort();
  }, []);

  return {
    error,
    loading,
    selectFilter,
  };
}

export default useFilter;
