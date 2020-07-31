import Vue from "vue";
import BusinessStructureTool from "../App.vue";
const Components = {
  BusinessStructureTool
};
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;
