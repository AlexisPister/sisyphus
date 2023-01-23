import { getHostname } from "/src/utils.ts.js";
chrome.storage.sync.get({ "urls": [] }).then((result) => {
  let hostNames = result.urls.map((url) => getHostname(url));
  console.log("blocked urls ", result.urls);
  console.log("ORIGIN ", window.location.origin);
  console.log("ORIGIN ", window.location);
  if (hostNames.includes(window.location.hostname)) {
    if (isBadTime()) {
      hidePage();
    }
  }
});
function hidePage() {
  console.log("HIDE");
  let bodyElement = document.querySelector("body");
  bodyElement.style.display = "none";
}
function isBadTime() {
  let d = new Date();
  let hours = d.getHours();
  let mins = d.getMinutes();
  return true;
  return hours > 2 && hours < 17;
}
export {};
