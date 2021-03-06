import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/http'
import 'font-awesome/css/font-awesome.css'
import './assets/global.less'



Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http.http;
Vue.prototype.$echarts = echarts

let vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

export default vue