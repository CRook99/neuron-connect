//import { useState } from "react";
import "./Axon.css";
import { Point } from "../utils/types";
import { TOTAL_SLOT_SIZE } from "../utils/constants";

interface AxonProps {
  path: Point[];
}

const Axon: React.FC<AxonProps> = ({ path }) => {
  //const [signalPosition, setSignalPosition] = useState<number>(0);

  return (
    <svg className="axon">
      {path.map((segment, index) => (
        <line
          key={index}
          x1={segment.col * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE}
          y1={segment.row * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE}
          x2={
            (path[index + 1]?.col || segment.col) * TOTAL_SLOT_SIZE +
            0.5 * TOTAL_SLOT_SIZE
          }
          y2={
            (path[index + 1]?.row || segment.row) * TOTAL_SLOT_SIZE +
            0.5 * TOTAL_SLOT_SIZE
          }
          stroke="aqua"
          strokeLinecap="round"
          strokeWidth="5"
        />
      ))}
    </svg>
  );
};

export default Axon;
