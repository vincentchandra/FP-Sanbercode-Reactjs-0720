import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";

const Games = () => {
  const [games, setGames] = useState(null);
  useEffect(() => {
    if (games === null) {
      axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
        setGames(
          res.data.map((el) => {
            return {
              id: el.id,
              name: el.name,
              singlePlayer: el.singlePlayer,
              multiPlayer: el.multiPlayer,
              genre: el.genre,
              platform: el.platform,
              release: el.release,
              image_url: el.image_url,
            };
          })
        );
      });
    }
  });
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
  const classes = useStyles();
  const [input, setInput] = useState("");
  const [allGames, setAllGames] = useState(null);
  useEffect(() => {
    if (allGames === null) {
      axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
        setAllGames(
          res.data.map((el) => {
            return {
              id: el.id,
              name: el.name,
              singlePlayer: el.singlePlayer,
              multiplayer: el.multiplayer,
              genre: el.genre,
              platform: el.platform,
              release: el.release,
              image_url: el.image_url,
            };
          })
        );
      });
    }
  });
  const handleChange = (event) => {
    let value = event.target.value;
    setInput(value);
    if (value != "") {
      setGames(
        allGames.filter(
          (el) => el.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    } else {
      setGames(allGames);
    }
  };
  return (
    <>
      <div className="content">
        <div className="searchBar" className={classes.root}>
          <TextField
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            InputProps={{
              className: classes.input,
            }}
            color="white"
            variant="outlined"
            label="Search Game"
            type="text"
            name="searchGame"
            onChange={handleChange}
            value={input}
          />
        </div>
        <h1>Reviewed Games</h1>
        {games !== null &&
          games.map((el) => {
            return (
              <>
                <div className="card">
                  <div className="cardHead">
                    <Link className="detail" to={`/games/${el.id}`}>
                      <img src={el.image_url}></img>
                    </Link>
                  </div>
                  <div className="judul">
                    <Link className="detail" to={`/games/${el.id}`}>
                      <h2>{el.name}</h2>
                    </Link>

                    <h2>{el.platform}</h2>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Games;
