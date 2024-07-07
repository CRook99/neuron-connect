import { createContext, useContext } from "react";
import { Coordinate, Direction } from "../utils/types";

export interface DragContextType {
  startNeuron: Coordinate | null;
  pathStart: Coordinate | null;
  outDirection: Direction;
  axons: Coordinate[][];
  temporaryAxon: Coordinate[];
  handleNewHover: (point: Coordinate, onNeuron: boolean) => void;
  handleDragStart: (point: Coordinate, outDirection: Direction) => void;
  handleDragEnd: (point: Coordinate) => void;
}

export const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) throw new Error('useDragContext used outside of DragProvider');
  return context;
}