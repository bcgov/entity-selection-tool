import Vue from "vue";
import App from "./App.vue";
<<<<<<< HEAD
//import i18n from "./i18n";
=======

import i18n from "./i18n";
>>>>>>> dynamic-components
import Buefy from "buefy";

import UIkit from "uikit"; //remove later
import Icons from "uikit/dist/js/uikit-icons"; //remove later
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import i18n from "./i18n";

library.add(faTimes);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy);
UIkit.use(Icons); //remove later
Vue.config.productionTip = false;

new Vue({
<<<<<<< HEAD
  //i18n,

  // i18n,
=======
  i18n,
>>>>>>> dynamic-components
  render: h => h(App)
}).$mount("#app");
