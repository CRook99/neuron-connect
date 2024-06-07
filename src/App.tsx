import Board from "./components/Board";
import Dock from "./components/Dock";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import HelpSidebar from "./components/HelpSidebar";

import { useState } from "react";

function App() {
  // const temp: React.CSSProperties = {
  //   position: "absolute",
  //   left: "15%",
  //   top: "50%",
  //   transform: "translate(0%, -50%)",
  // };

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
