//* React
import { useRef } from "react";
import { Link } from "react-router-dom";

//* CSS
import "./css/Button.scss";

const Button = (props) => {
  const link = useRef();

  return (
    <div
      className="btn"
      onClick={() => link.current.click()}
      style={props.style}
    >
      <Link
        to={props.link}
        ref={link}
        className="btn-link"
        onClick={props.onClick}
      >
        {props.name}
      </Link>
    </div>
  );
};

export default Button;
