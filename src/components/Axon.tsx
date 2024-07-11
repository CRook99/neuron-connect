//import { useState } from "react";
import "./Axon.css";
import { Coordinate } from "../utils/types";
import { TOTAL_SLOT_SIZE } from "../utils/constants";
import React from "react";

interface AxonProps {
  path: Coordinate[];
  isTemporary: boolean;
}

const Axon: React.FC<AxonProps> = ({ path, isTemporary }) => {
  //const [signalPosition, setSignalPosition] = useState<number>(0);

  const coord2pixel = (path: Coordinate[]) => {
    return path.map((segment) => {
      const x = segment.y * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE;
      const y = segment.x * TOTAL_SLOT_SIZE + 0.5 * TOTAL_SLOT_SIZE;

      return { x, y };
    });
  };

  const pathPixels = coord2pixel(path);

  return (
    <svg className="axon">
      {pathPixels.map((segment, index) => {
        const x1 = segment.x;
        const y1 = segment.y;
        const x2 = pathPixels[index + 1]?.x ?? segment.x;
        const y2 = pathPixels[index + 1]?.y ?? segment.y;

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
              opacity={isTemporary ? 0.5 : 1}
            />
            {pathPixels[index + 1] && (
              <image
                href="./SchwannCell.png"
                x={midX - imageSize / 2}
                y={midY - imageSize / 2}
                width={imageSize}
                height={imageSize}
                transform={`${y1 === y2 ? `rotate(90, ${midX}, ${midY})` : ""}`}
                opacity={isTemporary ? 0.3 : 0.6}
              ></image>
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default Axon;
