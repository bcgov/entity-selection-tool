import Vue from "vue";
import BusinessStructuresTool from "../App.vue";
const Components = {
  BusinessStructuresTool
};
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;
