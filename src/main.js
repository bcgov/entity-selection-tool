import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faAngleDown,
  faAngleUp,
  faUndo,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faAngleDown, faAngleUp, faUndo, faExclamationCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon"
});

// Import customElement for Web component option with build-lib
import vueCustomElement from "vue-custom-element";
Vue.use(vueCustomElement);
Vue.customElement("business-entity-tool", App);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
