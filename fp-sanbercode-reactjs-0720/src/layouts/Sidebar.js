import React from "react";
import fotodiri from "../img/fotodiri.jpg";
import instagramLogo from "../img/instagram.png";
import githubLogo from "../img/github.png";
import twitterLogo from "../img/twitter.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div className="Sidebar">
        <h1>About Me</h1>
        <img src={fotodiri} />
        <p>
          Hi, my name is Vincent. I am a computer science student at Binus
          University who is enthusiastic in the field of the web development.
          This website is made for the final project of the Sanbercode React JS
          class. Please enjoy!
        </p>
        <div className="social">
          <a href="https://www.instagram.com/vincentchndra_/" className="link">
            <img src={instagramLogo} />
          </a>
          <a href="https://github.com/vincentchandra" className="link">
            <img src={githubLogo} />
          </a>
          <a href="https://twitter.com/vincentchndr" className="link">
            <img src={twitterLogo} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
