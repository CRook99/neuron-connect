import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import { Neurons } from "../data/neuronData";
import { SLOT_MARGIN, SLOT_SIZE } from "../utils/constants";
import { Coordinate } from "../utils/types";
import Neuron from "./Neuron";
import { useDragContext } from "../contexts/DragContext";
import { useGraphContext } from "../contexts/GraphContext";
import { useSimulationContext } from "../contexts/FrequencyContext";

interface SlotProps {
  coord: Coordinate;
}

const Slot = (props: SlotProps) => {
  const [neuron, setNeuron] = useState<React.ReactElement | null>(null);

  const graph = useGraphContext();
  const { frequencyGraph } = useSimulationContext();

  const { handleNewHover } = useDragContext();

  const addNeuron = (type: Neurons) => {
    setNeuron(<Neuron neuronType={type} coord={props.coord} />);
  };

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item: any) => {
      addNeuron(item.props.type);
      graph.setOccupancy(props.coord, "Neuron");
      frequencyGraph.addNode(item.props.type, props.coord);
    },
    collect: (monitor) => {
      return { isOver: !!monitor.isOver() };
    },
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
        {neuron ? (
          <>{neuron}</>
        ) : (
          <svg width={16} height={16}>
            <circle cx={8} cy={8} r={6} fill={"#B7B7B7"} />
            <circle cx={8} cy={8} r={5} fill={"#45563C"} />
          </svg>
        )}
      </div>
    </>
  );
};

export default Slot;
