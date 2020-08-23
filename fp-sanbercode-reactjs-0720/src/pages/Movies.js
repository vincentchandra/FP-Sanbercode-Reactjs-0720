import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "./MovieDetail";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";

const Movies = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    if (movies === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies`)
        .then((res) => {
          setMovies(
            res.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
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
  const [allMovies, setAllMovies] = useState(null);
  useEffect(() => {
    if (allMovies === null) {
      axios
        .get(`https://backendexample.sanbersy.com/api/movies`)
        .then((res) => {
          setAllMovies(
            res.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
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
      setMovies(
        allMovies.filter(
          (el) => el.title.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    } else {
      setMovies(allMovies);
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
            label="Search Movie"
            type="text"
            name="searchMovie"
            onChange={handleChange}
            value={input}
          />
        </div>
        <h1>Reviewed Movies</h1>
        {movies !== null &&
          movies.map((el) => {
            return (
              <>
                <div className="card">
                  <div className="cardHead">
                    <Link className="detail" to={`/movies/${el.id}`}>
                      <img src={el.image_url}></img>
                    </Link>
                  </div>
                  <div className="judul">
                    <Link className="detail" to={`/movies/${el.id}`}>
                      <h2>{el.title}</h2>
                    </Link>

                    <h2>{el.rating}&#9734;</h2>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Movies;
