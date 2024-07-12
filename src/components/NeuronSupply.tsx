import { neuronData } from "../data/neuronData";
import NeuronDND from "./NeuronDND";
import "./NeuronSupply.css";
import { Neurons } from "../data/neuronData";

interface NeuronSupplyProps {
  type: Neurons;
}

const NeuronSupply = (props: NeuronSupplyProps) => {
  const data = neuronData[props.type];
  return (
    <>
      <div className="supply_container">
        <NeuronDND imgPath={data.imgPath} type={props.type} />
        <p className="supply_title">{data.title}</p>
      </div>
    </>
  );
};

export default NeuronSupply;
