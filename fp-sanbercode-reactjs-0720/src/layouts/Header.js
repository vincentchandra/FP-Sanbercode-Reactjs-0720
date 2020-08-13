import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "../pages/Login";
import Movies from "../pages/Movies";
import Games from "../pages/Games";
import logo from "../img/logo.png";
import Edit from "../pages/Edit";
import MovieDetail from "../pages/MovieDetail";
import GameDetail from "../pages/GameDetail";
import Account from "../pages/Account";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <header>
        <div className="logo">
          <Link className="link" to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/movies">
                Movie Review
              </Link>
            </li>
            <li>
              <Link className="link" to="/games">
                Game Review
              </Link>
            </li>
            {user && (
              <li>
                <Link className="link" to="/edit">
                  Edit Review
                </Link>
              </li>
            )}
            {user === null && (
              <li>
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link className="link" to="/account">
                  Account
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {user && <h1 style={{ marginLeft: "20px" }}>Hello, {user.username}!</h1>}
      <Switch>
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/games" component={Games} />
        <Route exact path="/games/:id" component={GameDetail} />
        <Route exact path="/edit" component={Edit} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/" component={Movies} />
      </Switch>
    </>
  );
};

export default Header;
