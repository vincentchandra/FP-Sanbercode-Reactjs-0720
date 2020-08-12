import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Login from "../pages/Login";
import Movies from "../pages/Movies";
import Games from "../pages/Games";
import logo from "../img/logo.png";

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
          <img src={logo} alt="logo" className="logo" />
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
                <a onClick={handleLogout}>Logout</a>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {user && <h1 style={{ marginLeft: "20px" }}>Hello, {user.username}!</h1>}
      <Switch>
        <Route path="/movies" component={Movies} />
        <Route path="/games" component={Games} />
        <Route path="/edit" />
        <Route path="/login" component={Login} />
        <Route path="/" />
      </Switch>
    </>
  );
};

export default Header;
