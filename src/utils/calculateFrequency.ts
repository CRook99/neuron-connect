import { ACTIVATION_THRESHOLD, MAXIMUM_FREQUENCY, SATURATION_THRESHOLD, SLOPE, TONIC_FREQUENCY, Y_INTERCEPT } from "../data/frequencyData";
import { Neurons } from "../data/neuronData";

export const calculateFrequency = (inputs: number[], state: Neurons): number => {
    const totalInput = inputs.reduce((sum, current) => sum + current, 0);

    let output;
    if (totalInput <= ACTIVATION_THRESHOLD) {
        output = TONIC_FREQUENCY;
    } else if (totalInput >= SATURATION_THRESHOLD) {
        output = MAXIMUM_FREQUENCY;
    } else {
        output = (SLOPE * totalInput) + Y_INTERCEPT;
    }

    output *= (state === Neurons.Excitatory ? 1 : -1);
        
    return output;
}