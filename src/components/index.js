import Vue from "vue";
import BE from "../App.vue";
const Components = {
  BE
};
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});
export default Components;
