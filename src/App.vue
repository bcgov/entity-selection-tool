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
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  data: function() {
    return {
      langLocal: this.lang
    };
  }, // end data
  methods: {
    homeModal: function() {
      this.$buefy.modal.open({
        parent: this,
        props: { lang: this.langLocal },
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
  height: 478px;
  z-index: 50;
  position: absolute;
  top: 80px;
  left: 10px;
}
.summary.box {
  width: 712px;
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
  height: 340px;
  overflow-y: auto;
}
.card .content .be-nonprofit-list {
  margin-top: 6px;
  margin-bottom: 6px;
  list-style: none;
  margin-left: 0em;
}
.content .be-nonprofit-subtitle {
  color: #24465c;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 12px;
}

.card-footer-item {
  color: #2c5671;
  padding: 0;
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
  margin-top: 16px;
  margin-bottom: 0px;
  width: 433px;
}

.be-button:focus,
.be-button.is-focused {
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
.be-intro-text {
  font-size: 14px;
}
.be-card-content {
  padding-bottom: 20px;
  padding-left: 0px;
  padding-right: 0px;
}
.be-question-form {
  margin-left: 12px;
}
.be-form-button {
  width: 100%;
  height: 100%;
  display: block;
  background-color: transparent;
  border-color: transparent;
  border-radius: 0%;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-decoration: none;
  color: #2c5671;
  line-height: 3;
  padding: 0;
}
.be-form-button:disabled {
  background-color: transparent;
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.be-form-button:hover,
.be-form-button.is-hovered,
.be-form-button:focus,
.be-form-button.is-focused,
.be-form-button:active {
  box-shadow: 0, 0, 0, 0;
  border: none;
  border-radius: 0%;
  color: #363636;
  width: 100%;
  height: 100%;
  background-color: #c8ddea;
  display: block;
}
</style>
