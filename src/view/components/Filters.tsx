import useCtx from "../../app/services/api/hooks/useCtx";
import useFilter from "../../app/services/api/hooks/useFilter";
import Loading from "./Loading";

export default function Filters() {
  const { error, loading, selectFilter } = useFilter();
  const { onUpdateOption } = useCtx();

  if (loading) {
    return <Loading />;
  }
  if (error) return null;

  return (
    <div>
      <select
        onChange={(e) => onUpdateOption(e.target.value)}
        className="my-4 bg-transparent"
      >
        {selectFilter.map((item) => (
          <option className="bg-neutral-950" key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
