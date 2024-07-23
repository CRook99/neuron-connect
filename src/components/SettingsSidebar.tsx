import "./SettingsSidebar.css";
import Sidebar from "./Sidebar";
import { FC } from "react";

interface SettingsSidebarProps {
  isActive: boolean;
}

const HelpSidebar: FC<SettingsSidebarProps> = ({ isActive }) => {
  return (
    <Sidebar isActive={isActive}>
      <h1>Settings</h1>
    </Sidebar>
  );
};

export default HelpSidebar;
