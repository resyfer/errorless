import { useContext } from "react";
import UserContext from "../context/UserContext";

import { Link, useHistory } from "react-router-dom";

//* CSS
import "./css/Navbar.scss";

//* Components import
import Button from "./Button";
import NoLinkButton from "./NoLinkButton";
import Cookies from "js-cookie";

//! Temporary
const user = {
  id: "abcd",
  organisation: {
    id: "1234",
  },
};

const Navbar = (props) => {
  // const {user, loggedIn} = useContext(UserContext);
  const { loggedIn, setLoggedIn, user, setUser } = useContext(UserContext);
  const history = useHistory();

<<<<<<< HEAD
	const handleLogout = () => {
		if (loggedIn) {
			Cookies.remove('user');
			Cookies.remove('jwt');
			setLoggedIn(false);
			setUser(null);
			history.push('/');
		}
	};

	return (
		<div className='navbar'>
			<Link to={loggedIn ? `/user/${user._id}` : '/'} className='logo-link'>
				<img src='/img/logo.png' className='logo' alt='CoLive-21' />
			</Link>
			{loggedIn && (
				<ul className='nav-items-ctnr'>
					<li>
						<Link to='/institute'>Institute</Link>
					</li>
					<li>
						<Link to='/profile'>Profile</Link>
					</li>
					<li>
						<Link to='/team'>About Us</Link>
					</li>
				</ul>
			)}
			{loggedIn ? (
				<NoLinkButton name='Logout' onClick={handleLogout} />
			) : (
				<Button name='Login / Sign Up' link='/auth' />
			)}
		</div>
	);
=======
  const handleLogout = () => {
    if (loggedIn) {
      Cookies.remove("user");
      Cookies.remove("jwt");
      setLoggedIn(false);
      setUser(null);
      history.push("/");
    }
  };
  console.log(user);
  return (
    <div className="navbar">
      <Link to={loggedIn ? `/user/${user._id}` : "/"} className="logo-link">
        <img src="/img/logo.png" className="logo" alt="CoLive-21" />
      </Link>
      {loggedIn && (
        <ul className="nav-items-ctnr">
          <li>
            <Link to="/institute/938742">Institute</Link>
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
        <NoLinkButton name="Logout" onClick={handleLogout} />
      ) : (
        <Button name="Login / Sign Up" link="/auth" />
      )}
    </div>
  );
>>>>>>> 7aa4f73bea8c4fc6fd7cf70ef9827c9edf7b17b1
};

export default Navbar;
