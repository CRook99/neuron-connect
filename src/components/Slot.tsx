import { useState, useRef } from "react";
import "./Slot.css";
import { useDrop } from "react-dnd";
import Neuron from "./Neuron";

const Slot = () => {
  const handleDrop = () => {};

  const neuron = useRef(null); // Reference to currently slotted neuron

  const [{ isOver }, drop] = useDrop({
    accept: "neuron",
    drop: (item) => handleDrop(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const style = {
    transition: "background-color 0.1s ease, border 0.1s ease",
    backgroundColor: isOver ? "#e4d2cb" : "#F4EDEA",
    border: isOver
      ? "2px solid rgba(221, 198, 189, 1)"
      : "2px solid rgba(221, 198, 189, 0)",
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
