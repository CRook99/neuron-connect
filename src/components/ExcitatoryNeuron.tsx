import { Neurons } from "./Neurons";
import { Neuron } from "./Neuron";

const ExcitatoryNeuron = () => {
  return <Neuron imgPath="./NeuronA.png" neuronType={Neurons.Excitatory} />;
};

export default ExcitatoryNeuron;
