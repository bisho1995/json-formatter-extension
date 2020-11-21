import { saveAs } from "file-saver";

export function isChromeExtension() {
  return !!window?.chrome?.runtime?.id;
}

export function saveJSONFileToDisk(text, name = "") {
  var blob = new Blob([text], { type: "application/json" });
  saveAs(blob, name || `download_${new Date()}.json`);
}
