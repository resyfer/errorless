import { useContext } from "react";
import UserContext from "../context/UserContext";

import { Link, useHistory } from "react-router-dom";

//* CSS
import "./css/Navbar.scss";

//* Components import
import Button from "./Button";
import NoLinkButton from "./NoLinkButton";
import Cookies from "js-cookie";

const Navbar = () => {
  const { loggedIn, setLoggedIn, user, setUser, isOrg, setIsOrg, org, setOrg } =
    useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    if (loggedIn || isOrg) {
      Cookies.remove("user");
      Cookies.remove("jwt");
      Cookies.remove("type");
      Cookies.remove("org");
      setLoggedIn(false);
      setUser(null);
      setIsOrg(false);
      setOrg(null);
      history.push("/");
    }
  };

  return (
    <div className="navbar">
      <Link
        to={
          loggedIn
            ? `/user/${user._id}`
            : isOrg
            ? `/organisation/${org._id}`
            : "/"
        }
        className="logo-link"
      >
        <img src="/img/logo.png" className="logo" alt="CoLive-21" />
      </Link>
      <ul className="nav-items-ctnr">
        {loggedIn && (
          <>
            <li>
              <Link to={`/institute/${user.organisation.orgId}`}>
                Institute
              </Link>
            </li>
            <li>
              {!isOrg && <Link to={`/user/${user._id}`}>Profile</Link>}
              {isOrg && <Link to={`/manage`}>Manage</Link>}
            </li>
          </>
        )}
        {isOrg && (
          <>
            <li>
              <Link to={`/institute/${org._id}`}>Institute</Link>
            </li>
            <li>
              <Link to={`/organisation/${org._id}`}>Manage</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/team">About Us</Link>
        </li>
      </ul>
      {loggedIn || isOrg ? (
        <>
          <div className="user">
            <i
              className="fas fa-user-edit"
              onClick={() => {
                if (!isOrg) history.push("/edit-profile");
                else history.push("/edit-organisation");
              }}
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
