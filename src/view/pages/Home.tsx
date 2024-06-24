import GameGrid from "../components/GameGrid";
import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <h1 className="-mt-2 text-nowrap text-4xl font-bold">
        PC Simulation Games
      </h1>

      <GameGrid />
    </Layout>
  );
}
