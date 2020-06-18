
import Vue from "vue";
import BE from "../App.vue";
import ModalHome from "./ModalHome.vue";

const Components = {
  BE,
  ModalHome
};
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;