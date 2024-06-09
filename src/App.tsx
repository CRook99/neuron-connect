import Board from "./components/Board";
import Dock from "./components/Dock";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HelpSidebar from "./components/HelpSidebar";
import { useState } from "react";
import HelpButton from "./components/HelpButton";

function App() {
  const [isHelpActive, setIsHelpActive] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header>
        <HelpButton
          isHelpActive={isHelpActive}
          onClick={() => setIsHelpActive(!isHelpActive)}
        />
      </Header>
      <HelpSidebar isHelpActive={isHelpActive} />
      <div>
        <Board rows={8} cols={8} />
      </div>
    </DndProvider>
  );
}

export default App;
