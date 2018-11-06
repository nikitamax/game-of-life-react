import React, { Component } from "react";
import "./index.css";
import { Button, FormControl } from "react-bootstrap";
import Tilt from "react-tilt";
import Logo from "./Logo";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      speed: 100,
      inputWidth: 0,
      inputHeight: 0,
      size: { width: 36, height: 36 },
      grid: [],
      newGrid: []
    };
  }

  getRandomGrit = (width, height) => {
    const grid = [];

    for (let r = 0; r <= height; r++) {
      grid[r] = new Array(height);
      for (let c = 0; c <= width; c++) {
        grid[r][c] = Math.random() <= 0.5 ? 1 : 0;
      }
    }

    this.setState({ grid });
  };

  handleAlive = (row, col) => {
    const grid = this.state.grid;
    const newGrid = grid;
    if (this.state.play === true) return;
    if (grid[row][col] === 1) {
      newGrid[row][col] = 0;
    } else {
      newGrid[row][col] = 1;
    }

    this.setState({ newGrid });
  };

  renderField = grid => {
    const newGrid = grid.map((row, r) => {
      return (
        <tr key={r}>
          {row.map((cell, c) => {
            if (cell === 1) {
              return (
                <td
                  onClick={() => this.handleAlive(r, c)}
                  key={c}
                  className="alive"
                />
              );
            }
            return <td onClick={() => this.handleAlive(r, c)} key={c} />;
          })}
        </tr>
      );
    });

    return newGrid;
  };

  game = () => {
    const width = this.state.size.width;
    const height = this.state.size.height;
    const grid = this.state.grid;
    let newGrid = [];
    for (let r = 0; r <= height; r++) {
      newGrid[r] = new Array(height);
      for (let c = 0; c <= width; c++) {
        newGrid[r][c] = 0;
      }
    }

    for (let r = 0; r <= height; r++) {
      for (let c = 0; c <= width; c++) {
        let count = 0;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c - 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c - 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r][c - 1] === 1) count++;

        if (grid[r][c] === 1) {
          if (count < 2) {
            newGrid[r][c] = 0;
          } else if (count === 2 || count === 3) {
            newGrid[r][c] = 1;
          } else if (count > 3) {
            newGrid[r][c] = 0;
          }
        } else {
          if (count === 3) {
            newGrid[r][c] = 1;
          }
        }
      }
    }
    this.setState({ grid: newGrid });
  };

  start = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.game, this.state.speed);
    this.setState({ play: true });
  };

  stop = () => {
    clearInterval(this.intervalId);
    this.setState({ play: false });
  };

  randomField = () => {
    this.getRandomGrit(this.state.size);
  };

  clearField = () => {
    const grid = [];
    const width = this.state.size.width;
    const height = this.state.size.height;

    for (let r = 0; r <= height; r++) {
      grid[r] = new Array(height);
      for (let c = 0; c <= width; c++) {
        grid[r][c] = 0;
      }
    }

    this.stop();
    this.setState({ grid });
  };

  reSize = () => {
    const width = this.state.inputWidth;
    const height = this.state.inputHeight;
    if (width > 400 || height > 400) {
      alert("Select a smaller field size");
      return;
    }
    this.setState({
      size: { width, height }
    });
    this.getRandomGrit(width, height);

    console.log(this.state);
  };

  handleInputHeight = e => {
    this.setState({
      inputHeight: +e.target.value
    });
    console.log(this.state);
  };

  handleInputWidth = e => {
    this.setState({
      inputWidth: +e.target.value
    });
    console.log(this.state);
  };

  componentDidMount() {
    this.getRandomGrit(this.state.size.width, this.state.size.height);

    console.log(this.state);
  }

  render() {
    const field = this.renderField(this.state.grid);
    const isPlay = this.state.play;
    const buttonStartStop = !isPlay ? (
      <Button
        style={{ marginRight: "10px" }}
        onClick={this.start}
        bsStyle="success"
      >
        Start
      </Button>
    ) : (
      <Button
        style={{ marginRight: "10px" }}
        onClick={this.stop}
        bsStyle="danger"
      >
        Stop
      </Button>
    );
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

        <div className="button">
          {buttonStartStop}

          <Button
            style={{ marginRight: 10 }}
            onClick={this.randomField}
            bsStyle="primary"
          >
            Random
          </Button>
          <Button onClick={this.clearField}>Clear</Button>

          <Button
            style={{ margin: 10 }}
            bsStyle="warning"
            onClick={this.reSize}
          >
            Change size
          </Button>
          <FormControl
            style={{
              width: 70,
              height: 30,
              display: "inline-block",
              margin: 10
            }}
            type="text"
            value={this.state.value}
            placeholder="Height"
            onChange={this.handleInputHeight}
          />
          <FormControl
            style={{
              width: 70,
              height: 30,
              display: "inline-block"
            }}
            type="text"
            value={this.state.value}
            placeholder="Width"
            onChange={this.handleInputWidth}
          />
        </div>

        <table>
          <tbody>{field}</tbody>
        </table>
      </div>
    );
  }
}
