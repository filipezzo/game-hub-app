import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";

interface Platform {
  id: number;
  slug: string;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  platforms: { platform: Platform }[];
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<FetchGamesResponse>("/games", {
          signal: controller.signal,
        });
        setGames(data.results);
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

    fetchGames();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    games,
    error,
    loading,
  };
}

export default useGames;
