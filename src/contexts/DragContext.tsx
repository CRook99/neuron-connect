import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Coordinate, Direction } from "../utils/types";
import { augmentCoordWithDir } from "../utils/augmentCoordWithDir";
import { useGraphContext } from "./GraphContext";

interface DragContextType {
  startNeuron: Coordinate | null;
  pathStart: Coordinate | null;
  outDirection: Direction;
  axons: Coordinate[][];
  temporaryAxon: Coordinate[];
  handleNewHover: (point: Coordinate, onNeuron: boolean) => void;
  handleDragStart: (point: Coordinate, outDirection: Direction) => void;
  handleDragEnd: (point: Coordinate) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) throw new Error("useDragContext used outside of DragProvider");
  return context;
};

export const DragProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [startNeuron, setStartNeuron] = useState<Coordinate | null>(null);
  const [pathStart, setPathStart] = useState<Coordinate | null>(null);
  const [outDirection, setOutDirection] = useState<Direction>(Direction.null);
  const [axons, setAxons] = useState<Coordinate[][]>([]);
  const [tempAxon, setTempAxon] = useState<Coordinate[]>([]);
  const [onNeuron, setOnNeuron] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);

  const graph = useGraphContext();

  const handleDragStart = (coord: Coordinate, direction: Direction) => {
    setStartNeuron(coord);
    setPathStart(augmentCoordWithDir(coord, direction));
    setOutDirection(direction);
    setIsDragging(true);
  };

  const handleDragEnd = (coord: Coordinate) => {
    if (!isDragging || !pathStart) return;

    if (onNeuron) {
      const newPath: Coordinate[] | null = graph.bfs(
        pathStart,
        coord,
        outDirection
      );
      if (newPath) {
        console.log("Axon created");
        newPath.unshift(startNeuron!);
        setAxons([...axons, newPath]);
        for (let c of newPath) {
          graph.setOccupancy(c, "Axon");
        }
      }
    }

    // Reset dragging context
    setStartNeuron(null);
    setPathStart(null);
    setOutDirection(Direction.null);
    setTempAxon([]);
    setIsDragging(false);
  };

  const handleNewHover = (coord: Coordinate, isOnNeuron: boolean) => {
    if (isDragging && pathStart) {
      const newPath: Coordinate[] | null = graph.bfs(
        pathStart,
        coord,
        outDirection
      );
      if (newPath) {
        newPath.unshift(startNeuron!);
        setTempAxon(newPath);
        setOnNeuron(isOnNeuron);
      } else {
        setTempAxon([]);
      }
    }
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
    <DragContext.Provider
      value={{
        startNeuron,
        pathStart,
        outDirection,
        axons,
        temporaryAxon: tempAxon,
        handleNewHover,
        handleDragStart,
        handleDragEnd,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};
