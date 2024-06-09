import Board from "./components/Board";
import Dock from "./components/Dock";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HelpSidebar from "./components/HelpSidebar";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <HelpSidebar />
      <div>
        <Board rows={8} cols={8} />
      </div>
    </DndProvider>
  );
}

export default App;
