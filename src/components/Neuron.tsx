import "./Neuron.css";

import { Neurons } from "./Neurons";
import { Coordinate, Direction } from "../utils/types";
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
  { icon: faCircleUp, direction: Direction.UP },
  { icon: faCircleDown, direction: Direction.DOWN },
  { icon: faCircleLeft, direction: Direction.LEFT },
  { icon: faCircleRight, direction: Direction.RIGHT },
];

export const Neuron = (props: NeuronProps) => {
  const { dragStart, handleDragStart, handleDragEnd } = useDragContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown = (direction: Direction) => {
    let extension = () => {
      switch (direction) {
        case Direction.UP:
          return { row: props.coord.row - 1, col: props.coord.col };
        case Direction.DOWN:
          return { row: props.coord.row + 1, col: props.coord.col };
        case Direction.LEFT:
          return { row: props.coord.row, col: props.coord.col - 1 };
        case Direction.RIGHT:
          return { row: props.coord.row, col: props.coord.col + 1 };
        default:
          return null;
      }
    };
    handleDragStart(props.coord, direction);
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
          {isHovered && !dragStart && (
            <motion.div
              className="icons-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* TODO change hard coded values */}
              {icons.map(({ icon, direction }, index) =>
                (direction === Direction.UP && props.coord.row == 0) ||
                (direction === Direction.DOWN && props.coord.row == 7) ||
                (direction === Direction.LEFT && props.coord.col == 0) ||
                (direction === Direction.RIGHT &&
                  props.coord.col == 11) ? null : (
                  <motion.div
                    key={index}
                    className={`icon ${direction}`}
                    whileHover={{ scale: 1.2 }}
                    onMouseDown={() => handleMouseDown(direction)}
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
