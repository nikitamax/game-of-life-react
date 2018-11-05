import React from "react";
import { Route, Switch } from "react-router-dom";
import Grid from "./components/Grid";
import About from "./components/About";

export default () => (
  <Switch>
    <Route path="/" exact component={Grid} />
    <Route path="/about" exact component={About} />
  </Switch>
);
