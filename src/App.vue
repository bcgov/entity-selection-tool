<template>
  <div id="app"></div>
</template>
<script>
import ModalHome from "@/components/ModalHome.vue";
import "buefy/dist/buefy.css";
import json from "@/data/be-data.json";

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
    },
    data: {
      type: {}
    }
  },
  data: function() {
    return {
      langLocal: this.lang,
      sgcLocal: this.sgc,
      dataLocal: this.data
    };
  }, // end data
  mounted: function() {
    this.dataLocal = this.data ? this.data : json;
		this.homeModal();
  },

  methods: {
    homeModal: function() {
      this.$buefy.modal.open({
        parent: this,
        props: {
          lang: this.langLocal,
          sgc: this.sgcLocal,
          data: this.dataLocal
        },
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
/* launch button */
.be-launch-button {
  background-color: #38598a;
  color: #ffffff;
}
.be-launch-button:hover,
.be-launch-button:active {
  background-color: #428bca;
  border-color: #357ebd;
  color: #ffffff;
}
/*Modal Card Header */
.card.be-custom-header {
  height: 40px;
}
.be-modal-title {
  color: white;
  font-size: 2rem;
  size: inherit;
}
.modal-card-head.be-modal-card-head {
  background-color: #274f6e;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
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
  color: #274f6e;
}
/* Modal Card Body*/
.modal-card-body.be-modal-card-body {
  background-color: rgb(207, 232, 252);
  padding-bottom: 0px;
  padding-top: 0px;
}
/*Modal Card Footer */
.modal-card-foot.be-modal-card-foot {
  background-color: rgb(207, 232, 252);
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: flex-end;
  border-top: none;
  color: #595959;
}
a.be-link,
a.be-link-button {
  color: hsl(217, 71%, 53%);
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
/* tooltip */
.be-tooltip-light {
  color: hsl(217, 71%, 53%);
  cursor: pointer;
}
.be-tooltip {
  color: hsl(217, 71%, 53%);
  cursor: pointer;
}
.be-tooltip:hover,
.be-tooltip.is-hovered,
.be-tooltip:focus,
.be-tooltip.is-focused,
.be-tooltip:active {
  color: #274f6e;
}
.be-tooltip.is-top.is-primary:before {
  border-top: 5px solid #274f6e;
}
.be-tooltip.is-primary:after {
  background-color: #274f6e;
  z-index: 55;
}
.be-tooltip.is-multiline:after {
  text-align: left;
}
/* tooltip content */
.be-tooltip.is-primary .tooltip-content:before {
  border-top: 5px solid #274f6e !important;
}
.be-tooltip.is-primary .tooltip-content {
  background-color: #274f6e !important;
  z-index: 55 !important;
}
/* White Content Cards */
.be-question.box {
  padding: 0.5rem;
  margin-top: 1rem;
}
.be-summary.box {
  padding: 0.5rem;
  margin-top: 1rem;
}

/*white card header */
.be-results-title {
  font-weight: 300;
  font-size: 1.75rem;
  color: #274f6e;
  text-transform: uppercase;
  margin-bottom: 6px;
  margin-top: 16px;
  margin-left: 4px;
}
.be-results-entity-title {
  font-weight: 400;
  font-size: 1.5rem;
  color: #274f6e;
  margin-bottom: 0px;
  margin-top: 12px;
  margin-left: 4px;
}
.be-question-title {
  font-weight: 300;
  font-size: 1.75rem;
  color: #274f6e;
  margin-bottom: 6px;
  margin-top: 16px;
  margin-left: 4px;
}
/*white card content */
.card .card-content.be-content {
  background-color: transparent;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0rem;
  padding-bottom: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
}
.card .content .be-nonprofit-list {
  margin-top: 6px;
  margin-bottom: 6px;
  list-style: none;
  margin-left: 0em;
}
.content .be-nonprofit-subtitle {
  color: #274f6e;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 12px;
}
.be-context {
  padding-top: 4px;
  color: #274f6e;
  font-size: 0.9rem;
}
.be-results-text {
  font-size: 1rem;
}
.content p.be-results-header-intro {
  margin-bottom: 0px;
}
.subtitle.be-results-subtitle {
  color: #274f6e;
  font-weight: 600;
}
.subtitle.be-results-subtitle.is-4 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  margin-top: 12px;
}
.subtitle.be-results-subtitle.is-5 {
  font-weight: normal;
  font-size: 1.2rem;
  margin-top: 4px;
  margin-bottom: 4px;
}
.subtitle.be-results-subtitle.is-6 {
  font-weight: normal;
  font-size: 1.15rem;
  margin-bottom: 4px;
}
.be-question-text {
  margin-top: 1rem;
  margin-bottom: 0px;
}
.be-gate-text {
  margin-top: 1rem;
  margin-bottom: 0px;
}
.be-card-content {
  padding-bottom: 10px;
  padding-left: 0px;
  padding-right: 0px;
}
.be-question-form {
  margin-left: 12px;
}
.be-next-steps-list {
  margin-bottom: 16px;
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
  color: #274f6e;
  white-space: normal;
  padding: 4px;
  line-height: 1;
  margin-top: 0px;
}
.be-start-button:hover,
.be-start-button.is-hovered,
.be-start-button:focus,
.be-start-button.is-focused,
.be-start-button:active {
  background-color: rgb(164, 221, 252);
  border-color: rgb(207, 232, 252);
}
/* white card footer */
.be-card-footer {
  height: 60px;
}
.card-footer-item {
  color: #274f6e;
  padding: 0;
}
.be-disclaimer {
  padding-top: 4px;
  color: #274f6e;
  font-size: 0.75rem;
  font-weight: 600;
  font-style: italic;
  overflow-y: auto;
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
  color: hsl(217, 71%, 53%);
  white-space: normal;
  padding: 2px;
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
  color: #274f6e;
  width: 100%;
  height: 100%;
  background-color: rgb(164, 221, 252);
  display: block;
}
/* Progress Bars */
.be-carat-icon {
  color: #274f6e;
}
.subtitle.be-progress-subtitle.is-5 {
  font-weight: 500;
  color: #274f6e;
  margin-bottom: 0px;
}
.subtitle.be-progress-subtitle.is-4 {
  font-weight: 500;
  color: #274f6e;
  margin-bottom: 24px;
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
  color: #274f6e;
}
.be-progress {
  margin-bottom: 5px;
  margin-top: 5px;
  margin-right: 20px;
  margin-left: 20px;
}
.be-progress-summary {
  font-size: 0.9rem;
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
  color: #274f6e;
  border-color: #274f6e;
}
.be-button:focus,
.be-button.is-focused,
.be-button:active {
  background-color: #274f6e;
  border-color: #274f6e;
  box-shadow: 0 0 0 0.125em hsl(203, 44%, 80%);
  color: white;
}
.be-button:hover,
.be-button.is-hovered {
  background-color: #274f6e;
  border-color: #274f6e;
  color: white;
}
.be-footer-logo {
  padding-right: 4px;
  width: auto;
  height: 36px;
  position: absolute;
  right: 150px;
  bottom: 4px;
}
/* for desktop */

@media screen and (min-width: 830px) and (min-height: 620px) {
  /* Modal Card */
  .modal-card.be-card {
    width: 820px;
    height: 600px;
  }

  /* Modal Card Header */
  .be-modal-title {
    font-size: 2rem;
    margin-top: 0px;
  }
  .modal-card-head.be-modal-card-head {
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
  .modal-card-body.be-modal-card-body {
    height: 388px;
  }
  /* White Content Card */
  .be-question.box {
    width: 482px;
    height: 502px;
    z-index: 50;
    position: absolute;
    bottom: 12px;
    left: 10px;
    padding: 16px;
    margin-top: 0rem;
  }
  .be-summary.box {
    width: 592px;
    height: 502px;
    z-index: 50;
    position: absolute;
    bottom: 12px;
    left: 10px;
    padding: 16px;
    margin-top: 0rem;
  }
  /* white card headers */
  .be-question-title {
    font-weight: 400;
    font-size: 1.5rem;
    margin-top: 6px;
    margin-left: 0px;
  }
  .be-results-title {
    font-weight: 400;
    font-size: 1.5rem;
    margin-top: 6px;
    margin-left: 0px;
  }
  /*white card content */
  .card .card-content.be-content {
    padding-top: 1rem;
    height: 362px;
  }
  .be-question-text {
    width: 428px;
  }
  .be-gate-text {
    width: 548px;
  }
  .be-context-icon {
    padding-right: 0px;
    padding-left: 16px;
    font-size: 1rem;
  }
  .be-context-text {
    padding-left: 0px;
  }
  .be-start-button {
    margin-top: 9px;
  }
  /* white card footer */
  .be-form-button {
    padding: 4px;
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
  .be-footer-logo {
    padding-right: 4px;
    width: auto;
    height: 52px;
    position: absolute;
    right: 150px;
    bottom: 10px;
  }
}
@media screen and (min-width: 920px) and (min-height: 620px) {
  /* Modal Card */
  .modal-card.be-card {
    width: 900px;
    height: 600px;
  }
  /* White Content Card */
  .be-question.box {
    width: 524px;
    height: 502px;
    z-index: 50;
    position: absolute;
    /* top: 64px; */
    bottom: 12px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  .be-summary.box {
    width: 636px;
    height: 502px;
    z-index: 50;
    position: absolute;
    bottom: 12px;
    left: 10px;
    padding: 20px;
    margin-top: 0rem;
  }
  /*white card content */
  .be-question-text {
    width: 448px;
  }
  .be-gate-text {
    width: 548px;
  }
  .be-footer-logo {
    padding-right: 16px;
    width: auto;
    height: 76px;
    position: absolute;
    right: 146px;
    bottom: 10px;
  }
}
@media screen and (min-width: 1280px) and (min-height: 768px) {
  /* Modal Card */
  .modal-card.be-card {
    width: 980px;
    height: 668px;
  }
  /* Modal Card Body */
  .modal-card-body.be-modal-card-body {
    height: 406px;
  }
  /* White Content Card */
  .be-question.box {
    width: 568px;
    height: 584px;
  }
  .be-summary.box {
    width: 712px;
    height: 584px;
  }
  /*white card content */
  .card .card-content.be-content {
    /* padding-top: 1rem; */
    height: 444px;
  }
  .be-question-text {
    width: 496px;
  }
  .be-gate-text {
    width: 626px;
  }
  .be-start-button {
    margin-top: 50px;
  }
  /* progress bars */
  .be-entitywrap {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}
</style>
