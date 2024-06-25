import { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../api";
import useCtx from "./useCtx";

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
  rating: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { selectedGenre, selectedOption } = useCtx();

  useEffect(() => {
    const controller = new AbortController();

    const fetchGames = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<FetchGamesResponse>("/games", {
          signal: controller.signal,
          params: {
            genres: selectedGenre?.id,
            platforms: selectedOption ?? null,
          },
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
  }, [selectedGenre?.id, selectedOption]);

  return {
    games,
    error,
    loading,
  };
}

export default useGames;
