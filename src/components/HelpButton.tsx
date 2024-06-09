import { useState } from "react";
import "./HelpButton.css";

interface HelpButtonProps {
  isHelpActive: boolean;
  onClick: () => void;
}

const HelpButton = (props: HelpButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const style = {
    transition: "background-color 0.1s ease",
    backgroundColor: props.isHelpActive
      ? "#ddc6bd"
      : hovered
      ? "#e4d2cb"
      : "#F4EDEA",
    cursor: "pointer",
  };

  return (
    <>
      <div
        className="button"
        style={style}
        onClick={props.onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Help
      </div>
    </>
  );
};

export default HelpButton;
