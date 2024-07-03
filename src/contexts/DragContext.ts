import { createContext, useContext } from "react";
import { Coordinate } from "../utils/types";

export interface DragContextType {
  dragStart: Coordinate | null;
  axons: { path: Coordinate[] }[];
  handleDragStart: (point: Coordinate) => void;
  handleDragEnd: (point: Coordinate) => void;
}

export const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) throw new Error('useDragContext used outside of DragProvider');
  return context;
}