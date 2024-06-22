import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "./About.css";

const About = () => {
  return (
    <>
      <Header>
        <Link to="/">
          <div className="x_icon_div">
            <FontAwesomeIcon icon={faXmark} className="x_icon" />
          </div>
        </Link>
      </Header>

      <h1>About us!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae quas
        eius similique, voluptatem natus laboriosam unde animi voluptate tempore
        blanditiis rerum, debitis praesentium ex sequi libero odit aliquam
        molestiae nobis!
      </p>
    </>
  );
};

export default About;
