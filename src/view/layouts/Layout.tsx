import { Gamepad, Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="row-gap grid h-full grid-cols-1 gap-y-4 p-5 text-neutral-100 antialiased md:grid-cols-[240px_1fr] md:grid-rows-[60px_1fr]">
      <header className="md:col-span-full md:row-span-1">
        <div className="flex w-full items-center gap-4">
          <Gamepad />
          <div className="flex h-12 w-full items-center gap-2 rounded-md bg-neutral-800 p-2">
            <Search />
            <input
              placeholder="Procure por jogos..."
              className="flex-1 bg-transparent p-2 outline-none"
            />
          </div>
        </div>
      </header>
      <aside className="hidden md:block">
        <h2 className="mb-4 text-2xl font-bold">Genres</h2>
        <ul className="flex flex-col gap-0.5">
          <li className="flex gap-1">
            <img className="size-8 rounded-md" />
            <p>Action</p>
          </li>
        </ul>
      </aside>
      <main className="h-full w-full">{children}</main>
    </div>
  );
}
