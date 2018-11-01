import React, { Component } from "react";
import "./index.css";

export default class Cell extends Component {
  constructor(props) {
    super(props);

    const { row, col, alive } = props;

    this.state = {
      row,
      col,
      alive
    };
  }

  render() {
    const className = this.state.alive ? "alive" : "";
    return <td className={className} />;
  }
}
