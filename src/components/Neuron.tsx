import "./Neuron.css";

import { Neurons } from "../data/neuronData";
import { Coordinate, Direction } from "../utils/types";
import { useDragContext } from "../contexts/DragContext";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  faCircleUp,
  faCircleRight,
  faCircleDown,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { neuronData } from "../data/neuronData";
import { useSimulationContext } from "../contexts/SimulationContext";

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

export const Neuron = (props: NeuronProps) => {
  const { pathStart, handleDragStart, handleDragEnd } = useDragContext();
  const [isHovered, setIsHovered] = useState(false);
  const [freqText, setFreqText] = useState("");

  const { step, frequencyGraph } = useSimulationContext();

  useEffect(() => {
    setFreqText(frequencyGraph.queryGraphForFrequency(props.coord).toString());
    console.log("update");
  }, [step]);

  const handleMouseDown = (direction: Direction) => {
    handleDragStart(props.coord, direction);
    console.log("dragstart");
  };

  const handleMouseUp = () => {
    handleDragEnd(props.coord);
    console.log("dragstart");
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
        <motion.div className="neuron">
          <img src={neuronData[props.neuronType].imgPath} />
          <p>{freqText}</p>
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
              {/* TODO change hard coded values */}
              {icons.map(({ icon, direction }, index) =>
                (direction === Direction.UP && props.coord.x == 0) ||
                (direction === Direction.DOWN && props.coord.x == 7) ||
                (direction === Direction.LEFT && props.coord.y == 0) ||
                (direction === Direction.RIGHT &&
                  props.coord.y == 11) ? null : (
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
