import React, { Component } from "react";
import "./colorToggle.scss";

export default class ColorToggle extends Component {
  render() {
    const { colorToggle } = this.props;
    return (
      <label className="power">
        <input onClick={colorToggle} type="checkbox" />
        <div />
      </label>
    );
  }
}
