import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

function useGenre() {
  const [genre, setGenre] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenre = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<FetchGenreResponse>("/genres", {
          signal: controller.signal,
        });
        setGenre(data.results);
        setError(null);
        setLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        if (error instanceof AxiosError) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchGenre();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    genre,
    error,
    loading,
  };
}

export default useGenre;
