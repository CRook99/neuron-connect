import "./NeuronSupply.css";

interface NeuronSupplyProps {
  title: string;
  type: string;
  imgPath: string;
}

const NeuronSupply = (props: NeuronSupplyProps) => {
  return (
    <>
      <div className="neuron-container">
        <img className="neuron" src={props.imgPath} />
        <p className="title">{props.title}</p>
      </div>
    </>
  );
};

export default NeuronSupply;
