import "./App.css";
import Gameboard from "./components/Gameboard/Gameboard.jsx";
import Towers from "./components/Towers/Towers.jsx";
import Enemies from "./components/Enemies/Enemies.jsx";
import Canvas from "./components/Canvas/Canvas.jsx"
import HaloTheme from "./images/HaloTheme.mp3"
import React, {Component} from 'react'


class App extends React.Component {
  state = {
    audio: new Audio(HaloTheme),
    isPlaying: false,
  };
 

  playPause = () => {

    // Get state of song
    let isPlaying = this.state.isPlaying;

    if (isPlaying) {
      // Pause the song if it is playing
      this.state.audio.pause();
    } else {

      // Play the song if it is paused
      this.state.audio.play();
    }

    // Change the state of song
    this.setState({ isPlaying: !isPlaying });
  };

  render() {
  return (
    <div className="App">
      <main>
    
        <div className = "gameboard">
          <Canvas />
          {/* <Gameboard /> */}
        </div>
        <div className="tower-choice">
          {/* <Towers /> */}
        </div>
        <div className="enemy">
          {/* <Enemies /> */}
        </div>
      </main>
      <button onClick={this.playPause}>
          Play | Pause
        </button> 
      <footer>
        <div id = "tower-boiz">
          <em>The Tower Boiz</em>
          </div>
        <ul className="navbar-boiz">
          <li>
            <a href="#">Chance</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kinglogan3/" target="_blank">
              King
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abdullah-ga/" target="_blank">
              Abdullah
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hongssam9/" target="_blank">
              Samuel
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
}
export default App;