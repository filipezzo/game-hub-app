import useGames from "../../app/services/api/hooks/useGames";
import Error from "./Error";
import GameItem from "./GameItem";
import Loading from "./Loading";

export default function GameGrid() {
  const { loading, error, games } = useGames();
  return (
    <>
      {loading && <Loading />}
      {!loading && error && <Error error={error} />}

      <ul className="my-4 flex h-full w-full flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {games.length > 0 &&
          games.map((game) => <GameItem key={game.id} game={game} />)}
      </ul>
    </>
  );
}
