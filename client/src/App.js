//* React
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//* Dependencies
import UserContext from "./context/UserContext";

//* Pages
import Home from "./pages/Home";
import Components from "./pages/Components";

//* Components
import Navbar from "./components/Navbar";

//* CSS
import "./App.scss";

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home title="Errorless" />
            </Route>
            <Route exact path="/components">
              <Components title="Components | Errorless" />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
