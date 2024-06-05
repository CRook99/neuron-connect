import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  

  return (
    <>
      <Header />
      <Board rows={8} cols={8} />
    </>
  );
}

export default App;
