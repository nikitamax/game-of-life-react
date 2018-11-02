import React from "react";
import "./index.css";
import VanillaTilt from "vanilla-tilt";

export default class Logo extends React.Component {
  componentDidMount() {
    VanillaTilt.init(this.rootNode, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5
    });
  }
  render() {
    return (
      <div ref={node => (this.rootNode = node)} className="tilt-root">
        <div className="tilt-child">
          <div {...this.props} />
        </div>
      </div>
    );
  }
}
