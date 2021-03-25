import Vue from "vue";

/* A modern alternative to CSS resets */
import "normalize.css/normalize.css";

import Cookies from "js-cookie";

/* element 全局&样式 */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import '@/styles/index.scss' // global css

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
