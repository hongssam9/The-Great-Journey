import React from "react";
import "./Enemies.css";
function Enemies(props) {
  return (
    <div className = "enemy-container">
        <img
          id="Grunt"
          src={require("../../images/Enemies/Grunt.png")}
          alt="Grunt"
          className="enemies"
        />
        <img
          id="Elite"
          src={require("../../images/Enemies/Elite.png")}
          alt="Elite"
          className="enemies"
        />
        <img
          id="Flood"
          src={require("../../images/Enemies/Flood.png")}
          alt="Flood"
          className="enemies"
        />
        <img
          id="Hunter"
          src={require("../../images/Enemies/Hunter.png")}
          alt="Hunter"
          className="enemies"
        />      
        <img
          id="Elite-Master"
          src={require("../../images/Enemies/Elite-Master.png")}
          alt="Elite Master"
          className="enemies"
        />
        <img
        id= "Big-Boss"
        src={require("../../images/Question.png")}
        alt = "Big Boss"
        className = "enemies"
        />
    </div>
  );
}

export default Enemies;
