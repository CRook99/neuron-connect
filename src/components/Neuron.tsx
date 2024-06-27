import "./Neuron.css";
import { Neurons } from "./Neurons";
import { motion } from "framer-motion";
import { useDragContext } from "../contexts/DragContext";
import { Coordinate } from "../utils/types";

interface NeuronProps {
  neuronType: Neurons;
  coord: Coordinate;
}

const imageMap = {
  [Neurons.Excitatory]: "./NeuronA.png",
  [Neurons.Inhibitory]: "./NeuronB.png",
};

export const Neuron = (props: NeuronProps) => {
  const { handleDragStart, handleDragEnd } = useDragContext();

  const handleMouseDown = () => {
    handleDragStart(props.coord);
  };

  const handleMouseUp = () => {
    handleDragEnd(props.coord);
  };

  const imageSrc = imageMap[props.neuronType];

  return (
    <>
      <motion.div
        className="neuron"
        whileHover={{ scale: 1.1 }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <img src={imageSrc} />
      </motion.div>
    </>
  );
};

export default Neuron;
