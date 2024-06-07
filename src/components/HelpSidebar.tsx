import "./HelpSidebar.css";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const HelpSidebar = () => {
  // const [active, setActive] = useState(false);
  // const appear = useSpring({
  //   transform: active ? "translate3d(0,0,0)" : "translate3d(0,-50px,0)",
  // });

  return (
    <div className="sidebar">
      <h1>How to use NeuroConnect</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        convallis lacus libero, sed tristique tellus laoreet quis. Nam sed odio
        nunc. Morbi imperdiet, ante in elementum pretium, ex est maximus diam,
        sed fringilla diam ipsum a augue.
      </p>
    </div>
  );
};

export default HelpSidebar;
