import { Neurons } from "./Neurons";
import { Neuron } from "./Neuron";

const InhibitoryNeuron = () => {
  return <Neuron imgPath="./NeuronB.png" neuronType={Neurons.Inhibitory} />;
};

export default InhibitoryNeuron;
