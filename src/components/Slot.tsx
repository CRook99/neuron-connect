import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import Neuron from "./Neuron";
import { Neurons } from "./Neurons";
import ExcitatoryNeuron from "./ExcitatoryNeuron";
import InhibitoryNeuron from "./InhibitoryNeuron";

const Slot = () => {
  const [neuron, setNeuron] = useState<React.ReactElement | null>(null);

  const addNeuron = (type: Neurons) => {
    switch (type) {
      case Neurons.Excitatory:
        setNeuron(<ExcitatoryNeuron />);
        return;
      case Neurons.Inhibitory:
        setNeuron(<InhibitoryNeuron />);
        return;
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item: any) => addNeuron(item.props.type),
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
