import Slot from "./Slot";
import "./Board.css";
import { useState } from "react";
import { Point } from "../utils/types";
import Axon from "./Axon";
import { DragContext } from "../contexts/DragContext";
import { generateAxonPath } from "../utils/generateAxonPath";

interface BoardProps {
  rows: number;
  cols: number;
}

interface AxonPath {
  path: Point[];
}

const Board = (props: BoardProps) => {
  const board = [];

  // Board initialization
  for (let i = 0; i < props.rows; i++) {
    const row = [];
    for (let j = 0; j < props.cols; j++) {
      row.push(<Slot key={`r${i}c${j}`} row={i} col={j} />);
    }
    board.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }

  const [axons, setAxons] = useState<AxonPath[]>([
    {
      path: [
        { row: 1, col: 1 },
        { row: 3, col: 1 },
        { row: 3, col: 4 },
      ],
    },
  ]);

  const [dragStart, setDragStart] = useState<Point | null>(null);
  const handleDragStart = (point: Point) => {
    setDragStart(point);
    console.log("Drag start");
  };

  const handleDragEnd = (point: Point) => {
    if (dragStart) {
      // Add neuron check

      const newPath: Point[] = generateAxonPath(dragStart, point);
      setAxons([...axons, { path: newPath }]);
      setDragStart(null);
      console.log("Drag end");
    } else {
      console.log("FUCK!");
    }
  };

  return (
    <>
      <DragContext.Provider
        value={{ dragStart, axons, handleDragStart, handleDragEnd }}
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
