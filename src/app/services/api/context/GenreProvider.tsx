import React, { createContext, useCallback, useState } from "react";
import { Genre } from "../hooks/useGenre";

interface Context {
  selectedGenre: Genre | null;
  onUpdateGenre(genre: Genre): void;
  onUpdateOption(opt: string): void;
  selectedOption: string;
}

export const GenreContext = createContext<Context>({} as Context);

export default function GenreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedOption);

  const onUpdateGenre = useCallback(
    (genre: Genre) => setSelectedGenre(genre),
    [],
  );

  const onUpdateOption = useCallback(
    (opt: string) => setSelectedOption(opt),
    [],
  );

  return (
    <GenreContext.Provider
      value={{ selectedGenre, onUpdateGenre, onUpdateOption, selectedOption }}
    >
      {children}
    </GenreContext.Provider>
  );
}
