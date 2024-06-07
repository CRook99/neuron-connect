import "./Header.css";
import { useState } from "react";

const HelpButton = () => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setActive(!active);
  };

  const style = {
    transition: "background-color 0.1s ease",
    backgroundColor: active ? "#ddc6bd" : hovered ? "#e4d2cb" : "#F4EDEA",
    cursor: "pointer",
  };

  return (
    <>
      <div
        className="button"
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Help
      </div>
    </>
  );
};

function Header() {
  return (
    <>
      <header className="header">
        <p className="logo">NeuroConnect</p>
        <nav className="navbar">
          <HelpButton />
          <div>About</div>
        </nav>
      </header>
    </>
  );
}

export default Header;
