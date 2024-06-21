import { createApp } from 'vue';
import router from './router/index.js';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/reset.css';
import '@/assets/font/font.scss'
import '@/assets/font/iconfont/iconfont.css'

const app = createApp(App);
app.use(router)
app.use(Antd)


app.mount('#app');
