import "./SimulationButton.css";

import { FC } from "react";
import { motion } from "framer-motion";

interface SimulationButtonProps {
  label: string;
  onClick: () => void;
  svgPath: string;
}

const SimulationButton: FC<SimulationButtonProps> = ({
  label,
  onClick,
  svgPath,
}) => {
  return (
    <div className="simulation-button">
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
      >
        <img src={svgPath} alt={label} className="simulation-button__icon" />
      </motion.div>
      <span className="simulation-button__label">{label}</span>
    </div>
  );
};

export default SimulationButton;
