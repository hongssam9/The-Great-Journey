import React from "react";
import "./Towers.css";
import { useDrag } from "react-dnd";

function Towers(props) {

  return (
    <div class = "tower-container"> 
        <img
          id="Marine-Front"
          src={require("../../images/Marine/Marine-Front.png")}
          alt="Marine Front"
          className="towers"
        />
        <img
          id="ODST-Front"
          src={require("../../images/ODST/ODST-Front.png")}
          alt="ODST Front"
          className="towers"
        />      
        <img
          id="MC-Front"
          src={require("../../images/MC/MC-Front.png")}
          alt="MC Front"
          className="towers"
        />
        <img
          id="Johnson-Front"
          src={require("../../images/Johnson/Johnson-Front.png")}
          alt="Johnson Front"
          className="towers"
        />
    
      {/* <div id="tower4" class="towers">
        Arbiter
      </div>  */}
    </div>
  );
}

export default Towers;
