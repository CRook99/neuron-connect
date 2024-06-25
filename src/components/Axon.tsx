import { useState } from "react";
import "./Axon.css";
import { Point } from "../utils/types";

interface AxonProps {
  path: Point[];
}

const Axon: React.FC<AxonProps> = ({ path }) => {
  const [signalPosition, setSignalPosition] = useState<number>(0);

  return (
    <svg className="axon">
      {path.map((segment, index) => (
        <line
          key={index}
          x1={segment.col * 50 + 25}
          y1={segment.row * 50 + 25}
          x2={(path[index + 1]?.col || segment.col) * 50 + 25}
          y2={(path[index + 1]?.row || segment.row) * 50 + 25}
          stroke="black"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
};

export default Axon;
