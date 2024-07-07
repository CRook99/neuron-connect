import Slot from "./Slot";
import "./Board.css";
import { useEffect, useState } from "react";
import { Coordinate, Direction } from "../utils/types";
import Axon from "./Axon";
import { DragContext } from "../contexts/DragContext";
import { generateAxonPath } from "../utils/generateAxonPath";
import { augmentCoordWithDir } from "../utils/augmentCoordWithDir";
import { GraphProvider, useGraphContext } from "../contexts/GraphContext";

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

  const [startNeuron, setStartNeuron] = useState<Coordinate | null>(null);
  const [pathStart, setPathStart] = useState<Coordinate | null>(null);
  const [outDirection, setOutDirection] = useState<Direction>(Direction.null);
  const [axons, setAxons] = useState<Coordinate[][]>([]);
  const [tempAxon, setTempAxon] = useState<Coordinate[]>([]);
  const [onNeuron, setOnNeuron] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const graph = useGraphContext();

  const handleNewHover = (coord: Coordinate, isOnNeuron: boolean) => {
    if (isDragging && startNeuron) {
      const newPath: Coordinate[] | null = graph.bfs(startNeuron, coord);
      if (newPath) {
        setTempAxon(newPath);
        setOnNeuron(isOnNeuron);
      } else {
        setTempAxon([]);
      }
    }
  };

  const handleDragStart = (coord: Coordinate, direction: Direction) => {
    setStartNeuron(coord);
    setOutDirection(direction);
    setIsDragging(true);
    console.log("handledragstart");
  };

  const handleDragEnd = (coord: Coordinate) => {
    if (!isDragging || !startNeuron) return;

    if (onNeuron) {
      const newPath: Coordinate[] | null = graph.bfs(startNeuron, coord);
      if (newPath) {
        setAxons([...axons, newPath]);
      }
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
      handleDragEnd({ x: -1, y: -1 });
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
        <GraphProvider rows={props.rows} cols={props.cols}>
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
        </GraphProvider>
      </DragContext.Provider>
    </>
  );
};

export default Board;
