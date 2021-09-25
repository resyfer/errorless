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
        {window.innerWidth > 500 ? (
          <img src="/img/logo.png" className="logo" alt="CoLive-21" />
        ) : (
          <i className="fas fa-home"></i>
        )}
      </Link>
      <ul className="nav-items-ctnr">
        {loggedIn && (
          <>
            <li>
              <Link to={`/institute/${user.organisation.orgId}`}>
                {window.innerWidth > 500 ? (
                  "Institute"
                ) : (
                  <i className="fas fa-university"></i>
                )}
              </Link>
            </li>
            <li>
              <Link to={`/user/${user._id}`}>
                {window.innerWidth > 500 ? (
                  "Profile"
                ) : (
                  <i className="fas fa-user-alt"></i>
                )}
              </Link>
            </li>
          </>
        )}
        {isOrg && (
          <>
            <li>
              <Link to={`/institute/${org._id}`}>
                {window.innerWidth > 500 ? (
                  "Institute"
                ) : (
                  <i className="fas fa-university"></i>
                )}
              </Link>
            </li>
            <li>
              <Link to={`/organisation/${org._id}`}>
                {window.innerWidth > 500 ? (
                  "Manage"
                ) : (
                  <i className="fas fa-user-shield"></i>
                )}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/team">
            {window.innerWidth > 500 ? (
              "About Us"
            ) : (
              <i className="fas fa-info-circle"></i>
            )}
          </Link>
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
            {window.innerWidth > 500 && (
              <NoLinkButton name="Logout" onClick={handleLogout} />
            )}
            {window.innerWidth < 500 && (
              <i className="fas fa-sign-out-alt" onClick={handleLogout}></i>
            )}
          </div>
        </>
      ) : (
        <>
          <Button
            name={
              window.innerWidth > 500 ? (
                "Login / Sign Up"
              ) : (
                <i className="fas fa-sign-in-alt"></i>
              )
            }
            link="/auth"
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
