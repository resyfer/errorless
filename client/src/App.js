//* React
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

//* Dependencies
import Cookies from "js-cookie";
import UserContext from "./context/UserContext";

//* Pages
import Home from "./pages/Home";
import Components from "./pages/Components";
import Auth from "./pages/Auth";
import OrgAuth from "./pages/OrgAuth";
import Institute from "./pages/Institute";
import Profile from "./pages/Profile";
import Organisation from "./pages/Organisation";
import About from "./pages/About";
import ProfileEdit from "./pages/ProfileEdit";
import OrgEdit from "./pages/OrgEdit";

//* Components
import Navbar from "./components/Navbar";

//* CSS
import "./App.scss";

function App() {
  const jwt = Cookies.get("jwt");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [org, setOrg] = useState(false);
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : "https://errorless-electrathon.herokuapp.com/api";

  const redirectuser = useRef();
  const redirectorg = useRef();
  useEffect(() => {
    const type = Cookies.get("type");

    if (type === "user") {
      const getUser = Cookies.get("user");
      if (getUser) {
        setUser(JSON.parse(getUser));
        setLoggedIn(true);
      }
    } else if (type === "org") {
      const getOrg = Cookies.get("org");
      if (getOrg) {
        setOrg(JSON.parse(getOrg));
        setIsOrg(true);
      }
    }
  }, []);

  useEffect(() => {
    if (loggedIn && window.location.pathname === "/") {
      redirectuser.current.click();
    }
    if (isOrg && window.location.pathname === "/") {
      redirectorg.current.click();
    }
    // eslint-disable-next-line
  }, [loggedIn, isOrg]);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          jwt,
          isOrg,
          setIsOrg,
          org,
          setOrg,
          url,
        }}
      >
        <Router>
          {user && <Link ref={redirectuser} to={`/user/${user._id}`} />}
          {org && <Link ref={redirectorg} to={`/organisation/${org._id}`} />}
          <Switch>
            <Route exact path="/">
              <Home title="CoLive-21" />
            </Route>
            <Route exact path="/components">
              <Navbar />
              <Components title="Components | CoLive-21" />
            </Route>

            <Route exact path="/auth">
              <Navbar />
              <Auth title="Auth | CoLive-21" />
            </Route>

            <Route exact path="/org-auth/:mode">
              <Navbar />
              <OrgAuth />
            </Route>

            <Route path="/institute/:id">
              <Navbar />
              <Institute />
            </Route>

            {!isOrg && (
              <Route path="/user/:id">
                <Navbar />
                <Profile />
              </Route>
            )}

            {isOrg && (
              <Route path="/organisation/:id">
                <Navbar />
                <Organisation />
              </Route>
            )}

            {loggedIn && (
              <Route exact path="/edit-profile">
                <Navbar />
                <ProfileEdit title="Edit Profile | CoLive-21" />
              </Route>
            )}

            {isOrg && (
              <Route exact path="/edit-organisation">
                <Navbar />
                <OrgEdit title="Edit Profile | CoLive-21" />
              </Route>
            )}

            <Route exact path="/team">
              <Navbar />
              <About title="About us | CoLive-21" />
            </Route>
          </Switch>
          <div className="bottom-box"></div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
