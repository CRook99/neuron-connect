import "./NeuronDND.css";
import { useDrag } from "react-dnd";

interface NeuronDNDProps {
  imgPath: string;
}

const NeuronDND = (props: NeuronDNDProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "neuron",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <>
      <div ref={drag} style={style}>
        <img src={props.imgPath} className="neuron"></img>
      </div>
    </>
  );
};

export default NeuronDND;
