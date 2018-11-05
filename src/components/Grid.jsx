import React, { Component } from "react";
import "./index.css";
import { Button, FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import Tilt from "react-tilt";
import Logo from "./Logo";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      speed: 100,
      size: 36,
      grid: [],
      newGrid: []
    };
  }

  getRandomGrit = size => {
    const grid = [];

    for (let r = 0; r <= size; r++) {
      grid[r] = new Array(size);
      for (let c = 0; c <= size; c++) {
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
    const size = this.state.size;
    const grid = this.state.grid;
    let newGrid = [];
    for (let r = 0; r <= size; r++) {
      newGrid[r] = new Array(size);
      for (let c = 0; c <= size; c++) {
        newGrid[r][c] = 0;
      }
    }

    for (let r = 0; r <= size; r++) {
      for (let c = 0; c <= size; c++) {
        let count = 0;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r - 1][c - 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r - 1][c] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r - 1][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r + 1][c + 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r + 1][c] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
        else if (grid[r + 1][c - 1] === 1) count++;
        if (r - 1 < 0 || c - 1 < 0 || r + 1 > size || c + 1 > size) continue;
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
    const size = this.state.size;

    for (let r = 0; r <= size; r++) {
      grid[r] = new Array(size);
      for (let c = 0; c <= size; c++) {
        grid[r][c] = 0;
      }
    }

    this.stop();
    this.setState({ grid });
  };

  reSize = e => {
    this.setState({ size: +e.target.value });
    this.getRandomGrit(+e.target.value);

    console.log(this.state);
  };

  componentDidMount() {
    this.getRandomGrit(this.state.size);

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
            style={{ marginRight: "10px" }}
            onClick={this.randomField}
            bsStyle="primary"
          >
            Random
          </Button>
          <Button onClick={this.clearField}>Clear</Button>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel style={{ color: "white" }}>Choose size</ControlLabel>
            <FormControl
              onChange={this.reSize}
              componentClass="select"
              placeholder="select"
            >
              <option value="36">36x36</option>
              <option value="16">16x16</option>
              <option value="56">56x56</option>
            </FormControl>
          </FormGroup>
        </div>

        <table>
          <tbody>{field}</tbody>
        </table>
      </div>
    );
  }
}
