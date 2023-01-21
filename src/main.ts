import { createApp } from 'vue'
import './style.css'
import App from './components/App.vue'

type URLList = {
  urls: Array<URL>;
}

// chrome.storage.sync.get(["urls"]).then((result) => {
//   console.log(`Value is ${result.urls}`);
// });

// chrome.storage.sync.set({ urls: ["testz"] }).then(() => {
//   console.log("Value is set");
// });
const MOUNT_EL_ID = "extension-div"


// let mountEl = document.getElementById(MOUNT_EL_ID);
// if (mountEl) {
//   mountEl.innerHTML = "";
// }
// mountEl = document.createElement("div");
// mountEl.setAttribute("id", MOUNT_EL_ID);
// document.body.appendChild(mountEl);

// const app = createApp(App).mount(mountEl);
const app = createApp(App).mount('#app')

// setTimeout(() => {
//   console.log(10, app.visible);
// }, 1000)
//
// chrome.runtime.onMessage.addListener(message => {
//   console.log(11, app.visible);
//   if (message.toggleVisible) {
//     app.visible = !app.visible;
//   }
// });