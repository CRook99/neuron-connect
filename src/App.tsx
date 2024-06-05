import Board from "./components/Board";
import Dock from "./components/Dock";
import Header from "./components/Header";

function App() {
  

  return (
    <>
      <Header />
      <Board rows={8} cols={8} />
      <Dock />
    </>
  );
}

export default App;
