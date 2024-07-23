export enum Neurons {
  Excitatory = "Excitatory",
  Inhibitory = "Inhibitory",
  Stimulus = "Stimulus",
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
  [Neurons.Stimulus]: {
    imgPath: "./Stimulus.png",
    title: "Stimulus",
  },
};
