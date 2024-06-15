import "./NeuronDND.css";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import { Neurons } from "./Neurons";

interface NeuronDNDProps {
  imgPath: string;
  type: Neurons;
}

const NeuronDND = (props: NeuronDNDProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "neuron",
    item: { type: props.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <>
      <motion.div ref={drag} style={style} whileHover={{ scale: 1.2 }}>
        <img src={props.imgPath} className="dnd_neuron"></img>
      </motion.div>
    </>
  );
};

export default NeuronDND;
