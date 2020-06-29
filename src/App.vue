<template>
  <div id="app">
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
  justify-content: flex-end;
}
.question.box {
  width: 520px;
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
.card .custom-header {
  height: 60px;
}
.card .card-content {
  background-color: transparent;
  padding: 1rem;
  height: 320px;
  overflow-y: auto;
}
.card .content .be-nonprofit-list {
  margin-top: 6px;
  margin-bottom: 6px;
}
.card-footer-item {
  color: #2c5671;
}
.be-results-text {
  font-size: 14px;
}
.be-question-text {
  height: 48px;
}
.be-question-form {
  height: 140px;
}
.buttons {
  height: 60px;
  justify-content: center;
}
.be-button {
  width: 30%;
}
</style>
