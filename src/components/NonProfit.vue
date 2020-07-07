<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="summary box">
        <template v-slot:headertext>
          <h2 class="title be-question-title is-4">
            {{ $t("header_text") }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <ul class="be-nonprofit-list">
            <li v-for="(item, index) in data" v-bind:key="index">
              <h3 class="subtitle be-nonprofit-subtitle  is-5">
                {{ item.title_en }}
              </h3>
              <p class="be-results-text">{{ item.summary_en }}</p>
            </li>
          </ul>
        </template>
        <template v-slot:footertext>
          <a href="#" class="card-footer-item" @click="onClickButton">{{
            $t("restart")
          }}</a>
          <a href="#" class="card-footer-item">{{ $t("print_results") }}</a>
          <a href="#" class="card-footer-item">{{ $t("print_summaries") }}</a>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>
  </div>
</template>

<script>
import Vue from "vue";
import json from "@/data/be-json-v1-BC-NonProfit.json";
import BaseCard from "@/components/base-components/BaseCard.vue";
import VueI18nNonProfit from "vue-i18n";

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
        header_text: "Non Profit Summary Page",
        cooperative: "Cooperative Association",
        incorporated: "Incorporated Society",
        non_registered: "Non-Registered Society",
        restart: "Restart",
        print_results: "Print Results",
        print_summaries: "Print All Summaries"
      },
      fr: {
        header_text: "Non Profit Summary Page (fr)",
        cooperative: "Cooperative Association (fr)",
        incorporated: "Incorporated Society (fr)",
        non_registered: "Non-Registered Society (fr)",
        restart: "Redémarrer",
        print_results: "Imprimer les résultats",
        print_summaries: "Imprimer tous les sommaires"
      }
    }
  }, // end i18n
  props: {
    lang: {
      type: String,
      default: "en"
    }
  },
  data: function() {
    return {
<<<<<<< HEAD
      lang: "en",
      data: json
=======
      langLocal: this.lang
>>>>>>> 647be8c68d6943a484ba17e94d099056171f2227
    };
  }, // end data
  created: function() {
    this.data = this.data["non-profit-entities"];
  }, // end created
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  }, // end mounted
  computed: {
    title: function() {
      return this.item[`title_${this.lang}`] || "N/A";
    },
    body: function() {
      return this.item[`summary_${this.lang}`] || "N/A";
    }
  }, // end computed
  methods: {
    onClickButton: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    }
  } // end methods
}; // end export default
</script>

<style></style>
