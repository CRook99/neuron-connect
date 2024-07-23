import "./HelpSidebar.css";
import Slider from "react-slick";
import Sidebar from "./Sidebar";
import { FC } from "react";

interface HelpSidebarProps {
  isActive: boolean;
}

const HelpSidebar: FC<HelpSidebarProps> = ({ isActive }) => {
  // Settings for carousel
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Sidebar isActive={isActive}>
      <h1>How to use NeuroConnect</h1>

      <Slider {...sliderSettings} className="slider">
        <div>
          <h2>Placing elements</h2>

          <video width="300" height="300" autoPlay loop muted>
            <source src="../public/the skeleton appears.mp4" />
          </video>
        </div>

        <div>
          <h2>Types of neurons</h2>
        </div>
      </Slider>
    </Sidebar>
  );
};

export default HelpSidebar;
