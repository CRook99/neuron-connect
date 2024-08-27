import { FC } from "react";
import { Coordinate } from "../utils/types";
import { Neurons } from "../data/neuronData";
import Neuron from "./Neuron";
import { MAXIMUM_FREQUENCY } from "../data/frequencyData";

interface StimulusProps {
  coord: Coordinate;
}

export const Stimulus: FC<StimulusProps> = ({ coord }) => {
  return (
    <Neuron
      neuronType={Neurons.Stimulus}
      coord={coord}
      pFrequency={MAXIMUM_FREQUENCY}
    />
  );
};
