import { useContext } from "react";
import { GenreContext } from "../context/GenreProvider";

export default function useCtx() {
  return useContext(GenreContext);
}
