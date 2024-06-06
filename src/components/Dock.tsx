import "./Dock.css";
import NeuronSupply from "./NeuronSupply";

const Dock = () => {
  return (
    <>
      <div className="dock">
        <div className="sub-neurons">
          <NeuronSupply
            title="Neuron A"
            type="neuron-a"
            imgPath="/NeuronA.png"
          />
          <NeuronSupply
            title="Neuron B"
            type="neuron-b"
            imgPath="/NeuronB.png"
          />
          <NeuronSupply
            title="Neuron C"
            type="neuron-c"
            imgPath="/NeuronC.png"
          />
        </div>
        <div className="sub-tools"></div>
      </div>
    </>
  );
};

export default Dock;
