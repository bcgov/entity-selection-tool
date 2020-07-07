<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2 class="title be-question-title is-4">
            {{ title }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <p class="be-results-text">{{ body }}</p>
          <div>
            <h3 class="subtitle be-results-subtitle is-5">
              {{ $t("advantages") }}
            </h3>
            <ul class="be-results-text">
              <span v-html="advantages"></span>
            </ul>
          </div>
          <br />
          <div>
            <h3 class="subtitle be-results-subtitle is-5">
              {{ $t("disadvantages") }}
            </h3>
            <ul class="be-results-text">
              <span v-html="disadvantages"></span>
            </ul>
          </div>
        </template>
        <template v-slot:footertext>
          <a href="#" class="card-footer-item" @click="onClickButton">{{
            $t("restart")
          }}</a>
          <a href="#" class="card-footer-item" @click="printEntity">
            {{ $t("print_results") }}</a
          >
          <a href="#" class="card-footer-item">{{ $t("print_summaries") }}</a>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>
    <!-- modal for results print view -->
    <b-modal
      :active.sync="isCardModalActive"
      :can-cancel="canCancel"
      full-screen
      aria-role="dialog"
      aria-modal
      class="be-print-modal"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("results") }}</span>
        </header>
        <section id="printBody" ref="PrintBody" class="be-modal-print-body">
          <div>
            <h1 class="subtitle is-3">{{ $t("business_structure") }}</h1>
            <h2 class="subtitle is-4">
              {{ title }}
            </h2>
            <div>
              <p>{{ body }}</p>
              <br />
            </div>
            <div>
              <h3 class="subtitle is-5">{{ $t("advantages") }}</h3>
              <ul>
                <span v-html="advantages"></span>
              </ul>
              <br />
            </div>
            <div>
              <h3 class="subtitle is-5">{{ $t("disadvantages") }}</h3>
              <ul>
                <span v-html="disadvantages"></span>
              </ul>
              <br />
            </div>
          </div>
          <div>
            <h1 class="subtitle is-3">{{ $t("questions_answers") }}</h1>
            <i18n path="text_answers" tag="h2" class="subtitle is-4">
              <template v-slot:format>
                <span class="has-text-weight-bold is-italic">{{
                  $t("bold_italic")
                }}</span>
              </template>
            </i18n>
            <ul>
              <template v-for="(value, index) in data.collection">
                <li v-bind:key="index">
                  <strong>{{ value[`question_${lang}`] }}</strong>
                  <ul class="be-answers">
                    <li
                      v-for="(answer, answerIndex) in value.answers"
                      v-bind:key="answerIndex"
                      v-bind:class="{
                        'be-selected': checkAnswer(index, answerIndex)
                      }"
                    >
                      {{ answer[`title_${lang}`] }}
                    </li>
                    <br />
                  </ul>
                </li>
              </template>
            </ul>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="print()">
            {{ $t("print") }}
          </button>
          <button
            class="button"
            type="button"
            @click="isCardModalActive = false"
          >
            {{ $t("close") }}
          </button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import Printd from "printd";
import VueI18nResults from "vue-i18n";

Vue.use(VueI18nResults);

// Create VueI18n instance with options
export const i18n = new VueI18nResults({
  locale: "en"
});

export default {
  name: "Results",
  components: {
    BaseCard
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        advantages: "Advantages:",
        disadvantages: "Disadvantages:",
        restart: `Restart`,
        print_results: `Print Results`,
        print_summaries: `Print All Summaries`,
        results: `Results - Print View`,
        business_structure: `Suggested Business Structure:`,
        questions_answers: `Questions/Anwers:`,
        bold_italic: `bold and italic`,
        text_answers: `Your answers are in {format}.`,
        print: `Print`,
        close: `Close`
      },
      fr: {
        advantages: "Avantages :",
        disadvantages: "Désavantages :",
        restart: `Redémarrer`,
        print_results: `Imprimer les résultats`,
        print_summaries: `Imprimer tous les sommaires`,
        results: `Résultats - Aperçu avant impression`,
        business_structure: `Structure d'entreprise suggérée :`,
        questions_answers: `Questions/Réponses :`,
        bold_italic: `gras et italique`,
        text_answers: `Vos réponses sont en {format}.`,
        print: `Imprimer`,
        close: `Fermer`
      }
    }
  }, // end i18n
  props: {
    data: Object,
    entityId: String,
    userAnswers: Object
  },
  data: function() {
    return {
      entity: {},
      lang: "en",
      isCardModalActive: false,
      canCancel: false,
      css: `.be-selected {
              font-weight: bolder;
              font-style: italic;
            }
        `
    };
  }, // end data
  created: function() {
    // get top Entity from data
    this.entity = this.data.entities[this.entityId] || {};
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.lang;
  }, // end mounted
  computed: {
    title: function() {
      return this.entity[`title_${this.lang}`] || "N/A";
    },
    body: function() {
      return this.entity[`summary_${this.lang}`] || "N/A";
    },
    advantages: function() {
      return this.entity[`advantage_${this.lang}`] || "N/A";
    },
    disadvantages: function() {
      return this.entity[`disadvantage_${this.lang}`] || "N/A";
    }
  }, // end computed
  methods: {
    printEntity: function() {
      this.isCardModalActive = true;
    },
    checkAnswer: function(questionIndex, answerIndex) {
      let userAnswerIndex = this.userAnswers[questionIndex].answerIndex;
      return userAnswerIndex == answerIndex ? true : false;
    },
    print: function() {
      const d = new Printd();
      d.print(this.$refs.PrintBody, [this.css]);
    },
    onClickButton: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    }
  } // end methods
}; // end export default
</script>
<style scoped></style>
