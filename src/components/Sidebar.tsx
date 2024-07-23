import "./Sidebar.css";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface SidebarProps {
  isActive: boolean;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ isActive, children }) => {
  return (
    <>
      <motion.div
        className="container"
        layout
        initial={{ x: "100%" }}
        animate={{ x: isActive ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "circOut" }}
      >
        <div className="sidebar">{children}</div>
      </motion.div>
    </>
  );
};

export default Sidebar;
