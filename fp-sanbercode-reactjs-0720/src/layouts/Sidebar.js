import React from "react";
import fotodiri from "../img/fotodiri.jpg";
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
      </div>
    </>
  );
};

export default Sidebar;
