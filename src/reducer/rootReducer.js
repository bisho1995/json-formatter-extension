import { combineReducers, createStore } from "redux";
import InfoModalReducer from "@reducer/InfoModalReducer";

const rootReducer = combineReducers({ InfoModalReducer });

const store = createStore(rootReducer);

export default store;
