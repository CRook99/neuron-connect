import "./HelpSidebar.css";
import Slider from "react-slick";
import { useState } from "react";
import { motion } from "framer-motion";

const HelpSidebar = () => {
  const [active, setActive] = useState(false);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOnClick = () => {
    setActive(!active);
  };

  return (
    <>
      <motion.div
        className="container"
        layout
        initial={{ x: "100%" }}
        animate={{ x: active ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="sidebar">
          <h1>How to use NeuroConnect</h1>
          <Slider {...sliderSettings} className="slider">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse convallis lacus libero, sed tristique tellus laoreet
                quis. Nam sed odio nunc. Morbi imperdiet, ante in elementum
                pretium, ex est maximus diam, sed fringilla diam ipsum a augue.
              </p>
            </div>
            <div>
              <h2>Types of neurons</h2>
            </div>
          </Slider>
        </div>
      </motion.div>

      <button onClick={handleOnClick}>Click me</button>
    </>
  );
};

export default HelpSidebar;
