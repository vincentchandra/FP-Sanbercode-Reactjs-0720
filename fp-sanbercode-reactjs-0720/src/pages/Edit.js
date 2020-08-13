import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UserContext } from "../context/UserContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  column_edit: {},
  button: {
    margin: theme.spacing(1),
  },
}));

const Edit = () => {
  const [user] = useContext(UserContext);
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState(-1);

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
              genre_game: el.genre,
              platform: el.platform,
              release: el.release,
            };
          })
        );
      });
    }
  });
  const [open, setOpen] = React.useState({
    movie: false,
    game: false,
  });

  const handleClickOpenMovie = () => {
    setOpen({ ...open, movie: true });
  };

  const handleCloseMovie = () => {
    setInput({
      ...input,
      title: "",
      description: "",
      year: "",
      genre: "",
      rating: "",
      review: "",
      image_url: "",
    });
    setSelectedId(-1);
    setOpen({ ...open, movie: false });
  };
  const handleClickOpenGame = () => {
    setOpen({ ...open, game: true });
  };

  const handleCloseGame = () => {
    setInput({
      ...input,
      name: "",
      genre_game: "",
      singlePlayer: "",
      multiPlayer: "",
      platform: "",
      release: "",
    });
    setSelectedId(-1);
    setOpen({ ...open, game: false });
  };
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 0,
    genre: "",
    rating: 0,
    review: "",
    image_url: "",
    name: "",
    singlePlayer: "",
    multiPlayer: "",
    genre_game: "",
    platform: "",
    release: "",
  });
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "title": {
        setInput({ ...input, title: value });
        break;
      }
      case "description": {
        setInput({ ...input, description: value });
        break;
      }
      case "year": {
        setInput({ ...input, year: value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: value });
        break;
      }
      case "review": {
        setInput({ ...input, review: value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: value });
        break;
      }
      case "name": {
        setInput({ ...input, name: value });
        break;
      }
      case "genre_game": {
        setInput({ ...input, genre_game: value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: value });
        break;
      }
      case "multiPlayer": {
        setInput({ ...input, multiPlayer: value });
        break;
      }

      case "platform": {
        setInput({ ...input, platform: value });
        break;
      }
      case "release": {
        setInput({ ...input, release: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubmitMovie = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString();
    if (selectedId === -1) {
      axios
        .post(`https://backendexample.sanbersy.com/api/movies`, {
          created_at: date,
          title: input.title,
          description: input.description,
          year: input.year,
          genre: input.genre,
          rating: input.rating,
          review: input.review,
          image_url: input.image_url,
        })
        .then((res) => {
          setMovies([
            ...movies,
            {
              created_at: date,
              id: res.data.id,
              title: input.title,
              description: input.description,
              year: input.year,
              genre: input.genre,
              rating: input.rating,
              review: input.review,
              image_url: input.image_url,
            },
          ]);
        });
      alert("Movie added!");
    } else {
      axios
        .put(`http://backendexample.sanbercloud.com/api/movies/${selectedId}`, {
          updated_at: date,
          title: input.title,
          description: input.description,
          year: input.year,
          genre: input.genre,
          rating: input.rating,
          review: input.review,
          image_url: input.image_url,
        })
        .then((res) => {
          let dataMovie = movies.find((el) => el.id === selectedId);
          dataMovie.title = input.title;
          dataMovie.description = input.description;
          dataMovie.year = input.year;
          dataMovie.genre = input.genre;
          dataMovie.review = input.review;
          dataMovie.rating = input.rating;
          dataMovie.image_url = input.image_url;
          setMovies([...movies]);
        });
      alert("Movie updated!");
    }
    setSelectedId(-1);
    setInput({
      ...input,
      title: "",
      description: "",
      year: "",
      genre: "",
      rating: "",
      review: "",
      image_url: "",
    });
    setOpen({ ...open, movie: false });
  };
  const handleSubmitGame = (event) => {
    event.preventDefault();
    let date = new Date().toLocaleString();
    if (selectedId === -1) {
      axios
        .post(`https://backendexample.sanbersy.com/api/games`, {
          created_at: date,
          name: input.name,
          genre_game: input.genre_game,
          singlePlayer: input.singlePlayer,
          multiPlayer: input.multiPlayer,
          release: input.release,
          platform: input.platform,
        })
        .then((res) => {
          setGames([
            ...games,
            {
              created_at: date,
              id: res.data.id,
              name: input.name,
              genre_game: input.genre_game,
              singlePlayer: input.singlePlayer,
              multiPlayer: input.multiPlayer,
              release: input.release,
              platform: input.platform,
            },
          ]);
        });

      alert("Game added!");
    } else {
      axios
        .put(`http://backendexample.sanbercloud.com/api/games/${selectedId}`, {
          updated_at: date,
          name: input.name,
          genre_game: input.genre_game,
          singlePlayer: input.singlePlayer,
          multiPlayer: input.multiPlayer,
          platform: input.platform,
          release: input.release,
        })
        .then((res) => {
          let dataGame = games.find((el) => el.id === selectedId);
          dataGame.name = input.name;
          dataGame.genre_game = input.genre_game;
          dataGame.singlePlayer = input.singlePlayer;
          dataGame.multiPlayer = input.multiPlayer;
          dataGame.platform = input.platform;
          dataGame.release = input.release;
          setGames([...games]);
        });
      alert("Game updated!");
    }
    setInput({
      ...input,
      name: "",
      genre_game: "",
      singlePlayer: "",
      multiPlayer: "",
      platform: "",
      release: "",
    });
    setSelectedId(-1);
    setOpen({ ...open, game: false });
  };
  const handleDeleteMovie = (event) => {
    let idMovie = parseInt(event.currentTarget.value);
    console.log(idMovie);
    let newMovieList = movies.filter((el) => el.id !== idMovie);
    axios
      .delete(`https://backendexample.sanbersy.com/api/movies/${idMovie}`)
      .then((res) => {
        console.log(res);
      });
    setMovies([...newMovieList]);
  };
  const handleDeleteGame = (event) => {
    let idGame = parseInt(event.currentTarget.value);
    let newGameList = games.filter((el) => el.id !== idGame);
    axios
      .delete(`https://backendexample.sanbersy.com/api/games/${idGame}`)
      .then((res) => {
        console.log(res);
      });
    setGames([...newGameList]);
  };

  const handleEditMovie = (event) => {
    let idMovie = parseInt(event.currentTarget.value);
    let selectedMovie = movies.find((el) => el.id === idMovie);
    setOpen({ ...open, movie: true });
    setSelectedId(idMovie);
    setInput({
      ...input,
      title: selectedMovie.title,
      description: selectedMovie.description,
      year: selectedMovie.year,
      genre: selectedMovie.genre,
      rating: selectedMovie.rating,
      review: selectedMovie.review,
      image_url: selectedMovie.image_url,
    });
  };
  const handleEditGame = (event) => {
    let idGame = parseInt(event.currentTarget.value);
    let selectedGame = games.find((el) => el.id === idGame);
    setOpen({ ...open, game: true });
    setSelectedId(idGame);
    setInput({
      ...input,
      name: selectedGame.name,
      genre_game: selectedGame.genre_game,
      singlePlayer: selectedGame.singlePlayer,
      multiPlayer: selectedGame.multiPlayer,
      platform: selectedGame.platform,
      release: selectedGame.release,
    });
  };

  return (
    <>
      {user === null && (
        <div className="content">
          <h1>You need to Login First</h1>
        </div>
      )}
      {user && (
        <div className="content">
          <div className="addMovie">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpenMovie}
            >
              Add Movie
            </Button>
            <Dialog
              open={open.movie}
              onClose={handleCloseMovie}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle>Add / Edit Movie Data</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={input.title}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Description"
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={input.description}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Year"
                  type="number"
                  name="year"
                  onChange={handleChange}
                  value={input.year}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Genre"
                  type="text"
                  name="genre"
                  onChange={handleChange}
                  value={input.genre}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Rating"
                  type="number"
                  name="rating"
                  onChange={handleChange}
                  value={input.rating}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Review"
                  type="text"
                  name="review"
                  onChange={handleChange}
                  value={input.review}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Image URL"
                  type="text"
                  name="image_url"
                  onChange={handleChange}
                  value={input.image_url}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseMovie} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmitMovie} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <h1>Movies Table</h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Year</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Rating</TableCell>
                  <TableCell align="right">Review</TableCell>
                  <TableCell align="right">Image URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies !== null &&
                  movies.map((el) => (
                    <TableRow key={el.title}>
                      <TableCell>
                        <Button
                          className={classes.button}
                          color="primary"
                          startIcon={<EditIcon />}
                          variant="outlined"
                          value={el.id}
                          onClick={handleEditMovie}
                        >
                          Edit
                        </Button>
                        <Button
                          className={classes.button}
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          variant="outlined"
                          value={el.id}
                          onClick={handleDeleteMovie}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {el.title}
                      </TableCell>
                      <TableCell align="right">{el.description}</TableCell>
                      <TableCell align="right">{el.year}</TableCell>
                      <TableCell align="right">{el.genre}</TableCell>
                      <TableCell align="right">{el.rating}</TableCell>
                      <TableCell align="right">{el.review}</TableCell>
                      <TableCell align="right">{el.image_url}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="addMovie">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpenGame}
            >
              Add Game
            </Button>
            <Dialog
              open={open.game}
              onClose={handleCloseGame}
              aria-labelledby="form-dialog-title-2"
            >
              <DialogTitle id="form-dialog-title-2">
                Add / Edit Game Data
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={input.name}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Genre"
                  type="text"
                  name="genre_game"
                  onChange={handleChange}
                  value={input.genre_game}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Single Player"
                  type="number"
                  name="singlePlayer"
                  onChange={handleChange}
                  value={input.singlePlayer}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Multi Player"
                  type="number"
                  name="multiPlayer"
                  onChange={handleChange}
                  value={input.mulitPlayer}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Platform"
                  type="text"
                  name="platform"
                  onChange={handleChange}
                  value={input.platform}
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  label="Release"
                  type="number"
                  name="release"
                  onChange={handleChange}
                  value={input.release}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseGame} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmitGame} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <h1>Games Table</h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Single Player</TableCell>
                  <TableCell align="right">Multi Player</TableCell>
                  <TableCell align="right">Platform</TableCell>
                  <TableCell align="right">Release</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games !== null &&
                  games.map((el) => (
                    <TableRow key={el.name}>
                      <TableCell>
                        <Button
                          className={classes.button}
                          color="primary"
                          startIcon={<EditIcon />}
                          variant="outlined"
                          value={el.id}
                          onClick={handleEditGame}
                        >
                          Edit
                        </Button>
                        <Button
                          className={classes.button}
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          variant="outlined"
                          value={el.id}
                          onClick={handleDeleteGame}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {el.name}
                      </TableCell>
                      <TableCell align="right">{el.genre_game}</TableCell>
                      <TableCell align="right">{el.singlePlayer}</TableCell>
                      <TableCell align="right">{el.multiPlayer}</TableCell>
                      <TableCell align="right">{el.platform}</TableCell>
                      <TableCell align="right">{el.release}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
export default Edit;
