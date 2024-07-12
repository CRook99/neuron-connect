export enum Neurons {
  Excitatory = "Excitatory",
  Inhibitory = "Inhibitory",
}

export const neuronData = {
  [Neurons.Excitatory]: {
    imgPath: "./ExcitatoryNeuron.png",
    title: "Excitatory",
  },
  [Neurons.Inhibitory]: {
    imgPath: "./InhibitoryNeuron.png",
    title: "Inhibitory",
  },
};
