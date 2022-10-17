import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import './assets/myfont/iconfont.css'
import BaiduMap from 'vue-baidu-map-3x';

const pinia = createPinia()
createApp(App).use(router).use(pinia).use(Antd).use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'gzN01NOixr3m73xBFbDHspE3XpKQ7ul0',
  v:'3.0'  // 默认使用3.0
}).mount('#app')
