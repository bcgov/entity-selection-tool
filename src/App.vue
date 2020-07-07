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
        customClass: "bet-modal",
        canCancel: ["escape"]
      });
    }
  }
};
</script>
<style>
.be-modal-title {
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
.subtitle.be-subtitle {
  color: white;
  margin-bottom: 0px;
}
.be-subheader {
  padding-bottom: 0px;
}
.card .custom-header {
  height: 40px;
}
.card .card-content {
  background-color: transparent;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0rem;
  padding-bottom: 1rem;
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
.card .card-footer {
  height: 80px;
  overflow-y: auto;
}
.be-context {
  padding-top: 4px;
  color: #2c5671;
  font-size: 14px;
}
.be-results-text {
  font-size: 14px;
}
.be-question-text {
  height: 48px;
  margin-top: 16px;
  margin-bottom: 0px;
  color: #2c5671;
}
.be-question-form {
  height: 140px;
}
.buttons {
  height: 60px;
  justify-content: center;
}
.be-form-button {
  width: 30%;
}
.be-form-button:focus,
.be-form-button.is-focused {
  border-color: hsl(217, 71%, 53%);
  box-shadow: 0 0 0 0.125em hsl(217, 71%, 85%);
  color: #363636;
}
.be-nav-button {
  width: 45%;
  margin-left: 8px;
}
.be-carat-icon {
  color: #2c5671;
}
.be-sup {
  color: #24465c;
}
.be-question-title {
  font-weight: 50;
  color: #2c5671;
  margin-bottom: 16px;
  margin-top: 16px;
}
.be-link {
  color: #2c5671;
}
.content .be-results-subtitle {
  color: #24465c;
  font-weight: 400;
}
.be-modal-print-body {
  background-color: white;
  padding: 2em;
  overflow-y: auto;
}
.be-print-modal-head {
  height: 75px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.be-print-modal {
  z-index: 100;
}
.be-answers {
  list-style: disc;
  margin-left: 3%;
  padding: 2px;
}
.be-selected {
  font-weight: bolder;
  font-style: italic;
}
</style>
