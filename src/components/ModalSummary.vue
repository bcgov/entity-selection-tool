<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head be-modal-card-head be-print-modal-head">
      <span class="be-modal-title"
        >{{ $t("results") }} {{ $t("summaries") }}</span
      >
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
      <p>        
      </p>
      <br />
      <p>
        {{ $t("powerby") }}
        <a
          class="be-link"
          target="_blank"
          rel="noopener"
          :href="$t('bizpal_link')"
          >{{ $t("bizpal") }}</a
        >
      </p>
    </section>
    <footer class="modal-card-foot be-modal-card-foot">
      <b-button class="be-button" outlined @click="print()">
        {{ $t("print") }}
      </b-button>
      <b-button class="be-button" outlined @click="downloadSummaryPDF()">
        {{ $t("download") }}
      </b-button>
      <b-button class="be-button" outlined @click="onClickPrevious()">
        {{ $t("close") }}
      </b-button>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import Printd from "printd";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import VueI18nSummaries from "vue-i18n";
Vue.use(VueI18nSummaries);
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Create VueI18n instance with options
export const i18n = new VueI18nSummaries({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en"
});
export default {
  name: "ModalSummary",
  i18n: {
    locale: "en",
    messages: {
      en: {
        advantages: "Advantages:",
        disadvantages: "Disadvantages:",
        download_name_summary: "business-structures-in-{prov}-summary",
        restart: "Restart",
        print_results: "Print / Download",
        print_summaries: "See All Structures",
        print_result_header: "Suggested Business Entity Result",
        results: "Business Structures Wizard:",
        summaries: "Summary of Business Structures",
        title:
          "This page provides a summary of all for-profit business structures in BC, including those not covered in the Wizard questions.",
        print: "Print",
        download: "Download",
        close: "Back",
        powerby: "Powered by ",
        previous: "Back",
        general_resources: "All Business Types",
        bizpal_link: "https://services.bizpal-perle.ca/",
        bizpal: "BizPaL",                
      },
      fr: {
        advantages: "Avantages :",
        disadvantages: "Désavantages :",
        download_name_summary: "structures-entreprises-dans-{prov}-sommaire",
        restart: "Redémarrer",
        print_results: "Imprimer/Télécharger",
        print_result_header: "Suggested Business Entity Result (FR)",
        print_summaries: "Tous les structures",
        results: "Business Structures Wizard (FR)",
        summaries: "Summary of Business Structures (FR)",
        title:
          "This page provides a summary of all for-profit business structures in BC, including those not covered in the Wizard questions.(FR)",
        print: "Imprimer",
        download: "Télécharger",
        close: "Arrière",
        powerby: "Proposé par",
        previous: "Précédent",
        general_resources: "All Business Types (FR)",
        bizpal_link: "https://services.perle-bizpal.ca/",
        bizpal: "PerLE",              
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
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  },
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
        content: [
          {
            text: this.$t("results") + " " + this.$t("summaries"),
            style: "title"
          },
          {
            text: this.$t("title"),
            style: "normal"
          }
        ],
        styles: {
          toc: {
            fontSize: 10,
            color: "#366b8c"
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
            lineHeight: 1.25
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

    printSummaries: function() {
      this.isSummariesModalActive = true;
    },

    print: function() {
      const d = new Printd();
      d.print(this.$refs.PrintBody, [this.css]);
    },

    onClickPrevious: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    }
  } // end methods
};
</script>

<style></style>
