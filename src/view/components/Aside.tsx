import useCtx from "../../app/services/api/hooks/useCtx";
import useGenre from "../../app/services/api/hooks/useGenre";
import Loading from "./Loading";

export default function Aside() {
  const { error, loading, genre } = useGenre();
  const { onUpdateGenre, selectedGenre } = useCtx();
  if (error) return null;
  if (loading) return <Loading />;

  return (
    <aside className="hidden md:block">
      <h2 className="mb-4 text-2xl font-bold">Genres</h2>
      <ul className="flex flex-col gap-1">
        {genre.length > 0 &&
          genre.map((item) => {
            return (
              <li
                key={item.id}
                className="flex cursor-pointer items-center gap-2 transition-colors hover:text-neutral-500"
              >
                <img
                  className="size-8 rounded-md object-cover"
                  src={item.image_background}
                  alt={item.name}
                />
                <button
                  className={
                    selectedGenre?.id === item.id ? "font-bold underline" : ""
                  }
                  onClick={() => onUpdateGenre(item)}
                >
                  {item.slug}
                </button>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
