import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import utils from "./utils/utils.js";
// import connectWallet from "./utils/web3/connectWallet.js";
import ethereum from "./utils/ethereum.js"
import eventHub from "./utils/eventHub.js";
import VueGtagPlugin from "vue-gtag";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import "./assets/main.css";
import "./assets/element.css";
import "./assets/fonts/font.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Buffer } from "buffer";
if (window.Buffer === "undefined" || window.Buffer == undefined) {
  window.Buffer = Buffer;
}

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(VueGtagPlugin, {
  config: {
    id: "G-XTDGBWFH32",
  },
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

router.beforeEach((to, from, next) => {
  eventHub.$emit("tabNav", to);
  document.querySelector("#app").scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.pageYOffset = 0;
  next();
});

app.provide("$eventHub", eventHub);
app.provide("$utils", utils);
app.provide("$ethereum", ethereum);

app.mount("#app");
