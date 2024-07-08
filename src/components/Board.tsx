import Slot from "./Slot";
import "./Board.css";
import Axon from "./Axon";
import { DragProvider, useDragContext } from "../contexts/DragContext";

interface BoardProps {
  rows: number;
  cols: number;
}

const Board = (props: BoardProps) => {
  const board = [];

  // Board initialization
  for (let i = 0; i < props.rows; i++) {
    const row = [];
    for (let j = 0; j < props.cols; j++) {
      row.push(<Slot key={`r${i}c${j}`} coord={{ x: i, y: j }} />);
    }
    board.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }

  const { axons, temporaryAxon } = useDragContext();

  return (
    <>
      <div className="board-container">
        <div className="board">
          {board}
          <div className="axons">
            {axons.map((axon, index) => (
              <Axon key={index} path={axon} />
            ))}
            <Axon path={temporaryAxon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
