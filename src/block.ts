import {getHostname} from "./utils";

chrome.storage.sync.get({"urls": []}).then((result) => {

    let hostNames = result.urls.map(url => getHostname(url));

    console.log("blocked urls ", result.urls);
    console.log("ORIGIN ", window.location.origin)
    console.log("ORIGIN ", window.location)
    if (hostNames.includes(window.location.hostname)) {
        if (isBadTime()) {
            hidePage();
        }
    }
});

function hidePage(): void {
    console.log("HIDE")
    let bodyElement = document.querySelector("body");
        bodyElement.style.display = "none";
        // bodyElement.style.opacity = 0.5;
}


function isBadTime(): boolean {
    let d = new Date(); // current time
    let hours = d.getHours();
    let mins = d.getMinutes();

    return true;
    return hours > 2 && hours < 17;
}

export {};