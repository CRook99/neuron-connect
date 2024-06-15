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
      <div className="supply_container">
        <NeuronDND imgPath={props.imgPath} type={props.type} />
        <p className="supply_title">{props.title}</p>
      </div>
    </>
  );
};

export default NeuronSupply;
