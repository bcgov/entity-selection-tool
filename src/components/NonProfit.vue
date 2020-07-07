<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <p>{{ $t("header_text") }}</p>
        </template>
        <template v-slot:bodytext>
          <h6>{{ $t("cooperative") }}</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
          </ul>
          <h6>{{ $t("incorporated") }}</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
          </ul>
          <h6>{{ $t("non_registered") }}</h6>
          <ul class="be-nonprofit-list">
            <li>1</li>
            <li>2</li>
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
        header_text: "This is the Non Profit Summary Page",
        cooperative: "Cooperative Association",
        incorporated: "Incorporated Society",
        non_registered: "Non-Registered Society",
        restart: "Restart",
        print_results: "Print Results",
        print_summaries: "Print All Summaries"
      },
      fr: {
        header_text: "This is the Non Profit Summary Page (fr)",
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
      langLocal: this.lang
    };
  }, // end data
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  }, // end mounted
  methods: {
    onClickButton: function() {
      this.tempValue = false;
      this.$emit("clicked", this.tempValue);
    }
  } // end methods
}; // end export default
</script>

<style></style>
