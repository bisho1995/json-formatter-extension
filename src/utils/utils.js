import { saveAs } from "file-saver";

export function isChromeExtension() {
  return !!window?.chrome?.runtime?.id;
}

export function saveJSONFileToDisk(text, name = "") {
  var blob = new Blob([text], { type: "application/json" });
  saveAs(blob, name || `download_${new Date()}.json`);
}

export const Environment = {
  //mobile or desktop compatible event name, to be used with '.on' function
  TOUCH_DOWN_EVENT_NAME: "mousedown touchstart",
  TOUCH_UP_EVENT_NAME: "mouseup touchend",
  TOUCH_MOVE_EVENT_NAME: "mousemove touchmove",
  TOUCH_DOUBLE_TAB_EVENT_NAME: "dblclick dbltap",

  isAndroid: function () {
    return navigator.userAgent.match(/Android/i);
  },
  isBlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  isIOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  isOpera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  isWindows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  isMobile: function () {
    return (
      Environment.isAndroid() ||
      Environment.isBlackBerry() ||
      Environment.isIOS() ||
      Environment.isOpera() ||
      Environment.isWindows()
    );
  },
};
