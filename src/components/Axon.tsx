//import { useState } from "react";
import "./Axon.css";
import { Coordinate } from "../utils/types";
import { TOTAL_SLOT_SIZE } from "../utils/constants";

interface AxonProps {
  path: Coordinate[];
}

const Axon: React.FC<AxonProps> = ({ path }) => {
  //const [signalPosition, setSignalPosition] = useState<number>(0);

  return (
    <svg className="axon">
      {path.map((segment, index) => (
        <line
          key={index}
          x1={segment.y * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE}
          y1={segment.x * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE}
          x2={
            (path[index + 1]?.y || segment.y) * TOTAL_SLOT_SIZE +
            0.5 * TOTAL_SLOT_SIZE
          }
          y2={
            (path[index + 1]?.x || segment.x) * TOTAL_SLOT_SIZE +
            0.5 * TOTAL_SLOT_SIZE
          }
          stroke="grey"
          strokeLinecap="round"
          strokeWidth="5"
        />
      ))}
    </svg>
  );
};

export default Axon;
