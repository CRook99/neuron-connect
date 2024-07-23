import { FC, useState } from "react";

interface PersistentButtonProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const PersistentButton: FC<PersistentButtonProps> = ({
  text,
  isActive,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const style = {
    transition: "background-color 0.1s ease",
    backgroundColor: isActive ? "#ddc6bd" : hovered ? "#e4d2cb" : "#F4EDEA",
    cursor: "pointer",
  };

  return (
    <>
      <div
        className="button"
        style={style}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text ? text : "NONE"}
      </div>
    </>
  );
};

export default PersistentButton;
