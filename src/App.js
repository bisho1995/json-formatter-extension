import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Router from "@/Router";
import rootReducer from "@reducer/rootReducer";

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
