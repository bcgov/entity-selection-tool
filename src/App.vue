<template>
  <div id="app">
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

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);
export default {
  name: "App",
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
#app {
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
  height: 160px;
}
.modal-card-body {
  background-color: rgb(207, 232, 252);
  height: 360px;
  padding-bottom: 0px;
  padding-top: 0px;
}
.modal-card-foot {
  background-color: rgb(207, 232, 252);
  padding-bottom: 10px;
  padding-top: 10px;
}
.question.box {
  max-width: 520px;
  height: 480px;
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
.card-content {
  background-color: transparent;
  padding: 1rem;
  height: 340px;
}
</style>
