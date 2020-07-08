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
          <span class="card-footer-item">
            <b-button class="be-form-button " @click="onClickButton">{{
              $t("restart")
            }}</b-button>
          </span>
          <span class="card-footer-item">
            <b-button class="be-form-button" @click="printEntity">
              {{ $t("print_results") }}
            </b-button>
          </span>
          <span class="card-footer-item">
            <b-button class="be-form-button" @click="printSummaries">
              {{ $t("print_summaries") }}
            </b-button>
          </span>
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
          <button class="button" type="is-link">
            <a href="#" target="_blank">
              {{ $t("download") }}
            </a>
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
    <!-- modal for summaries print view -->
    <b-modal
      :active.sync="isSummariesModalActive"
      :can-cancel="canCancel"
      full-screen
      aria-role="dialog"
      aria-modal
      class="be-print-modal"
    >
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("summaries") }}</span>
        </header>
        <section
          id="printBodySummaries"
          ref="PrintBody"
          class="be-modal-print-body"
        >
          <h1 class="subtitle is-3">{{ $t("title") }}</h1>
          <h2 class="subtitle is-4">
            {{ data.entities.e1[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e1[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e1[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <hr />
          <h2 class="subtitle is-4">
            {{ data.entities.e2[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e2[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e2[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <hr />
          <h2 class="subtitle is-4">
            {{ data.entities.e3[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e3[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e3[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <hr />
          <h2 class="subtitle is-4">
            {{ data.entities.e4[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e4[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e4[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <hr />
          <h2 class="subtitle is-4">
            {{ data.entities.e5[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e5[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e5[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <hr />
          <h2 class="subtitle is-4">
            {{ data.entities.e6[`title_${this.langLocal}`] }}
          </h2>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle1_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle1_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle2_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle2_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle3_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle3_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle4_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle4_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle5_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle5_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
          <div>
            <h3 class="subtitle be-subtitle-summaries is-5">
              {{
                data.entities.e6[`summury_desc_subtitle6_h3_${this.langLocal}`]
              }}
            </h3>
            <p>
              {{
                data.entities.e6[`summury_desc_subtitle6_p_${this.langLocal}`]
              }}
            </p>
            <br />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="print()">
            {{ $t("print") }}
          </button>
          <button class="button" type="is-link">
            <a
              href="assets/EntityTypeLongDescriptionsFor-Profit.pdf"
              target="_blank"
            >
              {{ $t("download") }}
            </a>
          </button>
          <button
            class="button"
            type="button"
            @click="isSummariesModalActive = false"
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
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en"
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
        restart: "Restart",
        print_results: "Results",
        print_summaries: "All Summaries",
        results: "Results - Print View",
        business_structure: "Suggested Business Structure:",
        questions_answers: "Questions/Anwers:",
        bold_italic: "bold and italic",
        text_answers: "Your answers are in {format}.",
        summaries: "Summaries - Print View",
        title: "Entity Type Long Descriptions (For-Profit)",
        print: "Print",
        download: "Download",
        close: "Close"
      },
      fr: {
        advantages: "Avantages :",
        disadvantages: "Désavantages :",
        restart: "Redémarrer",
        print_results: "Imprimer les résultats",
        print_summaries: "Imprimer tous les sommaires",
        results: "Résultats - Aperçu avant impression",
        business_structure: "Structure d'entreprise suggérée :",
        questions_answers: "Questions/Réponses :",
        bold_italic: "gras et italique",
        text_answers: "Vos réponses sont en {format}.",
        summaries: "Sommaires - Aperçu avant impression",
        title: "Entity Type Long Descriptions (For-Profit) FR",
        print: "Imprimer",
        download: "Télécharger",
        close: "Fermer"
      }
    }
  }, // end i18n
  props: {
    data: Object,
    entityId: String,
    userAnswers: Object,
    lang: {
      type: String,
      default: "en"
    }
  },
  data: function() {
    return {
      entity: {},
      langLocal: this.lang,
      isCardModalActive: false,
      isSummariesModalActive: false,
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
    this.$i18n.locale = this.langLocal;

    // send event for Top Entity
    this.$emit("updateResult", this.entity[`title_${this.langLocal}`] || "");
  }, // end mounted
  computed: {
    title: function() {
      return this.entity[`title_${this.langLocal}`] || "N/A";
    },
    body: function() {
      return this.entity[`summary_${this.langLocal}`] || "N/A";
    },
    advantages: function() {
      return this.entity[`advantage_${this.langLocal}`] || "N/A";
    },
    disadvantages: function() {
      return this.entity[`disadvantage_${this.langLocal}`] || "N/A";
    }
  }, // end computed
  methods: {
    printEntity: function() {
      this.isCardModalActive = true;
    },
    printSummaries: function() {
      this.isSummariesModalActive = true;
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
