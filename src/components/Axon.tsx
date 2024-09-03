//import { useState } from "react";
import "./Axon.css";
import { Coordinate } from "../utils/types";
import { getTotalSlotSize } from "../utils/constants";
import React from "react";

interface AxonProps {
  path: Coordinate[];
  isTemporary: boolean;
}

const Axon: React.FC<AxonProps> = ({ path, isTemporary }) => {
  const coord2pixel = (path: Coordinate[]) => {
    return path.map((segment) => {
      const x = segment.y * getTotalSlotSize() + 0.5 * getTotalSlotSize();
      const y = segment.x * getTotalSlotSize() + 0.5 * getTotalSlotSize();
      return { x, y };
    });
  };

  const getDirection = (x1: number, y1: number, x2: number, y2: number) => {
    if (x2 > x1) return 90; // East
    if (x2 < x1) return 270; // West
    if (y2 > y1) return 180; // South
    if (y2 < y1) return 0; // North
    return 0; // Default
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
              <svg
                x={midX}
                y={midY}
                style={{ transform: `rotate(${getDirection(x1, y1, x2, y2)})` }}
              >
                <path
                  d="M9 18l6-6-6-6"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default Axon;
