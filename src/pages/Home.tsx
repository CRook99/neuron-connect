import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import Board from "../components/Board";
import Dock from "../components/Dock";
import Header from "../components/Header";
import HelpSidebar from "../components/HelpSidebar";
import { Link } from "react-router-dom";
import { NUM_COLS, NUM_ROWS } from "../utils/constants";
import PersistentButton from "../components/PersistentButton";
import SettingsSidebar from "../components/SettingsSidebar";

const Home = () => {
  const [isHelpActive, setIsHelpActive] = useState(false);
  const [isSettingsActive, setIsSettingsActive] = useState(false);

  return (
    <>
      <Header>
        <PersistentButton
          text="Help"
          isActive={isHelpActive}
          onClick={() => {
            setIsHelpActive(!isHelpActive);
            setIsSettingsActive(false);
          }}
        />
        <PersistentButton
          text="Settings"
          isActive={isSettingsActive}
          onClick={() => {
            setIsSettingsActive(!isSettingsActive);
            setIsHelpActive(false);
          }}
        />
        <Link to="/about">
          <div>About</div>
        </Link>
      </Header>

      <HelpSidebar isActive={isHelpActive} />
      <SettingsSidebar isActive={isSettingsActive} />

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
