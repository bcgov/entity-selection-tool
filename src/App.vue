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
    },
    sgc: {
      type: String,
      default: "59"
    }
  },
  data: function() {
    return {
      langLocal: this.lang,
      sgcLocal: this.sgc
    };
  }, // end data
  methods: {
    homeModal: function() {
      this.$buefy.modal.open({
        parent: this,
        props: { lang: this.langLocal, sgc: this.sgcLocal },
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
/*Modal Card Header */
.card .custom-header {
  height: 40px;
}
.be-modal-title {
  color: white;
  font-size: 24px;
  size: inherit;
}
.modal-card-head {
  background-color: #274f6e;
  padding-bottom: 6px;
  height: 120px;
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
.be-nav-button {
  margin-top: 6px;
}
.button.is-light.is-outlined.be-nav-button:hover,
.button.is-light.is-outlined.be-nav-button.is-hovered {
  color: #2c5671;
}
/* Modal Card Body*/
.modal-card-body {
  background-color: rgb(207, 232, 252);
  padding-bottom: 0px;
  padding-top: 0px;
}
/*Modal Card Footer */
.modal-card-foot {
  background-color: rgb(207, 232, 252);
  padding-bottom: 10px;
  padding-top: 10px;
  justify-content: flex-end;
  border-top: none;
  color: #595959;
}
a.be-link,
a.be-link-button {
  color: #366b8c;
}
a.be-link:hover,
a.be-link-button:hover,
a.be-link.is-hovered,
a.be-link-button.is-hovered a.be-link:focus,
a.be-link-button:focus,
a.be-link.is-focused,
a.be-link-button.is-focused,
a.be-link:active,
.be-link-button:active {
  color: #274f6e;
}
.be-tooltip {
  color: #366b8c;
  cursor: pointer;
}
.be-tooltip:hover,
.be-tooltip.is-hovered,
.be-tooltip:focus,
.be-tooltip.is-focused,
.be-tooltip:active {
  color: #274f6e;
}
.b-tooltip.is-top.is-primary:before {
  border-top: 5px solid #274f6e;
}
.be-tooltip.is-primary:after {
  background-color: #274f6e;
  z-index: 55;
}
.b-tooltip.is-multiline:after {
  text-align: left;
}
/* White Content Card */
.question.box {
  padding: 0.5rem;
  margin-top: 1rem;
}
.summary.box {
  padding: 0.5rem;
  margin-top: 1rem;
}
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
.be-card-footer {
  height: 60px;
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
.be-disclaimer {
  padding-top: 2px;
  color: #2c5671;
  font-size: 13px;
  font-weight: 500;
  font-style: italic;
  overflow-y: auto;
}
.be-results-text {
  font-size: 16px;
}
.content p.be-results-header-intro {
  margin-bottom: 0px;
}
.be-results-title {
  font-weight: 50;
  color: #2c5671;
  text-transform: uppercase;
  margin-bottom: 16px;
  margin-top: 16px;
}
.be-intro-title {
  font-size: 20px;
  font-weight: 50;
  color: #2c5671;

  margin-bottom: 16px;
  margin-top: 0px;
}
.subtitle.be-results-subtitle {
  color: #2c5671;
  font-weight: 400;
}
.subtitle.be-results-subtitle.is-4 {
  font-size: 22px;
  margin-bottom: 18px;
  margin-top: 8px;
}
.subtitle.be-results-subtitle.is-5 {
  font-weight: normal;
  font-size: 19px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.subtitle.be-results-subtitle.is-6 {
  font-weight: normal;
  font-size: 17px;
  margin-bottom: 4px;
}
.be-question-text {
  margin-top: 16px;
  margin-bottom: 0px;
}
.be-gate-text {
  /*  padding-top: 16px; */
  margin-top: 16px;
  margin-bottom: 0px;
}
.be-question-title {
  font-weight: 50;
  color: #2c5671;
  margin-bottom: 16px;
  margin-top: 16px;
}
.be-card-content {
  padding-bottom: 10px;
  padding-left: 0px;
  padding-right: 0px;
}
.be-question-form {
  margin-left: 12px;
}
.be-start-button {
  width: 100%;
  height: 48px;
  display: block;
  background-color: rgb(207, 232, 252);
  border-color: transparent;
  border-radius: 2px;
  -webkit-box-shadow: none;
  box-shadow: none;
  text-decoration: none;
  color: #2c5671;
  white-space: normal;
  padding: 4px;
  line-height: 1;
}
.be-start-button:hover,
.be-start-button.is-hovered,
.be-start-button:focus,
.be-start-button.is-focused,
.be-start-button:active {
  background-color: rgb(164, 221, 252);
  border-color: rgb(207, 232, 252);
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
  white-space: normal;
  padding: 4px;
  line-height: 1;
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
  background-color: rgb(207, 232, 252);
  display: block;
}
.be-context-icon {
  padding-right: 0px;
  padding-left: 16px;
  font-size: 16px;
}
.be-context-text {
  padding-left: 0px;
}
.be-next-steps-list {
  margin-bottom: 16px;
}
/* Progress Bars */
.be-carat-icon {
  color: #2c5671;
}
.subtitle.be-progress-subtitle.is-5 {
  font-weight: 500;
  color: #2c5671;
  margin-bottom: 0px;
}
.subtitle.be-progress-subtitle.is-4 {
  font-weight: 500;
  color: #2c5671;
  margin-bottom: 24px;
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
p.be-emphasis {
  color: #2c5671;
}
.be-progress {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 20px;
}
.be-progress-summary {
  font-size: 14px;
}
.be-entitywrap {
  border-bottom-style: solid;
  border-bottom-color: #edf3f7;
  padding-top: 5px;
}
.notification.be-notification {
  padding: 1.25rem 1.25rem 1.25rem 1.25rem;
}
/* Print Modal */
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
#be-results-list {
  list-style: none;
}
#be-nonprofit-list {
  list-style: none;
}
/* Print Modal Buttons */
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
/* for desktop */
@media screen and (min-width: 920px) and (min-height: 620px) {
  /* Modal Card */
  .modal-card {
    width: 900px;
    height: 600px;
  }
  /* Modal Card Header */
  .be-modal-title {
    font-size: 30px;
    margin-top: 0px;
  }
  .modal-card-head {
    padding-top: 12px;
    height: 144px;
  }
  .be-subheader {
    padding-top: 0px;
    padding-left: 0px;
    visibility: visible;
    height: auto;
  }
  .be-secondary-header {
    visibility: visible;
    height: auto;
  }
  .be-nav-button {
    margin-top: 0px;
  }
  /* Modal Card Body */
  .modal-card-body {
    height: 388px;
  }
  /* White Content Card */
  .question.box {
    width: 520px;
    height: 500px;
    z-index: 50;
    position: absolute;
    top: 72px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .summary.box {
    width: 620px;
    height: 500px;
    z-index: 50;
    position: absolute;
    top: 72px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .welcome.box {
    width: 712px;
    height: 500px;
    z-index: 50;
    position: absolute;
    top: 72px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .card .card-content {
    padding-top: 1rem;
    height: 360px;
  }
  .be-question-text {
    width: 433px;
  }

  .be-question-title {
    margin-top: 6px;
  }
  .be-results-title {
    margin-top: 6px;
  }
  /* Progress Bars */
  .subtitle.be-progress-subtitle.is-5 {
    visibility: hidden;
    height: 0px;
    margin-bottom: 0px;
  }
  .subtitle.be-progress-subtitle.is-4 {
    visibility: hidden;
    height: 0px;
    margin-bottom: 0px;
  }

  .be-progress-box {
    width: auto;
  }
}
</style>
