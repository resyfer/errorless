import { Link } from "react-router-dom";

//* CSS
import "./css/Navbar.scss";

//* Components import
import Button from "./Button";

const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <ul>
          <li>
            <Link to="/">
              <img src="/img/logo.png" alt="Errorless" />
            </Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/components">Components</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          <li>
            <Button name="Signin/Signup" link="/auth" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
