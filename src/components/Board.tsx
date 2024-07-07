import Slot from "./Slot";
import "./Board.css";
import { useEffect, useState } from "react";
import { Coordinate, Direction } from "../utils/types";
import Axon from "./Axon";
import { DragContext } from "../contexts/DragContext";
import { generateAxonPath } from "../utils/generateAxonPath";
import { augmentCoordWithDir } from "../utils/augmentCoordWithDir";

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
      row.push(<Slot key={`r${i}c${j}`} coord={{ row: i, col: j }} />);
    }
    board.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }

  const [startNeuron, setStartNeuron] = useState<Coordinate | null>(null);
  const [pathStart, setPathStart] = useState<Coordinate | null>(null);
  const [outDirection, setOutDirection] = useState<Direction>(Direction.null);
  const [axons, setAxons] = useState<Coordinate[][]>([]);
  const [tempAxon, setTempAxon] = useState<Coordinate[]>([]);
  const [onNeuron, setOnNeuron] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleNewHover = (coord: Coordinate, isOnNeuron: boolean) => {
    if (isDragging && pathStart) {
      const newPath: Coordinate[] = generateAxonPath(pathStart, coord);
      setTempAxon(newPath);
      setOnNeuron(isOnNeuron);
    }
  };

  const handleDragStart = (coord: Coordinate, direction: Direction) => {
    setStartNeuron(coord);
    setPathStart(augmentCoordWithDir(coord, direction));
    setOutDirection(direction);
    setIsDragging(true);
  };

  const handleDragEnd = (coord: Coordinate) => {
    if (!isDragging || !pathStart) return;

    if (onNeuron) {
      const newPath: Coordinate[] = generateAxonPath(pathStart, coord);
      setAxons([...axons, newPath]);
    }

    // Reset dragging context
    setStartNeuron(null);
    setPathStart(null);
    setOutDirection(Direction.null);
    setTempAxon([]);
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
          startNeuron,
          pathStart,
          outDirection,
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
                <Axon key={index} path={axon} />
              ))}
              <Axon path={tempAxon} />
            </div>
          </div>
        </div>
      </DragContext.Provider>
    </>
  );
};

export default Board;
