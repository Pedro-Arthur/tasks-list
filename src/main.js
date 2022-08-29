import Vue from "vue";
import mdiVue from "mdi-vue/v2";
import * as mdijs from "@mdi/js";

import store from "./store";

import App from "./App.vue";

require("./theme/global-styles");

Vue.config.productionTip = false;

Vue.use(mdiVue, {
  icons: mdijs,
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
