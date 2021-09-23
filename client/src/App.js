//* React
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//* Dependencies
import Cookies from "js-cookie";
import UserContext from "./context/UserContext";

//* Pages
import Home from "./pages/Home";
import Components from "./pages/Components";
import Auth from "./pages/Auth";

//* Components
import Navbar from "./components/Navbar";

//* CSS
import "./App.scss";

function App() {
  const jwt = Cookies.get("jwt");
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getUser = Cookies.get("user");
    if (getUser) {
      setUser(JSON.parse(getUser));
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ user, setUser, loggedIn, setLoggedIn, jwt }}
      >
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home title="Errorless" />
            </Route>
            <Route exact path="/components">
              <Components title="Components | Errorless" />
            </Route>

            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Route exact path="/auth">
                <Auth title="Auth | Errorless" />
              </Route>
            )}
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
