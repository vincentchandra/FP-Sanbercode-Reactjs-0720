import React, { useState, useEffect } from "react";
import axios from "axios";

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
  return (
    <>
      <div className="content">
        <h1>Reviewed Movies</h1>
        {movies !== null &&
          movies.map((el) => {
            return (
              <>
                <div className="card">
                  <div className="cardHead">
                    <img src={el.image_url}></img>
                  </div>
                  <div className="judul">
                    <h2>{el.title}</h2>
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
