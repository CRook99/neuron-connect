import Slot from "./Slot";
import "./Board.css";
import { useEffect, useState } from "react";
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
  const [tempAxon, setTempAxon] = useState<AxonPath>({ path: [] });
  const [onNeuron, setOnNeuron] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Coordinate | null>(null);

  const handleNewHover = (coord: Coordinate, isOnNeuron: boolean) => {
    if (isDragging && dragStart) {
      const newPath: Coordinate[] = generateAxonPath(dragStart, coord);
      setTempAxon({ path: newPath });
      setOnNeuron(isOnNeuron);
    }
  };

  const handleDragStart = (coord: Coordinate, direction: Direction) => {
    setDragStart(coord);
    setIsDragging(true);
  };

  const handleDragEnd = (coord: Coordinate) => {
    if (!isDragging || !dragStart) return;

    if (onNeuron) {
      const newPath: Coordinate[] = generateAxonPath(dragStart, coord);
      setAxons([...axons, { path: newPath }]);
    }

    // Reset dragging context
    setTempAxon({ path: [] });
    setDragStart(null);
    setIsDragging(false);
  };

  // MouseUp listener to handle failed axon draws
  useEffect(() => {
    const handleMouseUp = () => {
      handleDragEnd({ row: -1, col: -1 });
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <>
      <DragContext.Provider
        value={{
          dragStart,
          axons,
          temporaryAxon: [],
          handleNewHover,
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
              <Axon path={tempAxon.path} />
            </div>
          </div>
        </div>
      </DragContext.Provider>
    </>
  );
};

export default Board;
