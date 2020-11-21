import React from "react";
import LinterPage from "@pages/linter/Linter";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function rootReducer(state = {}, action) {
  return state;
}

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path='*' component={LinterPage} />
      </Router>
    </Provider>
  );
}
