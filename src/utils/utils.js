export function isChromeExtension() {
  return !!window?.chrome?.runtime?.id;
}
