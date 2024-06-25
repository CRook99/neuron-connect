import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";
import Board from "../components/Board";
import Dock from "../components/Dock";
import Header from "../components/Header";
import HelpButton from "../components/HelpButton";
import HelpSidebar from "../components/HelpSidebar";
import { Link, generatePath } from "react-router-dom";
import Axon from "../components/Axon";
import { Point } from "../utils/types";

interface AxonPath {
  path: Point[];
}

const Home = () => {
  const [isHelpActive, setIsHelpActive] = useState(false);

  const [axons, setAxons] = useState<AxonPath[]>([
    {
      path: [
        { row: 1, col: 1 },
        { row: 3, col: 1 },
        { row: 3, col: 4 },
      ],
    },
  ]);

  // const addAxon = (start: Point, end: Point) => {
  //   const newPath: Point[] = generatePath(start, end);
  //   setAxons([...axons, { path: newPath }]);
  // };

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

      {axons.map((axon, index) => (
        <Axon key={index} path={axon.path} />
      ))}

      <div>
        <Board rows={8} cols={8} />
      </div>

      <Dock />
    </DndProvider>
  );
};

export default Home;
