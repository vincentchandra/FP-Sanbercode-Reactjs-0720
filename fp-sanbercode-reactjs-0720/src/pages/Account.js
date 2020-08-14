import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import { Button, TextField, makeStyles } from "@material-ui/core";
const Account = () => {
  const [account, setAccount] = useContext(UserContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "white",
        },
        "&:hover fieldset": {
          borderColor: "white",
        },
        "&.Mui-focused fieldset": {
          borderColor: "white",
        },
      },
    },
    input: {
      color: "white",
    },
    floatingLabelFocusStyle: {
      color: "gray",
    },
  }));
  const [input, setInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "oldPassword":
        setInput({ ...input, oldPassword: value });
        break;
      case "newPassword":
        setInput({ ...input, newPassword: value });
        break;
      default: {
        break;
      }
    }
  };
  const history = useHistory();
  const handleLogout = () => {
    setAccount(null);
    localStorage.removeItem("user");
    history.push("/login");
  };

  const handleChangePassword = (event) => {
    event.preventDefault();

    if (input.oldPassword === account.password) {
      axios
        .put(`https://backendexample.sanbersy.com/api/users/${account.id}`, {
          ...account,
          password: input.newPassword,
        })
        .then((res) => {
          setAccount(res.data);
        });

      alert("Your password is successfully changed!");
    } else {
      alert("Your old password is wrong!");
    }
    setInput({ ...input, oldPassword: "", newPassword: "" });
  };
  const classes = useStyles();
  return (
    <div className="content">
      <h1>Account Page</h1>
      <h2>Your Username: {account.username}</h2>
      {/* <h2>Your Password: {account.password}</h2>
      <h2>Your ID: {account.id}</h2> */}
      <div className="changePassword">
        <h2>Change Password:</h2>
        <form
          className="loginForm"
          className={classes.root}
          onSubmit={handleChangePassword}
        >
          <label>Old Password: </label>
          <TextField
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            InputProps={{
              className: classes.input,
            }}
            color="white"
            variant="outlined"
            label="Old Password"
            type="text"
            name="oldPassword"
            onChange={handleChange}
            value={input.oldPassword}
          />
          <br />
          <label>New Password: </label>
          <TextField
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            InputProps={{
              className: classes.input,
            }}
            variant="outlined"
            label="New Password"
            type="password"
            name="newPassword"
            onChange={handleChange}
            value={input.newPassword}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            type="Submit"
          >
            Change Password
          </Button>
        </form>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          style={{ marginTop: "20px" }}
          type="Submit"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;
