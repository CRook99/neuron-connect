import "./HelpSidebar.css";
import Slider from "react-slick";
import { motion } from "framer-motion";

interface SidebarProps {
  isHelpActive: boolean;
}

const HelpSidebar = (props: SidebarProps) => {
  // Settings for carousel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <motion.div
        className="container"
        layout
        initial={{ x: "100%" }}
        animate={{ x: props.isHelpActive ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: "circOut" }}
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
    </>
  );
};

export default HelpSidebar;
