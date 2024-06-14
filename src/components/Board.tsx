import Slot from "./Slot";
import "./Board.css";

interface BoardProps {
  rows: number;
  cols: number;
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

  return (
    <>
      <div className="board-container">
        <div className="board">{board}</div>
      </div>
    </>
  );
};

export default Board;
