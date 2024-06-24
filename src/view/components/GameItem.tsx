import { Star } from "lucide-react";
import { Game } from "../../app/services/api/hooks/useGames";

export default function GameItem({ game }: { game: Game }) {
  console.log(game);
  return (
    <li className="flex h-full w-full cursor-pointer flex-col gap-2 overflow-hidden rounded-md bg-neutral-700 md:h-[320px]">
      <img
        className="h-full max-h-[270px] object-cover md:h-[200px]"
        src={game.background_image}
        alt={game.name}
      />
      <article className="p-4">
        <h2 className="text-xl font-semibold">{game.name}</h2>
        <small className="flex items-center gap-2">
          <Star size={14} />
          {game.rating}
        </small>
      </article>
    </li>
  );
}
