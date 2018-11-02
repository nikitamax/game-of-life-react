import React from "react";
import { Route, Switch } from "react-router-dom";
import Grid from "./components/Grid";

export default () => (
  <Switch>
    <Route path="/" exact component={Grid} />
  </Switch>
);
