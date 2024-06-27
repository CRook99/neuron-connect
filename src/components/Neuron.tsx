import { useContext } from "react";
import "./Neuron.css";
import { Neurons } from "./Neurons";
import { motion } from "framer-motion";
import { DragContext, useDragContext } from "../contexts/DragContext";
import { Point } from "../utils/types";

interface NeuronProps {
  imgPath: string;
  neuronType: Neurons;
  point: Point;
}

export const Neuron = (props: NeuronProps) => {
  const { handleDragStart, handleDragEnd } = useDragContext();

  const handleMouseDown = () => {
    handleDragStart(props.point);
  };

  const handleMouseUp = () => {
    handleDragEnd(props.point);
  };

  return (
    <>
      <motion.div
        className="neuron"
        whileHover={{ scale: 1.1 }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <img src={props.imgPath} />
      </motion.div>
    </>
  );
};

export default Neuron;
