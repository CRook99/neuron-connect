import "./Dock.css";
import NeuronSupply from "./NeuronSupply";
import { Neurons } from "../data/neuronData";
import SimulationButton from "./SimulationButton";
import { useSimulationContext } from "../contexts/FrequencyContext";

const Dock = () => {
  const { step, stepForward, stepBackward } = useSimulationContext();
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
          {step == 0 ? (
            <SimulationButton
              label="Play"
              onClick={() => console.log("Play!")}
              svgPath="/svg/play-solid.svg"
            />
          ) : (
            <SimulationButton
              label={step.toString()}
              onClick={() => console.log("Play!")}
              svgPath="/svg/play-solid.svg"
            />
          )}
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
