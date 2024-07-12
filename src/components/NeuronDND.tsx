import "./NeuronDND.css";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import { Neurons } from "../data/neuronData";

interface NeuronDNDProps {
  imgPath: string;
  type: Neurons;
}

const NeuronDND = (props: NeuronDNDProps) => {
  const [, drag] = useDrag(() => ({
    type: "neuron",
    item: { props },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <>
      <motion.div ref={drag} whileHover={{ scale: 1.2 }}>
        <img src={props.imgPath} className="dnd_neuron"></img>
      </motion.div>
    </>
  );
};

export default NeuronDND;
