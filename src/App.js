import React from "react";
import { Provider } from "react-redux";
import Router from "@/Router";
import store from "@reducer/rootReducer";
import InfoModal from "@/common/components/InfoModal/InfoModal";

export default function App() {
  return (
    <Provider store={store}>
      <InfoModal>
        <Router />
      </InfoModal>
    </Provider>
  );
}
