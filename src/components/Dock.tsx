import "./Dock.css";
import NeuronSupply from "./NeuronSupply";
import { Neurons } from "../data/neuronData";
import SimulationButton from "./SimulationButton";
import { useSimulationContext } from "../contexts/SimulationContext";

const Dock = () => {
  const { step, stepForward, stepBackward, playing, beginSimulation } =
    useSimulationContext();
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
          {!playing ? (
            <SimulationButton
              label="Play"
              onClick={beginSimulation}
              svgPath="/svg/play-solid.svg"
            />
          ) : (
            <SimulationButton
              label={step.toString()}
              onClick={() => console.log("Stop!")}
              svgPath="/svg/square-solid.svg"
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
