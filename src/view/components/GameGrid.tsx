import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { api } from "../../app/services/api/api";
import Error from "./Error";
import Loading from "./Loading";

interface Game {
  id: number;
  name: string;
  slug: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

export default function GameGrid() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchGames = async () => {
      setLoading(true);
      try {
        const { data } = await api.get<FetchGamesResponse>("/xgames");

        if (ignore === false) {
          setGames(data.results);
          setError(null);
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError && ignore === false) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchGames();

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && error && <Error error={error} />}

      <ul>
        {games.length > 0 &&
          games.map((game) => <li key={game.id}>{game.name}</li>)}
      </ul>
    </>
  );
}
