import React, { useContext, useState } from "react";
import userContext from "../context/UserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useContext(userContext);
  const history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
    createUsername: "",
    createPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let success = false;

    if (input.username === "admin" && input.password === "admin") {
      setUser({ username: input.username });
      localStorage.setItem(
        "user",
        JSON.stringify({ username: input.username, password: input.password })
      );
      setInput({ ...input, username: "", password: "" });
      alert("Login Successful!");
      history.push("/");
    } else {
      alert("Wrong username or password!");
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString();
    axios.post(`https://backendexample.sanbersy.com/api/users`, {
      created_at: date,
      updated_at: date,
      username: input.createUsername,
      password: input.createPassword,
    });
    setInput({ ...input, createUsername: "", createPassword: "" });
    alert("Account created");
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "username": {
        setInput({ ...input, username: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      case "createUsername": {
        setInput({ ...input, createUsername: value });
        break;
      }
      case "createPassword": {
        setInput({ ...input, createPassword: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="content">
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={input.username}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={input.password}
          />
          <br />
          <button>Login</button>
        </form>
        <form className="makeAccount" onSubmit={handleCreate}>
          <h2>Don't have any account yet? Make one here!</h2>
          <label>new Username: </label>
          <input
            type="text"
            name="createUsername"
            onChange={handleChange}
            value={input.createUsername}
          />
          <br />
          <label>new Password: </label>
          <input
            type="password"
            name="createPassword"
            onChange={handleChange}
            value={input.createPassword}
          />
          <br />
          <button>Create Account</button>
        </form>
      </div>
    </>
  );
};

export default Login;
