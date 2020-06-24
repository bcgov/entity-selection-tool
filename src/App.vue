<i18n>
{
  "en": {
    "business_structures": "Business Structure Title"
  },
   "fr": {
    "business_structures": "Business Structure Title - French"
  }
}
</i18n>

<template>
  <div id="myapp">
    <h1 style="font-size:40px">
      {{ $t("business_structures") }}
    </h1>
    <p>Powered by BizPaL</p>
    <br />
    <b-button @click="homeModal()">
      Start Business Structures Widget
    </b-button>
  </div>
</template>
<script>
import ModalHome from "@/components/ModalHome.vue";
import Vue from "vue";
require("./i18n");

import Buefy from "buefy";
Vue.use(Buefy);

import "buefy/dist/buefy.css";

Vue.use(Buefy);
export default {
  name: "BE",
  created(){
    this.$i18n.locale = "en";
  },
  methods: {
    homeModal: function() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalHome,
        hasModalCard: true,
        customClass: "bet-modal"
      });
    }
  }
};
</script>
<style>
#myapp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #edf3f7;
  background-color: #274f6e;
}
h1 {
  align-content: center;
  color: white;
  font-size: 30px;
}
.modal-card {
  width: 900px;
}
.modal-card-head {
  background-color: #274f6e;
  padding-bottom: 6px;
}
.modal-card-body {
  background-color: rgb(207, 232, 252);
  min-height: 400px;

  padding: 10px;
}
.modal-card-foot {
  background-color: rgb(207, 232, 252);
}
.question.box {
  max-width: 520px;
  z-index: 50;
  position: absolute;
  top: 80px;
  left: 10px;
}
h3 {
  font-size: 16px;
}
h2 {
  font-size: 22px;
}
.be-subtitle {
  padding-bottom: 0px;
}
</style>
