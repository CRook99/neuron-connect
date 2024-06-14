import NeuronDND from "./NeuronDND";
import "./NeuronSupply.css";
import { Neurons } from "./Neurons";

interface NeuronSupplyProps {
  title: string;
  type: Neurons;
  imgPath: string;
}

const NeuronSupply = (props: NeuronSupplyProps) => {
  return (
    <>
      <div className="neuron-container">
        <NeuronDND imgPath={props.imgPath} type={props.type} />
        <p className="title">{props.title}</p>
      </div>
    </>
  );
};

export default NeuronSupply;
