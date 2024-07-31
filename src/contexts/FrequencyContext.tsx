import { createContext, useContext, ReactNode, useState } from "react";
import { FrequencyGraph } from "../classes/frequencyGraph";

interface SimulationContextType {
  frequencyGraph: FrequencyGraph;
  step: number;
  stepForward: () => void;
  stepBackward: () => void;
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
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);

  const stepForward = () => {
    frequencyGraph.setStep();
    setStep(step + 1);
    setMaxStep(step);
  };

  const stepBackward = () => {
    if (step - 1 <= 0) return;
    setStep(step - 1);
  };

  return (
    <SimulationContext.Provider
      value={{ frequencyGraph, step, stepForward, stepBackward }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
