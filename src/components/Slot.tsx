import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import { Neurons } from "./Neurons";
import { SLOT_MARGIN, SLOT_SIZE } from "../utils/constants";
import { Coordinate } from "../utils/types";
import Neuron from "./Neuron";
import { useDragContext } from "../contexts/DragContext";
import { useGraphContext } from "../contexts/GraphContext";

interface SlotProps {
  coord: Coordinate;
}

const Slot = (props: SlotProps) => {
  const [neuron, setNeuron] = useState<React.ReactElement | null>(null);

  const graph = useGraphContext();

  const { handleNewHover } = useDragContext();

  const addNeuron = (type: Neurons) => {
    setNeuron(<Neuron neuronType={type} coord={props.coord} />);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item: any) => {
      addNeuron(item.props.type);
      graph.setOccupancy(props.coord);
    },
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
      <div
        className="slot"
        ref={drop}
        style={style}
        onMouseEnter={() => handleNewHover(props.coord, neuron ? true : false)}
      >
        {neuron ? <>{neuron}</> : <img className="peg" src="./Peg.png" />}
      </div>
    </>
  );
};

export default Slot;
