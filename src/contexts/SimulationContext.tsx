import { createContext, useContext, ReactNode, useState } from "react";
import { FrequencyGraph } from "../classes/frequencyGraph";

interface SimulationContextType {
  frequencyGraph: FrequencyGraph;
  step: number;
  stepForward: () => void;
  stepBackward: () => void;
  playing: boolean;
  beginSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | null>(null);

export const useSimulationContext = (): SimulationContextType => {
  const context = useContext(SimulationContext);
  if (context === null) {
    throw new Error("useFrequencyContext used outside of FrequencyProvider");
  }
  return context;
};

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [frequencyGraph] = useState(() => new FrequencyGraph());
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [playing, setPlaying] = useState(false);

  const stepForward = () => {
    if (step + 1 >= maxStep) {
      // Unseen step
      setMaxStep(step + 1);
      frequencyGraph.generateNextStep();
      frequencyGraph.storeStep(step + 1);
    } else {
      // Previously seen step
      frequencyGraph.loadStep(step + 1);
    }
    setStep(step + 1);
  };

  const stepBackward = () => {
    if (step - 1 <= 0) return;
    frequencyGraph.loadStep(step - 1);
    setStep(step - 1);
  };

  const beginSimulation = () => {
    setPlaying(true);
    frequencyGraph.storeStep(step);
  };

  return (
    <SimulationContext.Provider
      value={{
        frequencyGraph,
        step,
        stepForward,
        stepBackward,
        playing,
        beginSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
