import { useState } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";

const Slot = () => {
  const handleDrop = () => {
    console.log("Dropped item");
  };

  const [neuron, setNeuron] = useState();
  {
  }

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item) => handleDrop(),
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
      <div className={`slot ${isOver ? "over" : ""}`} ref={drop} style={style}>
        <img className="peg" src="./Peg.png" />
      </div>
    </>
  );
};

export default Slot;
