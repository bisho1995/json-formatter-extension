import {
  TOGGLE_DISPLAY,
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_PARAMS,
} from "@actions/InfoModalActions";

const initialState = {
  showing: false,
  message: "",
};

export default function infoModalReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DISPLAY:
      return { ...state, showing: !state.showing };
    case SHOW_MODAL:
      return { ...state, showing: true };
    case HIDE_MODAL:
      return { ...state, showing: false };
    case UPDATE_PARAMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
