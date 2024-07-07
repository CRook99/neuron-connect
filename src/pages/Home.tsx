import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import Board from "../components/Board";
import Dock from "../components/Dock";
import Header from "../components/Header";
import HelpButton from "../components/HelpButton";
import HelpSidebar from "../components/HelpSidebar";
import { Link } from "react-router-dom";
import { NUM_COLS, NUM_ROWS } from "../utils/constants";

const Home = () => {
  const [isHelpActive, setIsHelpActive] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header>
        <HelpButton
          isHelpActive={isHelpActive}
          onClick={() => setIsHelpActive(!isHelpActive)}
        />
        <Link to="/about">
          <div>About</div>
        </Link>
      </Header>

      <HelpSidebar isHelpActive={isHelpActive} />

      <div>
        <Board rows={NUM_ROWS} cols={NUM_COLS} />
      </div>

      <Dock />
    </DndProvider>
  );
};

export default Home;
