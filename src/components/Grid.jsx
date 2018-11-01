import React, { Component } from "react";
import "./index.css";

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      speed: 100,
      size: 36,
      grid: [],
      newGrid: []
    };
  }

  getRandomGrit = () => {
    const grid = [];
    const size = this.state.size;

    for (let r = 0; r <= size; r++) {
      grid[r] = new Array(size);
      for (let c = 0; c <= size; c++) {
        grid[r][c] = Math.random() <= 0.5 ? 1 : 0;
      }
    }

    this.setState({ grid });
  };

  renderField = grid => {
    const newGrid = grid.map((row, r) => {
      return (
        <tr key={r}>
          {row.map((cell, i) => {
            if (cell === 1) {
              return <td key={i} className="alive" />;
            }
            return <td key={i} />;
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

  componentDidMount() {
    this.getRandomGrit();
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.game, this.state.speed);
  }

  render() {
    const field = this.renderField(this.state.grid);

    return (
      <table>
        <tbody>{field}</tbody>
      </table>
    );
  }
}
