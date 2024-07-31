import "./Dock.css";
import NeuronSupply from "./NeuronSupply";
import { Neurons } from "../data/neuronData";
import SimulationButton from "./SimulationButton";
import { useFrequencyContext } from "../contexts/FrequencyContext";

const Dock = () => {
  const { stepForward, stepBackward } = useFrequencyContext();
  return (
    <>
      <div className="dock">
        <div className="sub-neurons">
          {Object.keys(Neurons).map((neuronType) => (
            <NeuronSupply key={neuronType} type={neuronType as Neurons} />
          ))}
        </div>
        <div className="sub-tools"></div>
        <div className="sub-simulation">
          <SimulationButton
            label="Step Backward"
            onClick={stepBackward}
            svgPath="/svg/backward-step-solid.svg"
          />
          <SimulationButton
            label="Play"
            onClick={() => console.log("Play!")}
            svgPath="/svg/play-solid.svg"
          />
          <SimulationButton
            label="Step Forward"
            onClick={stepForward}
            svgPath="/svg/forward-step-solid.svg"
          />
        </div>
      </div>
    </>
  );
};

export default Dock;
