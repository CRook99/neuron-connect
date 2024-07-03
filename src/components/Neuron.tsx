import "./Neuron.css";

import { Neurons } from "./Neurons";
import { Coordinate } from "../utils/types";
import { useDragContext } from "../contexts/DragContext";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  faCircleUp,
  faCircleRight,
  faCircleDown,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NeuronProps {
  neuronType: Neurons;
  coord: Coordinate;
}

const imageMap = {
  [Neurons.Excitatory]: "./NeuronA.png",
  [Neurons.Inhibitory]: "./NeuronB.png",
};

const icons = [
  { icon: faCircleUp, className: "top" },
  { icon: faCircleDown, className: "bottom" },
  { icon: faCircleLeft, className: "left" },
  { icon: faCircleRight, className: "right" },
];

export const Neuron = (props: NeuronProps) => {
  const { handleDragStart, handleDragEnd } = useDragContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (direction: string) => {
    let extension = () => {
      switch (direction) {
        case "top":
          return { row: props.coord.row - 1, col: props.coord.col };
        case "bottom":
          return { row: props.coord.row + 1, col: props.coord.col };
        case "left":
          return { row: props.coord.row, col: props.coord.col - 1 };
        case "right":
          return { row: props.coord.row, col: props.coord.col + 1 };
        default:
          return null;
      }
    };
    handleDragStart(props.coord);
    console.log("dragstart");
  };

  const handleMouseUp = () => {
    handleDragEnd(props.coord);
    console.log("dragstart");
  };

  const imageSrc = imageMap[props.neuronType];

  return (
    <>
      <motion.div
        className="neuron-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        onMouseUp={handleMouseUp}
      >
        <motion.div className="neuron">
          <img src={imageSrc} />
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="icons-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {icons.map(({ icon, className }, index) =>
                (className === "top" && props.coord.row == 0) ||
                (className === "bottom" && props.coord.row == 7) ||
                (className === "left" && props.coord.col == 0) ||
                (className === "right" && props.coord.col == 11) ? null : (
                  <motion.div
                    key={index}
                    className={`icon ${className}`}
                    whileHover={{ scale: 1.2 }}
                    onMouseDown={() => handleMouseDown(className)}
                  >
                    <FontAwesomeIcon icon={icon} />
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Neuron;
