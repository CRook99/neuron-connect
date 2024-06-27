import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import { Neurons } from "./Neurons";
import ExcitatoryNeuron from "./ExcitatoryNeuron";
import InhibitoryNeuron from "./InhibitoryNeuron";
import { SLOT_MARGIN, SLOT_SIZE } from "../utils/constants";

interface SlotProps {
  row: number;
  col: number;
}

const Slot = (props: SlotProps) => {
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
    width: SLOT_SIZE,
    height: SLOT_SIZE,
    margin: SLOT_MARGIN,
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
