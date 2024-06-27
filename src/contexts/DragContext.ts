import { createContext, useContext } from "react";
import { Point } from "../utils/types";

export interface DragContextType {
  dragStart: Point | null;
  //slots: { point: Point }[];
  axons: { path: Point[] }[];
  handleDragStart: (point: Point) => void;
  handleDragEnd: (point: Point) => void;
}

export const DragContext = createContext<DragContextType | undefined>(undefined);

export const useDragContext = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) throw new Error('useDragContext used outside of DragProvider');
  return context;
}