import "./Neuron.css";
import { Neurons } from "./Neurons";

interface NeuronProps {
  imgPath: string;
  neuronType: Neurons;
}

export const Neuron = (props: NeuronProps) => {
  return (
    <>
      <div className="neuron">
        <img src={props.imgPath} />
      </div>
    </>
  );
};

export default Neuron;
