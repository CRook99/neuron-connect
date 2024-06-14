import "./Dock.css";
import NeuronSupply from "./NeuronSupply";
import { Neurons } from "./Neurons";

const Dock = () => {
  return (
    <>
      <div className="dock">
        <div className="sub-neurons">
          <NeuronSupply
            title="Excitatory"
            type={Neurons.Excitatory}
            imgPath="/NeuronA.png"
          />
          <NeuronSupply
            title="Inhibitory"
            type={Neurons.Inhibitory}
            imgPath="/NeuronB.png"
          />
        </div>
        <div className="sub-tools"></div>
      </div>
    </>
  );
};

export default Dock;
