import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/resouce";
import AtComponents from "at-ui";
import "at-ui-style";
import VueParticles from "vue-particles";

Vue.use(AtComponents);
Vue.use(VueParticles); // 粒子效果

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

// this.$Message.error("hahah")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
