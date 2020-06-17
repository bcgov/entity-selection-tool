import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy);
UIkit.use(Icons);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
