import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import Board from "../components/Board";
import Dock from "../components/Dock";
import Header from "../components/Header";
import HelpSidebar from "../components/HelpSidebar";
import { Link } from "react-router-dom";
import { NUM_COLS, NUM_ROWS } from "../utils/constants";
import { useFrequencyContext } from "../contexts/FrequencyContext";
import PersistentButton from "../components/PersistentButton";

const Home = () => {
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  const { step, stepForward, stepBackward } = useFrequencyContext();

  const handleStepForward = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    stepForward();
  };

  const handleStepBackward = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault;
    stepBackward();
  };

  return (
    <>
      <Header>
        <PersistentButton
          text="Help"
          isActive={isHelpActive}
          onClick={() => setIsHelpActive(!isHelpActive)}
        />
        <PersistentButton
          text="Settings"
          isActive={isSettingsActive}
          onClick={() => setIsSettingsActive(!isSettingsActive)}
        />
        <Link to="/about">
          <div>About</div>
        </Link>
      </Header>

      <button onClick={handleStepForward}>Step forward</button>
      <button onClick={handleStepBackward}>Step backward</button>
      <p>Step: {step}</p>

      <HelpSidebar isHelpActive={isHelpActive} />

      <DndProvider backend={HTML5Backend}>
        <div>
          <Board rows={NUM_ROWS} cols={NUM_COLS} />
        </div>

        <Dock />
      </DndProvider>
    </>
  );
};

export default Home;
