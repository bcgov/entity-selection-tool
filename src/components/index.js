import Vue from "vue";
import BE from "../App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Buefy from "buefy";
library.add(faTimes);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "font-awesome-icon"
});

const Components = {
  BE
};
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;
