import React from "react";
import Home from './components/Home';
import Login from './components/Login';
import Search from './components/Search';
import Booking from './components/Booking';
import Booking2 from './components/Booking2';
import Register from './components/Register';
import Contact from './components/Contact'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Settings from "./components/Settings";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/booking">
            <Booking />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/payment">
            <Booking2 />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}