import "./Neuron.css";
import { Neurons } from "./Neurons";
import { motion } from "framer-motion";

interface NeuronProps {
  imgPath: string;
  neuronType: Neurons;
}

export const Neuron = (props: NeuronProps) => {
  return (
    <>
      <motion.div className="neuron" whileHover={{ scale: 1.1 }}>
        <img src={props.imgPath} />
      </motion.div>
    </>
  );
};

export default Neuron;
