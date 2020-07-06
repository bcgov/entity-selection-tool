import Vue from "vue";
import App from "./App.vue";
//import i18n from "./i18n";
import Buefy from "buefy";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faAngleDown,
  faAngleUp,
  faUndo
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import i18n from "./i18n";

library.add(faTimes, faAngleDown, faAngleUp, faUndo);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon"
});

Vue.config.productionTip = false;

new Vue({
  //i18n,
  // i18n,
  render: h => h(App)
}).$mount("#app");
