<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="summary box">
        <template v-slot:headertext>
          <h2 class="title be-results-title is-4">
            {{ $t("header_text") }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <p>
            {{ $t("explanation_intro") }}
          </p>
          <ul class="be-nonprofit-list">
            <li v-for="(item, index) in data" v-bind:key="index">
              <h3 class="subtitle be-nonprofit-subtitle  is-5">
                {{ item[`title_${langLocal}`] }}
              </h3>
              <p class="be-results-text">{{ item[`summary_${langLocal}`] }}</p>
            </li>
          </ul>
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
          <span class="card-footer-item">
            <b-button class="be-form-button" @click="printSummaries">
              {{ $t("print_summaries") }}
            </b-button>
          </span>
          <span class="card-footer-item">
            <b-button class="be-form-button" disabled>
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
        <header class="modal-card-head be-print-modal-head">
          <span class="be-modal-title">{{ $t("results") }}</span>
        </header>
        <section id="printBody" ref="PrintBody" class="be-modal-print-body">
          <div class="content">
            <h2 class="title be-question-title is-4">
              {{ $t("header_text") }}
            </h2>
            <p>
              {{ $t("explanation_intro") }}
            </p>
            <ul id="be-nonprofit-list">
              <li v-for="(item, index) in data" v-bind:key="index">
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
  </div>
</template>

<script>
import Vue from "vue";
import json from "@/data/be-json-v6.0.json";
import BaseCard from "@/components/base-components/BaseCard.vue";
import VueI18nNonProfit from "vue-i18n";
import Printd from "printd";
import jsPDF from "jspdf";

Vue.use(VueI18nNonProfit);

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
        next_steps: "What's Next?"
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
        next_steps: "What's Next? (FR)"
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
      data: json,
      isCardModalActive: false,
      langLocal: this.lang
    };
  }, // end data
  created: function() {
    this.data = this.data["pid-59"]["non-profit-entities"];
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;

    // check if if it's associative , if yes, move to

    if (this.entityId == "n3") {
      let temp = {};
      let self = this;
      let objKeys = Object.keys(this.data);
      temp["n3"] = this.data["n3"];
      objKeys.forEach(function(value) {
        if (value != "n3") {
          temp[value] = self.data[value];
        }
      });
      this.data = temp;
    }
  }, // end mounted

  methods: {
    onClickButton: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    },
    onClickPrevious: function() {
      this.tempValue = true;
      this.$emit("clicked", this.tempValue);
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
