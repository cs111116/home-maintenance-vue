import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";
import axios from './plugins/axios.js';
import VueAxios from "vue-axios";
import vuetify from './plugins/vuetify.js';
import "./assets/styles/styles.scss";
import { VueReCaptcha } from "vue-recaptcha-v3";// 從 vue-recaptcha-v3 導入 VueReCaptcha 插件 此命名方式是固定的
import disableOnClick from './directives/disableOnClick';
const pinia = createPinia()
const app = createApp(App);
// app.component('HCaptcha', HCaptcha);
// 使用 VueAxios 插件并配置全局 axios 实例
app.use(VueAxios, axios);
app.use(VueReCaptcha, {
  siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY // 替換為你的 reCAPTCHA siteKey
});
app.use(vuetify);
app.use(pinia);
app.directive('disable-on-click', disableOnClick);
app.use(router);
app.mount("#app");
