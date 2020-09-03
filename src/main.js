import Vue from "vue";
import App from "./App.vue";
const Printd = () => import("printd");
const pdfMake = () => import("pdfmake/build/pdfmake.js");
const pdfFonts = () => import("pdfmake/build/vfs_fonts.js");
Vue.use(pdfMake);
Vue.use(pdfFonts);
Vue.use(Printd);
//import Buefy from "buefy";
import { Button, Collapse, Radio, Progress, Tooltip } from "buefy";

Vue.use(Button);
Vue.use(Collapse);
Vue.use(Radio);
Vue.use(Progress);
Vue.use(Tooltip);
import { Modal } from "buefy";

Vue.use(Modal, {
  defaultIconComponent: "font-awesome-icon"
});

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
/* 
Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon"
}); */

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
