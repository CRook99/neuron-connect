import "./Neuron.css";

import { Neurons } from "../data/neuronData";
import { Coordinate, Direction } from "../utils/types";
import { useDragContext } from "../contexts/DragContext";

import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import {
  faCircleUp,
  faCircleRight,
  faCircleDown,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { neuronData } from "../data/neuronData";
import { useSimulationContext } from "../contexts/SimulationContext";
import { NUM_COLS, NUM_ROWS } from "../utils/constants";

interface NeuronProps {
  neuronType: Neurons;
  coord: Coordinate;
}

const icons = [
  { icon: faCircleUp, direction: Direction.UP },
  { icon: faCircleDown, direction: Direction.DOWN },
  { icon: faCircleLeft, direction: Direction.LEFT },
  { icon: faCircleRight, direction: Direction.RIGHT },
];

export const Neuron: FC<NeuronProps> = ({ neuronType, coord }) => {
  const { pathStart, handleDragStart, handleDragEnd } = useDragContext();
  const { step, frequencyGraph, playing } = useSimulationContext();

  const controls = useAnimation();

  const [isHovered, setIsHovered] = useState(false);
  const [frequency, setFrequency] = useState(0);

  useEffect(() => {
    setFrequency(frequencyGraph.queryGraphForFrequency(coord));

    controls.start({
      scale: [1, 1.5, 1, 1],
      transition: {
        duration: 1 / frequency,
        times: [0, 0.05, 0.5, 1],
        repeat: Infinity,
      },
    });
  }, [step]);

  const handleMouseDown = (direction: Direction) => {
    handleDragStart(coord, direction);
  };

  const handleMouseUp = () => {
    handleDragEnd(coord);
  };

  const canHaveEdgeArrow = (direction: Direction) => {
    const conditions = {
      [Direction.UP]: coord.x !== 0,
      [Direction.DOWN]: coord.x !== NUM_ROWS - 1,
      [Direction.LEFT]: coord.y !== 0,
      [Direction.RIGHT]: coord.y !== NUM_COLS - 1,
      [Direction.null]: false,
    };

    return conditions[direction] ?? false;
  };

  return (
    <>
      <motion.div
        className="neuron-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.2 }}
        onMouseUp={handleMouseUp}
      >
        <motion.div
          className="neuron"
          animate={controls}
          initial={{ scale: 1 }}
        >
          <img src={neuronData[neuronType].imgPath} />
          {playing && <p>{frequency.toString()}</p>}
        </motion.div>
        <AnimatePresence>
          {isHovered && !pathStart && (
            <motion.div
              className="icons-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {icons.map(({ icon, direction }, index) =>
                !canHaveEdgeArrow(direction) ? null : (
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
