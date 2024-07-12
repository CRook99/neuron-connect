import "./Dock.css";
import NeuronSupply from "./NeuronSupply";
import { Neurons } from "../data/neuronData";

const Dock = () => {
  return (
    <>
      <div className="dock">
        <div className="sub-neurons">
          {Object.keys(Neurons).map((neuronType) => (
            <NeuronSupply key={neuronType} type={neuronType as Neurons} />
          ))}
        </div>
        <div className="sub-tools"></div>
      </div>
    </>
  );
};

export default Dock;
