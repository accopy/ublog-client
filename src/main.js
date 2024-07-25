import { createApp } from 'vue';
import router from './router/index.js';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import '@/assets/font/font.scss'
import '@/assets/font/iconfont/iconfont.css'
import pinia from './stores/index.js';
const app = createApp(App);

app.use(router)
app.use(pinia)
app.use(Antd)


app.mount('#app');
