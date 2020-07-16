<template>
  <div class="columns">
    <div class="column is-three-fifths">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2 class="title be-question-title is-4">
            {{ getHeaderTitles(entities) }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <template v-for="(value, index) in entities">
            <div v-bind:key="index">
              <div v-if="entitiesId.length > 1">
                <h3 class="subtitle be-results-subtitle is-5">
                  {{ title(value) }}
                </h3>
              </div>
              <p class="be-results-text">{{ body(value) }}</p>
              <div>
                <h3 class="subtitle be-results-subtitle is-5">
                  {{ $t("advantages") }}
                </h3>
                <ul class="be-results-text">
                  <span v-html="advantages(value)"></span>
                </ul>
              </div>
              <br />
              <div>
                <h3 class="subtitle be-results-subtitle is-5">
                  {{ $t("disadvantages") }}
                </h3>
                <ul class="be-results-text">
                  <span v-html="disadvantages(value)"></span>
                </ul>
              </div>
              <br />
            </div>
          </template>
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
          <h1 class="subtitle is-3">
            {{ getHeaderTitles(entities) }}
          </h1>
          <template v-for="(value, index) in entities">
            <div v-bind:key="index">
              <div v-if="entitiesId.length > 1">
                <h2 class="subtitle is-4">{{ title(value) }}</h2>
              </div>
              <br />
              <div>
                <p>{{ body(value) }}</p>
                <br />
              </div>
              <div>
                <h2 class="subtitle is-4">{{ $t("advantages") }}</h2>
                <ul>
                  <span v-html="advantages(value)"></span>
                </ul>
                <br />
              </div>
              <div>
                <h2 class="subtitle is-4">{{ $t("disadvantages") }}</h2>
                <ul>
                  <span v-html="disadvantages(value)"></span>
                </ul>
                <br />
              </div>
            </div>
          </template>
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
            <div>
              <h1 class="subtitle is-3">{{ $t("print_result_header") }}</h1>
              <ul class="be-answers">
                <template v-for="(value, index) in entitiesTotal">
                  <li v-bind:key="index">
                    {{ data.entities[index][`title_${langLocal}`] }} ({{
                      value[`total`]
                    }}%)
                  </li>
                </template>
              </ul>
            </div>
            <div class="be-context">
              <p>
                <em>*{{ disclaimer() }}</em>
              </p>
              <br />
            </div>
            <div>
              {{ $t("powerby") }}
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <b-button class="be-button" outlined @click="print()">
            {{ $t("print") }}
          </b-button>
          <b-button class="be-button" outlined @click="downloadPDF()">
            {{ $t("download") }}
          </b-button>
          <b-button
            class="be-button"
            outlined
            @click="isCardModalActive = false"
          >
            {{ $t("close") }}
          </b-button>
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
          <div v-html="displaySummaries()"></div>
        </section>
        <footer class="modal-card-foot">
          <b-button class="be-button" outlined @click="print()">
            {{ $t("print") }}
          </b-button>
          <b-button class="be-button" outlined>
            <a
              class="be-link-button"
              href="assets/EntityTypeLongDescriptionsFor-Profit.pdf"
              target="_blank"
            >
              {{ $t("download") }}
            </a>
          </b-button>
          <b-button
            class="be-button"
            outlined
            @click="isSummariesModalActive = false"
          >
            {{ $t("close") }}
          </b-button>
        </footer>
      </div>
    </b-modal>
  </div>
</template>
<script>
import Vue from "vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import Printd from "printd";
import jsPDF from "jspdf";

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
        download_name: "entity-result",
        restart: "Restart",
        print_results: "Print/Download",
        print_summaries: "All Structures",
        print_result_header: "Suggested Business Entity Result",
        results: "Business Structures Wizard",
        business_structure:
          "Based on your answers, your best match is {entity}. | Based on your answers, your best match is  {entity} or {entity2}.",

        questions_answers: "Questions/Anwers:",
        bold_italic: "bold and italic",
        text_answers: "Your answers are in {format}.",
        summaries: "Summary of Business Structures",
        title: "Entity Type Long Descriptions (For-Profit)",
        print: "Print",
        download: "Download",
        close: "Back",
        powerby: "Power by BizPaL"
      },
      fr: {
        advantages: "Avantages :",
        disadvantages: "Désavantages :",
        download_name: "resultat-entite",
        restart: "Redémarrer",
        print_results: "Imprimer/Télécharger",
        print_result_header: "Suggested Business Entity Result (FR)",
        print_summaries: "Tous les structures",
        results: "Business Structures Wizard (FR)",
        business_structure:
          "Your answers indicate that a {entity} is your best match. (FR)",
        questions_answers: "Questions/Réponses :",
        bold_italic: "gras et italique",
        text_answers: "Vos réponses sont en {format}.",
        summaries: "Summary of Business Structures (FR)",
        title: "Entity Type Long Descriptions (For-Profit) FR",
        print: "Imprimer",
        download: "Télécharger",
        close: "Arrière",
        powerby: "Proposé par PerLE"
      }
    }
  }, // end i18n
  props: {
    data: Object,
    entitiesId: Array,
    userAnswers: Object,
    entitiesTotal: Object,
    lang: {
      type: String,
      default: "en"
    }
  },
  data: function() {
    return {
      entity: {},
      langLocal: this.lang,
      entities: {},
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
    //this.entity = this.data.entities[this.entityId] || {};

    let temp = {};
    let self = this;
    //let objKeys = Object.keys(this.entitiesId);

    this.entitiesId.forEach(function(value) {
      temp[value] = self.data.entities[value];
    });
    this.entities = temp;
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;

    // send event for Top Entity
    this.$emit("updateResult", this.entity[`title_${this.langLocal}`] || "");
  }, // end mounted
  computed: {}, // end computed
  methods: {
    title: function(entity) {
      return entity[`title_${this.langLocal}`] || "N/A";
    },
    body: function(entity) {
      return entity[`summary_${this.langLocal}`] || "N/A";
    },
    advantages: function(entity) {
      return entity[`advantage_${this.langLocal}`] || "N/A";
    },
    disadvantages: function(entity) {
      return entity[`disadvantage_${this.langLocal}`] || "N/A";
    },
    disclaimer: function() {
      let data = this.data;
      return data[`disclaimer_${this.langLocal}`] || "";
    },
    getHeaderTitles: function(entities) {
      let entity1Title =
        entities[this.entitiesId[0]][`title_${this.langLocal}`];
      if (this.entitiesId.length > 1) {
        let entity2Title =
          entities[this.entitiesId[1]][`title_${this.langLocal}`];
        return this.$tc("business_structure", 2, {
          entity: entity1Title,
          entity2: entity2Title
        });
      } else {
        return this.$tc("business_structure", 1, { entity: entity1Title });
      }
    },
    downloadPDF: function() {
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let doc = new jsPDF();
      doc.fromHTML(this.$refs.PrintBody, 15, 15, {
        width: 170
      });
      doc.save(this.$t("download_name") + `-${date}.pdf`);
    },
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
    },
    displaySummaries: function() {
      //function to display summaries info
      var layout = "";

      for (var index in this.data.entities) {
        layout +=
          '<h2 class="subtitle is-4">' +
          this.data.entities[index][`title_${this.langLocal}`] +
          "</h2>";
        for (var sindex in this.data.entities[index][`summary_desc`]) {
          layout +=
            '<h3 class="subtitle be-subtitle-summaries is-5">' +
            this.data.entities[index][`summary_desc`][sindex][
              `header_${this.langLocal}`
            ] +
            "</h3>";
          layout +=
            "<p>" +
            this.data.entities[index][`summary_desc`][sindex][
              `subtitle_${this.langLocal}`
            ] +
            "</p><br />";
        }
      }
      return layout;
    }
  } // end methods
}; // end export default
</script>
<style scoped></style>
