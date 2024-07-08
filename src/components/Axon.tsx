//import { useState } from "react";
import "./Axon.css";
import { Coordinate } from "../utils/types";
import { TOTAL_SLOT_SIZE } from "../utils/constants";
import React from "react";

interface AxonProps {
  path: Coordinate[];
}

const Axon: React.FC<AxonProps> = ({ path }) => {
  //const [signalPosition, setSignalPosition] = useState<number>(0);

  return (
    <svg className="axon">
      {path.map((segment, index) => {
        const x1 = segment.y * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE;
        const y1 = segment.x * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE;
        const x2 =
          (path[index + 1]?.y ?? segment.y) * TOTAL_SLOT_SIZE +
          0.5 * TOTAL_SLOT_SIZE;
        const y2 =
          (path[index + 1]?.x ?? segment.x) * TOTAL_SLOT_SIZE +
          0.5 * TOTAL_SLOT_SIZE;

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const imageSize = TOTAL_SLOT_SIZE * 0.9;

        return (
          <React.Fragment key={index}>
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FF9900"
              strokeLinecap="round"
              strokeWidth="5"
            />
            {path[index + 1] && (
              <image
                href="./SchwannCell.png"
                x={midX - imageSize / 2}
                y={midY - imageSize / 2}
                width={imageSize}
                height={imageSize}
                transform={`${y1 === y2 ? `rotate(90, ${midX}, ${midY})` : ""}`}
                opacity={0.6}
              ></image>
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default Axon;
