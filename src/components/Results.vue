<template>
  <div class="columns">
    <BaseCard class="be-question box">
      <template v-slot:headertext>
        <h2 v-if="!nextSteps" class="title be-results-title">
          {{ $t("results_headers") }}
        </h2>
        <h2 v-if="nextSteps" class="title be-results-title">
          {{ $t("next_steps_title") }}
        </h2>
      </template>
      <template v-slot:bodytext>
        <div v-if="!nextSteps">
          <p class="be-results-header-intro">{{ getHeaderIntro() }}</p>
          <h3 class="subtitle be-results-subtitle is-4">
            {{ getHeaderTitles(entities) }}
          </h3>
          <template v-for="(value, index) in entities">
            <div v-bind:key="index">
              <div v-if="entitiesId.length > 1">
                <h3 class="subtitle be-results-subtitle is-5">
                  {{ title(value) }}:
                </h3>
              </div>
              <p class="be-results-text">{{ body(value) }}</p>
              <div>
                <h4 class="subtitle be-results-subtitle is-6">
                  {{ $t("advantages") }}
                </h4>
                <p class="be-results-text">
                  {{ advantages(value) }}
                </p>
              </div>
              <br />
              <div>
                <h4 class="subtitle be-results-subtitle is-6">
                  {{ $t("disadvantages") }}
                </h4>
                <p class="be-results-text">
                  {{ disadvantages(value) }}
                </p>
              </div>
              <br />
            </div>
          </template>
        </div>
        <div v-if="nextSteps">
          <p class="be-results-text">{{ $t("next_steps_intro") }}</p>
          <template v-for="(value, index) in entities">
            <div class="be-next-steps-list" v-bind:key="index">
              {{ getNextSteps(value) }}

              <h3
                v-if="entitiesId.length > 1"
                class="subtitle be-results-subtitle is-5"
              >
                {{ title(value) }}:
              </h3>
              <ul v-bind:key="index" v-for="(item, index) in resources">
                <li v-html="item"></li>
              </ul>
            </div>
          </template>
          <h3
            v-if="entitiesId.length > 1"
            class="subtitle be-results-subtitle is-5"
          >
            {{ $t("general_resources") }}:
          </h3>
          <ul v-bind:key="index" v-for="(item, index) in resourcesGeneral">
            <li v-html="item"></li>
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
          <b-button class="be-form-button " @click="onClickPrevious">{{
            $t("previous")
          }}</b-button>
        </span>

        <span v-if="!nextSteps" class="card-footer-item">
          <b-button class="be-form-button" @click="printEntity">
            {{ $t("print") }}/&#8203;{{ $t("download") }}
          </b-button>
        </span>
        <span class="card-footer-item">
          <b-button class="be-form-button" @click="printSummaries">
            {{ $t("print_summaries") }}
          </b-button>
        </span>
        <span v-if="!nextSteps" class="card-footer-item">
          <b-button class="be-form-button" @click="nextStepsClick()">
            {{ $t("next_steps_title") }}</b-button
          >
        </span>
      </template>
    </BaseCard>

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
        <header class="modal-card-head be-modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("results") }}</span>
        </header>
        <section id="printBody" ref="PrintBody" class="be-modal-print-body">
          <h2 class="title be-results-title">
            {{ $t("results_headers") }}
          </h2>
          <p class="be-results-header-intro">{{ getHeaderIntro() }}</p>
          <h3 class="title be-results-entity-title">
            {{ getHeaderTitles(entities) }}
          </h3>

          <template v-for="(value, index) in entities">
            <div v-bind:key="index">
              <div v-if="entitiesId.length > 1">
                <h2 class="subtitle be-results-subtitle is-4">
                  {{ title(value) }}
                </h2>
                <br />
              </div>
              <div>
                <p>{{ body(value) }}</p>
                <br />
              </div>
              <div>
                <h2 class="subtitle be-results-subtitle is-4">
                  {{ $t("advantages") }}
                </h2>
                <ul>
                  <span v-html="advantages(value)"></span>
                </ul>
                <br />
              </div>
              <div>
                <h2 class="subtitle be-results-subtitle is-4">
                  {{ $t("disadvantages") }}
                </h2>
                <ul>
                  <span v-html="disadvantages(value)"></span>
                </ul>
                <br />
              </div>
            </div>
          </template>
          <div>
            <h1 class="subtitle be-results-subtitle is-3">
              {{ $t("questions_answers") }}
            </h1>
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
              <h1 class="subtitle be-results-subtitle is-3">
                {{ $t("print_result_header") }}
              </h1>
              <ul class="be-answers">
                <template v-for="(value, index) in entitiesTotal">
                  <li v-bind:key="index">
                    {{ data.entities[index][`title_${langLocal}`] }} ({{
                      displayPercentage(value[`total`])
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
              <a
                class="be-link"
                target="_blank"
                rel="noopener"
                :href="$t('bizpal_link')"
                >{{ $t("bizpal") }}</a
              >
            </div>
          </div>
        </section>
        <footer class="modal-card-foot be-modal-card-foot">
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
        <header class="modal-card-head be-modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("summaries") }}</span>
        </header>
        <section
          id="printBodySummaries"
          ref="PrintBody"
          class="be-modal-print-body"
        >
          <h1 class="subtitle be-results-subtitle is-4">{{ $t("title") }}</h1>
          <div>
            <ul>
              <template v-for="(value, index) in data.entities">
                <li v-bind:key="index">
                  <a class="be-link" v-bind:href="`#${index}`"
                    >{{ value[`title_${langLocal}`] }}
                  </a>
                </li>
              </template>

              <template v-for="(value, index) in data['non-active-entities']">
                <li v-bind:key="index">
                  <a class="be-link" v-bind:href="`#${index}`"
                    >{{ value[`title_${langLocal}`] }}
                  </a>
                </li>
              </template>
            </ul>
            <br />
          </div>

          <div v-for="(value, index) in data.entities" v-bind:key="index">
            <template>
              <a :name="index"></a>
              <h2 class="subtitle be-results-subtitle is-4">
                {{ value[`title_${langLocal}`] }}
              </h2>
              <p>{{ value[`summary_${langLocal}`] }}</p>
              <br />
              <h3 class="subtitle be-results-subtitle is-5">
                {{ $t("advantages") }}
              </h3>
              <p>
                {{ value[`advantage_${langLocal}`] }}
              </p>
              <br />
              <h3 class="subtitle be-results-subtitle is-5">
                {{ $t("disadvantages") }}
              </h3>
              <p>{{ value[`disadvantage_${langLocal}`] }}</p>
              <br />
            </template>
          </div>

          <div
            v-for="(value, index) in data['non-active-entities']"
            v-bind:key="index"
          >
            <template>
              <a :name="index"></a>
              <h2 class="subtitle be-results-subtitle is-4">
                {{ value[`title_${langLocal}`] }}
              </h2>
              <p>{{ value[`summary_${langLocal}`] }}</p>
              <br />
              <h3 class="subtitle be-results-subtitle is-5">
                {{ $t("advantages") }}
              </h3>
              <p>
                {{ value[`advantage_${langLocal}`] }}
              </p>
              <br />
              <h3 class="subtitle be-results-subtitle is-5">
                {{ $t("disadvantages") }}
              </h3>
              <p>{{ value[`disadvantage_${langLocal}`] }}</p>
              <br />
            </template>
          </div>
          <div>
            {{ $t("powerby") }}
            <a
              class="be-link"
              target="_blank"
              rel="noopener"
              :href="$t('bizpal_link')"
              >{{ $t("bizpal") }}</a
            >
          </div>
        </section>
        <footer class="modal-card-foot be-modal-card-foot">
          <b-button class="be-button" outlined @click="print()">
            {{ $t("print") }}
          </b-button>
          <b-button class="be-button" outlined @click="downloadSummaryPDF()">
            {{ $t("download") }}
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
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
        download_name: "business-structures-wizard-your-results",
        download_name_summary: "business-structures-in-{prov}-summary",
        restart: "Restart",
        print_results: "Print / Download",
        print_summaries: "All Structures",
        print_result_header: "Suggested Business Entity Result",
        results: "Business Structures Wizard",
        results_headers: "Your Results",
        business_structure:
          "Based on your answers, your best match is: | Based on your answers, your best matches are: ",
        business_structure_2:
          "Based on your answers, there is more than one structure that may fit your situation. Be sure to consult with a business adviser, accountant or lawyer before finalizing your choice. Of these top-ranked choices your best match is:",
        business_structure_entity: "{entity} | {entity} or {entity2}",
        questions_answers: "Questions/Anwers:",
        bold_italic: "bold and italic",
        text_answers: "Your answers are in {format}.",
        summaries: "Summary of Business Structures",
        title:
          "This page provides a summary of all for-profit business structures in BC",
        print: "Print",
        download: "Download",
        close: "Back",
        powerby: "Powered by ",
        next_steps_title: "What's Next?",
        next_steps_intro:
          "Ready to start your business? Try these next steps. Keep in mind, some business structures may require the services of a lawyer and accountant.",
        previous: "Back",
        general_resources: "All Business Types",
        bizpal_link: "https://services.bizpal-perle.ca/",
        bizpal: "BizPaL"
      },
      fr: {
        advantages: "Avantages :",
        disadvantages: "Désavantages :",
        download_name: "business-structures-wizard-your-results",
        download_name_summary: "structures-entreprises-dans-{prov}-sommaire",
        restart: "Redémarrer",
        print_results: "Imprimer/Télécharger",
        print_result_header: "Suggested Business Entity Result (FR)",
        print_summaries: "Tous les structures",
        results: "Business Structures Wizard (FR)",
        results_headers: "Résultats (fr)",
        business_structure:
          "Based on your answers, your best match is: | Based on your answers, your best matches are: (FR)",
        business_structure_entity: "{entity} | {entity} or {entity2}",
        questions_answers: "Questions/Réponses :",
        bold_italic: "gras et italique",
        text_answers: "Vos réponses sont en {format}.",
        summaries: "Summary of Business Structures (FR)",
        title:
          "This page provides a summary of all for-profit business structures in BC",
        print: "Imprimer",
        download: "Télécharger",
        close: "Arrière",
        powerby: "Proposé par",
        next_steps_title: "What's Next? (fr)",
        next_steps_intro:
          "Ready to start your business? Try these next steps. Keep in mind, some business structures may require the services of a lawyer and accountant. (FR)",
        previous: "Précédent",
        general_resources: "All Business Types (FR)",
        bizpal_link: "https://services.perle-bizpal.ca/",
        bizpal: "PerLE"
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
      nextSteps: false,
      css: `.be-selected {
              font-weight: bolder;
              font-style: italic;
            }
        `
    };
  }, // end data
  created: function() {
    // get top Entity from data
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
    getHeaderIntro: function() {
      if (this.entitiesId.length > 1) {
        return this.$tc("business_structure", 2);
      } else {
        let myEntities = this.entitiesTotal;
        let keysSorted = Object.keys(this.entitiesTotal).sort(function(a, b) {
          return myEntities[b]["total"] - myEntities[a]["total"];
        });
        let sortedEntities = {};
        let topEntitiesId = [];
        let topEntitiesTotal = [];
        let gotTopEntity = false;
        let iteration = 1;
        keysSorted.map(function(key) {
          if (!gotTopEntity) {
            topEntitiesId.push(key);
            topEntitiesTotal.push(myEntities[key]["total"]);
            gotTopEntity = true;
          }
          sortedEntities[key] = myEntities[key];
          //check if the second best entity is within 8% of top entity suggestion
          if (iteration > 1) {
            if (topEntitiesTotal.pop() - 8 <= myEntities[key]["total"]) {
              topEntitiesId.push(key);
            }
          }
          iteration++;
        });
        if (topEntitiesId.length > 1) {
          return this.$tc("business_structure_2");
        } else {
          return this.$tc("business_structure", 1);
        }
      }
    },
    getHeaderTitles: function(entities) {
      let entity1Title =
        entities[this.entitiesId[0]][`title_${this.langLocal}`];
      if (this.entitiesId.length > 1) {
        let entity2Title =
          entities[this.entitiesId[1]][`title_${this.langLocal}`];
        return this.$tc("business_structure_entity", 2, {
          entity: entity1Title,
          entity2: entity2Title
        });
      } else {
        return this.$tc("business_structure_entity", 1, {
          entity: entity1Title
        });
      }
    },
    nextStepsClick: function() {
      this.nextSteps = true;
    },
    // match suggested entities with next step links
    getNextSteps: function(entity) {
      let resourcesList = this.data.resources;
      let entityID = entity.id;
      this.resourcesGeneral = resourcesList.general_resources;
      switch (entityID) {
        case "e1":
        case "e2":
        case "e3":
        case "e4":
          this.resources = resourcesList.r1;
          break;
        case "e5":
          this.resources = resourcesList.r5;
          break;
        case "e6":
          this.resources = resourcesList.r3;
          break;
        case "e7":
          this.resources = resourcesList.r4;
          break;
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
      let filename = this.$t("download_name", { prov: "BC" }) + `-${date}.pdf`;
      const document = {
        content: [
          { text: this.getHeaderTitles(this.entities), style: "title" }
        ],
        styles: {
          questions: {
            fontSize: 12,
            bold: true
            // color: "#366b8c"
            //decoration: 'underline'
          },
          title: {
            fontSize: 16,
            bold: true,
            lineHeight: 1.5
          },
          subtitle: {
            fontSize: 14,
            bold: true,
            lineHeight: 1.5,
            color: "#2c5671"
          },
          header: {
            fontSize: 12,
            bold: true,
            lineHeight: 1.5
          },
          normal: {
            fontSize: 10,
            lineHeight: 1.5
          },
          link: {
            color: "#366b8c"
          }
        }
      };

      // display each entity
      for (var index in this.entities) {
        let entity = this.entities[index];
        document.content.push([
          {
            text: this.title(entity),
            style: "subtitle",
            margin: [0, 10, 0, 5]
          },

          {
            text: this.$t("advantages"),
            style: "header",
            margin: [0, 5, 0, 5]
          },
          {
            text: this.advantages(entity),
            style: "normal",
            margin: [0, 5, 0, 5]
          },
          {
            text: this.$t("disadvantages"),
            style: "header",
            margin: [0, 5, 0, 5]
          },
          {
            text: this.disadvantages(entity),
            style: "normal",
            margin: [0, 5, 0, 5]
          }
        ]);
      }

      // list questions/anwers
      document.content.push([
        {
          text: this.$t("questions_answers"),
          pageBreak: "before",
          style: "subtitle",
          margin: [0, 10, 0, 5]
        },
        {
          text: this.$t("text_answers", { format: this.$t("bold_italic") }),
          style: "header",
          margin: [0, 5, 0, 5],
          bold: true,
          italics: true
        }
      ]);

      for (const index in this.data.collection) {
        let arrayList = [];
        let question = this.data.collection[index];
        document.content.push([
          {
            text: question[`question_${this.langLocal}`],
            style: "questions",
            margin: [0, 10, 0, 5]
          }
        ]);

        // margin: [left, top, right, bottom]
        for (const answerIndex in question.answers) {
          let answer = question.answers[answerIndex];
          arrayList.push({
            text: answer[`title_${this.langLocal}`],
            bold: this.checkAnswer(index, answerIndex),
            italics: this.checkAnswer(index, answerIndex),
            style: "normal",
            margin: [15, 1, 0, 1]
          });
        } //end for answers

        document.content.push([{ ul: arrayList }]);
      } //endfor

      // suggested result
      document.content.push([
        {
          text: this.$t("print_result_header"),
          style: "subtitle",
          margin: [0, 10, 0, 5]
        }
      ]);

      let arrayList = [];
      for (const resultIndex in this.entitiesTotal) {
        let entityTotal = this.entitiesTotal[resultIndex];
        arrayList.push({
          text:
            this.data.entities[resultIndex][`title_${this.langLocal}`] +
            ` (${this.displayPercentage(entityTotal["total"])}%)`,
          margin: [15, 1, 0, 1]
        });
      } //endfor
      document.content.push([{ ul: arrayList }]);

      document.content.push([
        {
          text: `*${this.disclaimer()}`,
          style: "normal",
          italics: true,
          color: "blue",
          margin: [0, 5, 0, 5]
        }
      ]);

      document.content.push([
        {
          text: [
            this.$t("powerby"),
            {
              text: this.$t("bizpal"),
              style: "link",
              link: this.$t("bizpal_link")
            }
          ],
          style: "normal",
          margin: [0, 5, 0, 5]
        }
      ]);

      pdfMake.createPdf(document).download(filename);
    },
    downloadSummaryPDF: function() {
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let filename =
        this.$t("download_name_summary", { prov: "BC" }) + `-${date}.pdf`;
      const allEntities = this.data.entities;
      const document = {
        content: [{ text: this.$t("title"), style: "title" }],
        styles: {
          toc: {
            fontSize: 10,
            color: "#366b8c"
            //decoration: 'underline'
          },
          title: {
            fontSize: 16,
            bold: true,
            lineHeight: 1.5
          },
          subtitle: {
            fontSize: 14,
            bold: true,
            lineHeight: 1.5,
            color: "#2c5671"
          },
          header: {
            fontSize: 12,
            bold: true,
            lineHeight: 1.5
          },
          normal: {
            fontSize: 10,
            lineHeight: 1.5
          },
          link: {
            color: "#366b8c"
          }
        }
      };

      for (var toc in allEntities) {
        document.content.push([
          {
            text: allEntities[toc][`title_${this.langLocal}`],
            style: "toc",
            linkToDestination: toc
          }
        ]);
      }
      for (var index in allEntities) {
        document.content.push([
          {
            text: allEntities[index][`title_${this.langLocal}`],
            style: "subtitle",
            id: index,
            margin: [0, 10, 0, 5]
          },
          {
            text: allEntities[index][`summary_${this.langLocal}`],
            style: "normal",
            margin: [0, 5, 0, 5]
          },
          {
            text: this.$t("advantages"),
            style: "header",
            margin: [0, 5, 0, 5]
          },
          {
            text: allEntities[index][`advantage_${this.langLocal}`],
            style: "normal",
            margin: [0, 5, 0, 5]
          },
          {
            text: this.$t("disadvantages"),
            style: "header",
            margin: [0, 5, 0, 5]
          },
          {
            text: allEntities[index][`disadvantage_${this.langLocal}`],
            style: "normal",
            margin: [0, 5, 0, 5]
          }
        ]);
      }
      document.content.push([
        {
          text: [
            this.$t("powerby"),
            {
              text: this.$t("bizpal"),
              style: "link",
              link: this.$t("bizpal_link")
            }
          ],
          style: "normal",
          margin: [0, 5, 0, 5]
        }
      ]);
      pdfMake.createPdf(document).download(filename);
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
    onClickPrevious: function() {
      if (this.nextSteps == true) {
        this.nextSteps = false;
        return;
      } else {
        this.tempValue = true;
        this.$emit("clicked", this.tempValue);
        return;
      }
    },
    // Display percentage value on progress bar
    displayPercentage: function(value) {
      let displayValue = value;
      let minValue = 0;
      if (displayValue <= -1) {
        return minValue;
      } else {
        return displayValue;
      }
    } // end displayPercentage
  } // end methods
}; // end export default
</script>
<style></style>
