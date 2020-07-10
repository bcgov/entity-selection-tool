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
  font-size: 24px;
  margin-top: 12px;
}

.modal-card-head {
  background-color: #274f6e;

  padding-bottom: 6px;
  height: 120px;
}
.modal-card-body {
  background-color: rgb(207, 232, 252);

  padding-bottom: 0px;
  padding-top: 0px;
}
.modal-card-foot {
  background-color: rgb(207, 232, 252);
  padding-bottom: 10px;
  padding-top: 10px;
  justify-content: flex-end;
  border-top: none;
}
.question.box {
  padding: 0.5rem;
  margin-top: 1rem;
}
.summary.box {
  padding: 0.5rem;
  margin-top: 1rem;
}
.subtitle.be-subtitle {
  color: white;
  margin-bottom: 0px;
}
.be-subheader {
  padding-bottom: 0px;
  visibility: hidden;
  height: 0px;
}
.be-secondary-header {
  visibility: hidden;
  height: 0px;
}
/* .card .custom-header {
  height: 40px;
} */
.card .card-content {
  background-color: transparent;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0rem;
  padding-bottom: 1rem;

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
}
.be-link-button {
  color: #2c5671;
}
.be-link-button:hover,
.be-link-button.is-hovered {
  color: white;
}
.be-button {
  color: #2c5671;
  border-color: #2c5671;
}

.be-button:focus,
.be-button.is-focused,
.be-button:active {
  background-color: #2c5671;
  border-color: #2c5671;
  box-shadow: 0 0 0 0.125em hsl(203, 44%, 80%);
  color: white;
}
.be-button:hover,
.be-button.is-hovered {
  background-color: #2c5671;
  border-color: #2c5671;

  color: white;
}
.be-nav-button {
  margin-bottom: 4px;
  margin-top: 12px;
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

.be-card-content {
  padding-bottom: 10px;
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
.be-progress-title {
  font-size: 14px;
}
.be-progress-box {
  padding-bottom: 0px;
  padding-top: 0px;
  width: 100%;
}
.be-progress-wrapper {
  padding-bottom: 2px;
  padding-top: 24px;
}
/* for desktop */
@media screen and (min-width: 920px) and (min-height: 620px) {
  .be-progress-box {
    padding-bottom: 0px;
    padding-top: 0px;
    width: auto;
  }
  .be-modal-title {
    align-content: center;
    color: white;
    font-size: 30px;
    margin-top: 0px;
  }
  .modal-card {
    width: 900px;
    height: 600px;
  }
  .modal-card-head {
    background-color: #274f6e;
    padding-top: 12px;
    padding-bottom: 6px;
    height: 144px;
  }
  .modal-card-body {
    background-color: rgb(207, 232, 252);
    height: 388px;
  }
  .modal-card-foot {
    background-color: rgb(207, 232, 252);
    padding-bottom: 10px;
    padding-top: 10px;
    justify-content: flex-end;
    border-top: none;
  }
  .question.box {
    width: 520px;
    height: 490px;
    z-index: 50;
    position: absolute;
    top: 80px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .summary.box {
    width: 712px;
    height: 490px;
    z-index: 50;
    position: absolute;
    top: 82px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .subtitle.be-subtitle {
    color: white;
    margin-bottom: 0px;
  }
  .be-subheader {
    padding-bottom: 0px;
    padding-top: 0px;
    padding-left: 0px;
    visibility: visible;
    height: auto;
  }
  .be-secondary-header {
    visibility: visible;
    height: auto;
  }
  .card .custom-header {
    height: 40px;
  }
  .card .card-content {
    background-color: transparent;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 360px;
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
    padding-top: 14px;
    color: #2c5671;
    font-size: 14px;
  }
  .be-results-text {
    font-size: 14px;
  }
  .be-question-text {
    width: 433px;
  }
  /* .be-link-button {
    color: #2c5671;
  }
  .be-link-button:hover,
  .be-link-button.is-hovered,
  .be-link-button:focus,
  .be-link-button.is-focused,
  .be-link-button:active {
    color: white;
  }
  .be-button {
    color: #2c5671;
    border-color: #2c5671;
  }

  .be-button:focus,
  .be-button.is-focused,
  .be-button:active {
    background-color: #2c5671;
    border-color: #2c5671;
    box-shadow: 0 0 0 0.125em hsl(203, 44%, 80%);
    color: white;
  }
  .be-button:hover,
  .be-button.is-hovered {
    background-color: #2c5671;
    border-color: #2c5671;

    color: white;
  } */
  .be-nav-button {
    margin-top: 0px;
  }

  /* .be-carat-icon {
    color: #2c5671;
  }
  .be-sup {
    color: #24465c;
  } */
  .be-question-title {
    font-weight: 50;
    color: #2c5671;
    margin-bottom: 16px;
    margin-top: 6px;
  }
  /* .be-link {
    color: #2c5671;
  } */
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
  /* .be-form-button:disabled {
    background-color: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  } */
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
}
</style>
