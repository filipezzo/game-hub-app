import useGenre from "../../app/services/api/hooks/useGenre";
import Error from "./Error";
import Loading from "./Loading";

export default function Aside() {
  const { error, loading, genre } = useGenre();

  {
    loading && <Loading />;
  }
  {
    error && <Error error={error} />;
  }
  return (
    <aside className="hidden md:block">
      <h2 className="mb-4 text-2xl font-bold">Genres</h2>
      <ul className="flex flex-col gap-1">
        {genre.length > 0 &&
          genre.map(({ id, image_background, name, slug }) => {
            return (
              <li
                key={id}
                className="flex cursor-pointer items-center gap-2 transition-colors hover:text-neutral-500"
              >
                <img
                  className="size-8 rounded-md object-cover"
                  src={image_background}
                  alt={name}
                />
                <p>{slug}</p>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}
