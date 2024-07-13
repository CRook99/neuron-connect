import { createContext, useContext, ReactNode, useState } from "react";
import { FrequencyGraph } from "../classes/frequencyGraph";

interface FrequencyContextType {
  frequencyGraph: FrequencyGraph;
  step: number;
  stepForward: () => void;
  stepBackward: () => void;
}

const FrequencyContext = createContext<FrequencyContextType | null>(null);

export const useFrequencyContext = (): FrequencyContextType => {
  const context = useContext(FrequencyContext);
  if (context === null) {
    throw new Error("useFrequencyContext used outside of FrequencyProvider");
  }
  return context;
};

export const FrequencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [frequencyGraph] = useState(() => new FrequencyGraph());
  const [step, setStep] = useState(0);

  const stepForward = () => {
    frequencyGraph.step();
    setStep(step + 1);
  };

  const stepBackward = () => {
    if (step - 1 <= 0) return;
    setStep(step - 1);
  };

  return (
    <FrequencyContext.Provider
      value={{ frequencyGraph, step, stepForward, stepBackward }}
    >
      {children}
    </FrequencyContext.Provider>
  );
};
