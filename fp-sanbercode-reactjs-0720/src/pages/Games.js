import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

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
            };
          })
        );
      });
    }
  });
  return (
    <>
      <div className="content">
        <h1>Reviewed Games</h1>
        {games !== null &&
          games.map((el) => {
            return (
              <>
                <div className="card">
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
