<script lang="ts" setup>
import {computed, onBeforeMount, Ref, ref, toRaw} from "vue";
import axios from "axios";
import {getCurrentWeek} from "../utils";

const urlsBlocked: Ref<Array<URL>> = ref([]);
const newSite: Ref<String> = ref('');
let isLoggedInTwitter: Ref<Boolean> = ref(false);
let message: Ref<String> = ref('');
let isWeekStarted: Ref<String> = ref(false);


// DELETE FOR TESTS
// chrome.storage.sync.set({"weekToStarted": []})

onStart();

function onStart(): void {
  getIfProductivityStarted();
  fillUrlsFromStorage();;
}

function getIfProductivityStarted(): void {
  chrome.storage.sync.get(["weekToStarted"]).then((result) => {
        let weekToStarted = result.weekToStarted;
        if (weekToStarted && weekToStarted.length > 0) {
          const currentWeek = getCurrentWeek();
          isWeekStarted.value = weekToStarted[currentWeek];
          console.log("ST ", isWeekStarted);
          return isWeekStarted;
        } else {
          return false;
        }
      }
  )
}

function fillUrlsFromStorage(): void {
  chrome.storage.sync.get(["urls"]).then((result) => {
    if (result.urls && result.urls.length > 0) {
      result.urls.forEach(url => {
        urlsBlocked.value.push(new URL(url));
      })
    }
  });
}

function addUrl(): void {
  let newSiteUrl = toUrl(newSite.value);
  urlsBlocked.value.push(newSiteUrl);
  if (newSiteUrl) {
    let sites = toRaw(urlsBlocked.value).map(v => v.href);
    console.log("ds ", sites)
    chrome.storage.sync.set({urls: sites}).then((result) => {
      chrome.storage.sync.get(["urls"]).then((result) => {
        console.log("RESULTS JUST SAVED: ", result.urls)
      });
    });
  } else {
    console.log("not url format")
  }
}

function deleteSite(site): void {
  urlsBlocked.value = urlsBlocked.value.filter(url => url != site);
  chrome.storage.sync.set({urls: urlsBlocked.value});
}

function toUrl(input) {
  let url;
  try {
    url = new URL(input);
    return url;
  } catch (e) {
    return false;
  }
}

function clear() {
  chrome.storage.sync.set({urls: []});
  urlsBlocked.value = [];
}

function loginWithTwitter() {
  try {
    // redirect the user to the server for authentication
    let loginUrl = "http://localhost:8080/login";
    // window.location.href = loginUrl;
    window.open(loginUrl, '_blank').focus();
  } catch (error) {
    console.log(error)
  }
}

async function checkLoggedInTwitter(): void {
  console.log("Is logged")
  return axios.get('http://localhost:8080/twitter/check-auth')
      .then(response => {
        if (response.data.isAuth) {
          console.log("COOOK ", document.cookie);
          isLoggedInTwitter.value = true;
        } else {
          isLoggedInTwitter.value = false;
        }
      })
      .catch(error => {
        console.log(error);
      });
}

function startProductiveDay(): void {
  isWeekStarted.value = true;
  chrome.storage.sync.get(["weekToStarted"]).then((result) => {
    let weekToStarted = result.weekToStarted;
    const currentWeek = getCurrentWeek();
    weekToStarted[currentWeek] = true;
    chrome.storage.sync.set({"weekToStarted": weekToStarted});
  });
}

function postTweet(): void {
  axios.post('http://localhost:8080/twitter/post-tweet', {message: "TEST"})
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err);
      })
}

checkLoggedInTwitter();
setInterval(checkLoggedInTwitter, 2000);

</script>

<template>
  <div id="sites">
    <div v-for="site of urlsBlocked" class="site">
      {{ site }}
      <!--      <span class="close-span">&times;</span>-->
      <button class="close-btn" @click="deleteSite(site)">&times;</button>
    </div>
  </div>

  <div id="options">
    <input id="input-new-site" v-model="newSite" placeholder="Add new site">
    <div>
      <!--          <button @click="urlBlocked.push(newSite)">Add</button>-->
      <button @click="addUrl">Add</button>
    </div>

    <div>
      <!--          <button @click="urlBlocked.push(newSite)">Add</button>-->
      <button @click="clear">Clear</button>
    </div>

    <div>
      <p v-if="isWeekStarted">Sisyphus is walking the mountain.</p>
      <button v-else @click="startProductiveDay">Start a Productive Day</button>
    </div>
  </div>

  <div>
    <p v-if="isLoggedInTwitter">Logged in Twitter.</p>
    <button v-else id='loginTwitterButton' @click="loginWithTwitter">Log with Twitter</button>
  </div>

  <div>
    <!--    <input v-model="message" placeholder="edit me" />-->
    <button @click="postTweet">BUT</button>
  </div>

</template>

<style scoped>

#sites {
  display: flex;
  flex-direction: column;
  column-gap: 5px;
  width: 60vw;
}

.site {
  border: 1px solid black;
  /*padding: 2%;*/
  /*width: 60vw;*/
  width: 80%;
  /*vertical-align: middle;*/
}

.close-span {
  float: right;
  margin-right: 6px;
  border: 1px solid black;
  /*padding: 0;*/
  line-height: 10px;
  font-size: 14pt;
  /*line-height: 60%;*/
}

.close-btn {
  float: right;
  /*margin-right: 6px;*/
  border: 1px solid black;
  padding: 0;
  /*line-height: 60%;*/
  margin: auto;
  border-radius: 0px;
}

#options {
  display: flex;
  flex-direction: column;
  column-gap: 5px;
  width: 60vw;
}

#input-new-site {
  padding: 0;
  /*border: 0;*/
  /*width: 20px;*/
  /*width: 60vw;*/
  width: 80%;
  /*padding: 2%;*/
}
</style>
