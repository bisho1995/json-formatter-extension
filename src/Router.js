import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LinterPage from "@pages/linter/Linter";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path='*' component={LinterPage} />
      </Switch>
    </Router>
  );
}
