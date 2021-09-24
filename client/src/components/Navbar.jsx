import { useContext } from "react";
import UserContext from "../context/UserContext";

import { Link, useHistory } from "react-router-dom";

//* CSS
import "./css/Navbar.scss";

//* Components import
import Button from "./Button";
import NoLinkButton from "./NoLinkButton";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const { loggedIn, setLoggedIn, user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    if (loggedIn) {
      Cookies.remove("user");
      Cookies.remove("jwt");
      setLoggedIn(false);
      setUser(null);
      history.push("/");
    }
  };

  return (
    <div className="navbar">
      <Link to={loggedIn ? `/user/${user._id}` : "/"} className="logo-link">
        <img src="/img/logo.png" className="logo" alt="CoLive-21" />
      </Link>
      {loggedIn && (
        <ul className="nav-items-ctnr">
          <li>
            <Link to={`/institute/${user.organisation.orgId}`}>Institute</Link>
          </li>
          <li>
            <Link to={`/user/${user._id}`}>Profile</Link>
          </li>
          <li>
            <Link to="/team">About Us</Link>
          </li>
        </ul>
      )}
      {loggedIn ? (
        <>
          <div className="user">
            <i
              class="fas fa-user-edit"
              onClick={() => history.push("/edit-profile")}
            ></i>
            <NoLinkButton name="Logout" onClick={handleLogout} />
          </div>
        </>
      ) : (
        <>
          <Button name="Login / Sign Up" link="/auth" />
        </>
      )}
    </div>
  );
};

export default Navbar;
