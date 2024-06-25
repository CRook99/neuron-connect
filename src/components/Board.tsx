import Slot from "./Slot";
import "./Board.css";
import { useState } from "react";
import { Point } from "../utils/types";
import Axon from "./Axon";

interface BoardProps {
  rows: number;
  cols: number;
}

interface AxonPath {
  path: Point[];
}

const Board = (props: BoardProps) => {
  const board = [];

  for (let i = 0; i < props.rows; i++) {
    const row = [];
    for (let j = 0; j < props.cols; j++) {
      row.push(<Slot key={`r${i}c${j}`} />);
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

  return (
    <>
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
    </>
  );
};

export default Board;
