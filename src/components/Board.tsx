import Slot from "./Slot";
import "./Board.css";
import { useState } from "react";
import { Coordinate, Direction } from "../utils/types";
import Axon from "./Axon";
import { DragContext } from "../contexts/DragContext";
import { generateAxonPath } from "../utils/generateAxonPath";

interface BoardProps {
  rows: number;
  cols: number;
}

interface AxonPath {
  path: Coordinate[];
}

const Board = (props: BoardProps) => {
  const board = [];

  // Board initialization
  for (let i = 0; i < props.rows; i++) {
    const row = [];
    for (let j = 0; j < props.cols; j++) {
      row.push(<Slot key={`r${i}c${j}`} coord={{ row: i, col: j }} />);
    }
    board.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }

  const [axons, setAxons] = useState<AxonPath[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Coordinate | null>(null);

  const handleDragStart = (coord: Coordinate, direction: Direction) => {
    setDragStart(coord);
    setIsDragging(true);
  };

  const handleDragEnd = (coord: Coordinate) => {
    if (isDragging && dragStart) {
      const newPath: Coordinate[] = generateAxonPath(dragStart, coord);
      setAxons([...axons, { path: newPath }]);
      setDragStart(null);
      setIsDragging(false);
    }
  };

  return (
    <>
      <DragContext.Provider
        value={{
          dragStart,
          axons,
          temporaryAxon: [],
          handleDragStart,
          handleDragEnd,
        }}
      >
        <div className="board-container">
          <div className="board">
            {board}
            <div className="axons">
              {axons.map((axon, index) => (
                <Axon key={index} path={axon.path} />
              ))}
            </div>
          </div>
        </div>
      </DragContext.Provider>
    </>
  );
};

export default Board;
