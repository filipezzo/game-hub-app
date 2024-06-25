import GenreProvider from "./app/services/api/context/GenreProvider";
import Home from "./view/pages/Home";

function App() {
  return (
    <GenreProvider>
      <Home />
    </GenreProvider>
  );
}

export default App;
