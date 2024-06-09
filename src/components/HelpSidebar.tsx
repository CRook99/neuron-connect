import "./HelpSidebar.css";
import Slider from "react-slick";
import { useSpring, animated, config } from "@react-spring/web";
import { useState } from "react";

const HelpSidebar = () => {
  const [active, setActive] = useState(false);

  const appear = useSpring({
    right: active ? "0%" : "-25%",
    position: "absolute",
  });

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
      <animated.div className="sidebar" style={appear}>
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
      </animated.div>
      <button onClick={handleOnClick}>Click me</button>
    </>
  );
};

export default HelpSidebar;
