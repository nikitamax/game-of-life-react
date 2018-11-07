import React, { Component } from "react";
import "./index.css";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import Tilt from "react-tilt";
import Logo from "./Logo";
import ColorToggle from "./ColorToggle";

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
      newGrid: [],
      color: "green"
    };
  }

  getRandomGrit = (width, height) => {
    const grid = [];

    for (let r = 0; r <= height; r++) {
      grid[r] = new Array(height);
      for (let c = 0; c <= width; c++) {
        const random = Math.random();
        if (random <= 0.5) {
          grid[r][c] = 0;
        }
        if (random >= 0.5 && random <= 0.75) {
          grid[r][c] = 1;
        }
        if (random >= 0.75) {
          grid[r][c] = 2;
        }
      }
    }

    this.setState({ grid });
  };

  handleAlive = (row, col) => {
    const grid = this.state.grid;
    const newGrid = grid;
    const color = this.state.color;
    if (this.state.play === true) return;
    if (grid[row][col] === 1 || grid[row][col] === 2) {
      newGrid[row][col] = 0;
    } else {
      if (color === "green") newGrid[row][col] = 1;
      else newGrid[row][col] = 2;
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
                  className="alive-green"
                />
              );
            }
            if (cell === 2) {
              return (
                <td
                  onClick={() => this.handleAlive(r, c)}
                  key={c}
                  className="alive-red"
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
        let countGreen = 0;
        let countRed = 0;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c - 1] === 1) countGreen++;
        else if (grid[r - 1][c - 1] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c] === 1) countGreen++;
        else if (grid[r - 1][c] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r - 1][c + 1] === 1) countGreen++;
        else if (grid[r - 1][c + 1] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r][c + 1] === 1) countGreen++;
        else if (grid[r][c + 1] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c + 1] === 1) countGreen++;
        else if (grid[r + 1][c + 1] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c] === 1) countGreen++;
        else if (grid[r + 1][c] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r + 1][c - 1] === 1) countGreen++;
        else if (grid[r + 1][c - 1] === 2) countRed++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > height || c + 1 > width) continue;
        else if (grid[r][c - 1] === 1) countGreen++;
        else if (grid[r][c - 1] === 2) countRed++;

        let count = countGreen + countRed;
        if (grid[r][c] === 1 || grid[r][c] === 2) {
          if (count < 2) {
            newGrid[r][c] = 0;
          } else if (count === 2 || count === 3) {
            if (countGreen > countRed) newGrid[r][c] = 1;
            if (countGreen < countRed) newGrid[r][c] = 2;
            if (countGreen === countRed)
              newGrid[r][c] = Math.random() <= 0.5 ? 1 : 2;
          } else if (count > 3) {
            newGrid[r][c] = 0;
          }
        } else {
          if (count === 3) {
            if (countGreen > countRed) newGrid[r][c] = 1;
            else newGrid[r][c] = 2;
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
    this.getRandomGrit(this.state.size.width, this.state.size.height);
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
  };

  handleInputHeight = e => {
    this.setState({
      inputHeight: +e.target.value
    });
  };

  handleInputWidth = e => {
    this.setState({
      inputWidth: +e.target.value
    });
  };

  reSpeed = e => {
    const levelSpeed = e.target.value;
    switch (levelSpeed) {
      case "0": {
        this.setState({ speed: 100 });
        break;
      }
      case "1": {
        this.setState({ speed: 2000 });
        break;
      }
      case "2": {
        this.setState({ speed: 1000 });

        break;
      }
      case "3": {
        this.setState({ speed: 500 });

        break;
      }
      case "4": {
        this.setState({ speed: 100 });

        break;
      }
      case "5": {
        this.setState({ speed: 50 });

        break;
      }
      case "6": {
        this.setState({ speed: 10 });

        break;
      }
    }
  };

  colorToggle = () => {
    const color = this.state.color;
    if (color === "green") {
      this.setState({ color: "red" });
    } else {
      this.setState({ color: "green" });
    }
    console.log(this.state);
  };

  componentDidMount() {
    this.getRandomGrit(this.state.size.width, this.state.size.height);
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

        <div className="totally-centered">
          <ColorToggle colorToggle={this.colorToggle} />
        </div>

        <div className="button">
          <div style={{ display: "inline-block", marginRight: 10 }}>
            <FormGroup controlId="formControlsSelect">
              <FormControl
                style={{
                  width: 100,
                  height: 35,
                  display: "inline-block"
                }}
                onChange={this.reSpeed}
                componentClass="select"
                placeholder="select"
              >
                <option hidden value="0">
                  Speed
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </FormControl>
            </FormGroup>
          </div>
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
            style={{ marginLeft: 10 }}
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
              marginLeft: 10
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
              display: "inline-block",
              marginLeft: 10
            }}
            type="text"
            value={this.state.value}
            placeholder="Width"
            onChange={this.handleInputWidth}
          />
        </div>

        <table style={{ marginTop: 10 }}>
          <tbody>{field}</tbody>
        </table>
      </div>
    );
  }
}
