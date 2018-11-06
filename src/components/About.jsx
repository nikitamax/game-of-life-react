import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Tilt from "react-tilt";
import Logo from "./Logo";
import YouTube from "react-youtube";

export default class About extends Component {
  render() {
    const opts = {
      height: "420",
      width: "840",
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div>
        <Tilt
          className="Tilt"
          options={{ max: 25 }}
          style={{ height: 0, width: 250 }}
        >
          <div className="Tilt-inner"> 👽 </div>
        </Tilt>
        <div className="totally-centered">
          <Logo>
            <div className="totally-centered">Game Of Life</div>
          </Logo>
        </div>
        <Jumbotron style={{ margin: 20 }}>
          <p style={{ margin: 10 }}>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970.
          </p>
          <p>
            <Button
              style={{ margin: 10 }}
              href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life"
              target="_blank"
              bsStyle="primary"
            >
              Learn more
            </Button>
          </p>
        </Jumbotron>
        <div className="totally-centered">
          <YouTube videoId="-FaqC4h5Ftg" opts={opts} onReady={this._onReady} />
        </div>
      </div>
    );
  }
}
