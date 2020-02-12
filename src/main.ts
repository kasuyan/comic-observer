import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

if ("serviceWorker" in navigator) {
  const path = process.env.VUE_APP_ASSETS_PATH || "";
  const swPath = path + "sw.js";
  navigator.serviceWorker.register(swPath).catch(() => {});
}
