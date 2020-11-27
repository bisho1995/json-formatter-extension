import { saveJSONFileToDisk } from "@utils/utils";
import store from "@reducer/rootReducer";
import { UPDATE_PARAMS } from "@/actions/InfoModalActions";
import copy from "copy-to-clipboard";

export default class JsonService {
  static INVALID_JSON_MESSAGE = "JSON is invalid";
  constructor({ spacing } = {}) {
    this.spacing = spacing || 2;
  }
  setSpacing(spacing) {
    this.spacing = spacing;

    return this;
  }

  isValidJson(json) {
    try {
      JSON.parse(json, null, this.spacing);
      return true;
    } catch (error) {
      return false;
    }
  }
  formatJsonAsync(jsonStr) {
    return new Promise((resolve, reject) => {
      if (!this.isValidJson(jsonStr))
        return reject(JsonService.INVALID_JSON_MESSAGE);
      const formattedJSON = JSON.stringify(
        JSON.parse(jsonStr),
        null,
        this.spacing
      );

      return resolve(formattedJSON);
    });
  }

  saveToDiskAsync(json = {}, filename = "") {
    return new Promise((res, reject) => {
      if (!this.isValidJson(json)) reject(JsonService.INVALID_JSON_MESSAGE);
      saveJSONFileToDisk(json, filename);
      return res(this);
    });
  }

  async getLinkAsync(json = {}) {
    store.dispatch({
      type: UPDATE_PARAMS,
      payload: { showing: true, message: "Please wait fetching link..." },
    });
    const payload = {
      json: typeof json === "string" ? JSON.parse(json) : json,
    };
    console.log(payload);
    try {
      let resp = await fetch("http://localhost:8080/jsons", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const { url } = await resp.json();

      store.dispatch({
        type: UPDATE_PARAMS,
        payload: {
          showing: true,
          message: `Your link is ${url}\n It is copied to clipboard`,
        },
      });
      requestAnimationFrame(() => copy(url));
    } catch (error) {
      console.error(error);
    }
  }
}
