<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="be-summary box">
        <template v-slot:headertext>
          <h2 v-if="!nextSteps" class="title be-results-title">
            {{ $t("header_text") }}
          </h2>
          <h2 v-if="nextSteps" class="title be-results-title">
            {{ $t("next_steps_title") }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <div v-if="!nextSteps">
            <p>
              {{ $t("explanation_intro") }}
            </p>
            <ul class="be-nonprofit-list">
              <li v-for="(item, index) in dataLocal" v-bind:key="index">
                <h3 class="subtitle be-nonprofit-subtitle  is-5">
                  {{ item[`title_${langLocal}`] }}
                </h3>
                <p class="be-results-text">
                  {{ item[`summary_${langLocal}`] }}
                </p>
              </li>
            </ul>
          </div>
          <div v-if="nextSteps">
            <p class="be-results-text">{{ $t("next_steps_intro") }}</p>
            <div class="be-next-steps-list">
              {{ getNextSteps() }}

              <h3 class="subtitle be-results-subtitle is-5">
                {{ $t("non_profit_resources") }}
              </h3>
              <ul v-bind:key="index" v-for="(item, index) in resources">
                <li v-html="item"></li>
              </ul>
            </div>

            <h3 class="subtitle be-results-subtitle is-5">
              {{ $t("general_resources") }}
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
            <b-button class="be-form-button" @click="onClickPrevious">
              {{ $t("previous") }}
            </b-button>
          </span>
          <span v-if="!nextSteps" class="card-footer-item">
            <b-button class="be-form-button" @click="printSummaries">
              {{ $t("print_summaries") }}
            </b-button>
          </span>
          <span v-if="!nextSteps" class="card-footer-item">
            <b-button class="be-form-button" @click="nextStepsClick()">
              {{ $t("next_steps") }}</b-button
            >
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
        <header class="modal-card-head be-modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("results") }}</span>
        </header>
        <section id="printBody" ref="PrintBody" class="be-modal-print-body">
          <div class="content">
            <h2 class="title be-results-title">
              {{ $t("header_text") }}
            </h2>
            <p>
              {{ $t("explanation_intro") }}
            </p>
            <ul id="be-nonprofit-list">
              <li v-for="(item, index) in dataLocal" v-bind:key="index">
                <h3 class="subtitle be-nonprofit-subtitle  is-5">
                  {{ item[`title_${langLocal}`] }}
                </h3>
                <p class="be-results-text">
                  {{ item[`summary_${langLocal}`] }}
                </p>
              </li>
            </ul>
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
  </div>
</template>

<script>
import Vue from "vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import VueI18nNonProfit from "vue-i18n";
import Printd from "printd";
import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
Vue.use(VueI18nNonProfit);
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Create VueI18n instance with options
export const i18n = new VueI18nNonProfit({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en"
});

export default {
  name: "NonProfit",
  components: {
    BaseCard
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        close: "Back",
        download: "Download",
        download_name: "non-profit-entities",
        header_text: "Non-Profit Summary Page",
        explanation_intro:
          "Based on your answer, you are interested in a non-profit structure. This tool mainly assists people starting for-profit enterprises. To help you think about the right non-profit structure, here are the main types:",
        restart: "Restart",
        previous: "Back",
        print: "Print",
        print_results: "Results",
        print_summaries: "Print/Download",
        powerby: "Powered by ",
        bizpal_link: "https://services.bizpal-perle.ca/",
        bizpal: "BizPaL",
        results: "Business Structures Wizard",
        next_steps: "What's Next?",
        next_steps_title: "What's Next?",
        next_steps_intro:
          "Ready to start your business? Try these next steps. Keep in mind, some business structures may require the services of a lawyer and accountant.",
        general_resources: "All Business Types:",
        non_profit_resources: "Non-Profit Resources:"
      },
      fr: {
        close: "Fermer",
        download: "Télécharger",
        download_name: "non-profit-entities",
        header_text: "Non-Profit Summary Page (fr)",
        explanation_intro:
          "Based on your answer, you are interested in a non-profit structure. This tool mainly assists people starting for-profit enterprises. To help you think about the right non-profit structure, here are the main types: (FR)",
        restart: "Redémarrer",
        previous: "Précédent",
        print: "Imprimer",
        print_results: "Les résultats",
        print_summaries: "Imprimer/Telecharger",
        powerby: "Proposé par ",
        bizpal_link: "https://services.perle-bizpal.ca/",
        bizpal: "PerLE",
        results: "Business Structures Wizard (FR)",
        next_steps: "What's Next? (FR)",
        next_steps_title: "What's Next? (FR)",
        next_steps_intro:
          "Ready to start your business? Try these next steps. Keep in mind, some business structures may require the services of a lawyer and accountant.(FR)",
        general_resources: "All Business Types : (FR)",
        non_profit_resources: "Non-Profit Resources : (FR)"
      }
    }
  }, // end i18n
  props: {
    lang: {
      type: String,
      default: "en"
    },
    entityId: {
      type: String,
      default: ""
    },
    sgc: {
      type: String,
      default: "59"
    },
    data: {
      type: Object
    }
  },
  data: function() {
    return {
      canCancel: false,
      css: `.be-nonprofit-subtitle {
              color: #24465c;
              font-weight: 400;
              margin-top: 24px;
              margin-bottom: 12px;
            }
        `,
      dataLocal: this.data,
      isCardModalActive: false,
      langLocal: this.lang,
      nextSteps: false
    };
  }, // end data
  created: function() {
    this.dataLocal = this.dataLocal[`pid-${this.sgc}`]["non-profit-entities"];
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;

    // check if if it's associative , if yes, move to

    if (this.entityId == "n3") {
      let temp = {};
      let self = this;
      let objKeys = Object.keys(this.dataLocal);
      temp["n3"] = this.dataLocal["n3"];
      objKeys.forEach(function(value) {
        if (value != "n3") {
          temp[value] = self.dataLocal[value];
        }
      });
      this.dataLocal = temp;
    }
  }, // end mounted

  methods: {
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
    nextStepsClick: function() {
      this.nextSteps = true;
    },
    // sort links in order of which non-profit structure was recommended first
    getNextSteps: function() {
      let resourcesList = this.data[`pid-${this.sgc}`].resources;
      let entityID = this.entityId;
      this.resourcesGeneral = resourcesList.general_resources;
      switch (entityID) {
        case "n3":
          this.resources = [resourcesList.r2.url_2, resourcesList.r2.url_1];
          break;
        default:
          this.resources = [resourcesList.r2.url_1, resourcesList.r2.url_2];
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
          { text: this.$t("header_text"), style: "title" },
          { text: this.$t("explanation_intro"), style: "header" }
        ],
        styles: {
          title: {
            fontSize: 16,
            bold: true,
            lineHeight: 1.5
          },
          header: {
            fontSize: 10,
            lineHeight: 1.5,
            margin: [1, 1, 0, 5]
          },
          subtitle: {
            fontSize: 14,
            bold: true,
            lineHeight: 1.5,
            color: "#2c5671",
            margin: [15, 1, 0, 1]
          },
          normal: {
            fontSize: 10,
            lineHeight: 1.5,
            margin: [15, 1, 0, 1]
          }
        }
      };

      for (const index in this.dataLocal) {
        let entity = this.dataLocal[index];
        document.content.push([
          {
            text: entity[`title_${this.langLocal}`],
            style: "subtitle"
          },

          {
            text: entity[`summary_${this.langLocal}`],
            style: "normal"
          }
        ]);
      } //for

      document.content.push([
        {
          text: this.$t("powerby") + this.$t("bizpal"),
          style: "normal",
          margin: [0, 5, 0, 5],
          link: this.$t("bizpal_link")
        }
      ]);
      pdfMake.createPdf(document).download(filename);
    },
    printEntity: function() {
      this.isCardModalActive = true;
    },
    printSummaries: function() {
      this.isCardModalActive = true;
    },
    print: function() {
      const d = new Printd();
      d.print(this.$refs.PrintBody, [this.css]);
    }
  } // end methods
}; // end export default
</script>

<style></style>
