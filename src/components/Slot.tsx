import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import Neuron from "./Neuron";
import { Neurons } from "./Neurons";

const Slot = () => {
  const [neuron, setNeuron] = useState<React.ReactElement | null>(null);

  const addNeuron = () => {
    setNeuron(
      <Neuron imgPath="./NeuronA.png" neuronType={Neurons.Excitatory}></Neuron>
    );
  };

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item) => addNeuron(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const style = {
    transition: "background-color 0.1s ease",
    backgroundColor: isOver ? "#e4d2cb" : "#F4EDEA",
  };

  return (
    <>
      <div className="slot" ref={drop} style={style}>
        {neuron ? <>{neuron}</> : <img className="peg" src="./Peg.png" />}
      </div>
    </>
  );
};

export default Slot;
