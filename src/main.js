import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/styles/styles.scss';

// 設置api token
const token = process.env.VUE_APP_API_TOKEN;
axios.defaults.headers.common['api_token'] = `Bearer ${token}`;
// 设置 axios 的基础 URL
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
// 设置全局请求头
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App);

// 使用 VueAxios 插件并配置全局 axios 实例
app.use(VueAxios, axios);

app.use(router);
app.mount('#app');
