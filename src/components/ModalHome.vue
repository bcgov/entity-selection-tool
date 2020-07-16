<template>
  <div class="modal-card" scroll="keep">
    <div class="modal-card-head">
      <div class="container">
        <div class="columns is-mobile">
          <div class="column is-three-quarters">
            <h1 class="be-modal-title">
              {{ $t("business_structures") }}
            </h1>
          </div>
          <div class="column  is-one-quarter">
            <b-button
              class="be-nav-button is-pulled-right"
              outlined
              type="is-light"
              :aria-label="$t('close')"
              @click="$parent.close()"
            >
              <font-awesome-icon :icon="['fas', 'times']" />
              {{ $t("close") }}
            </b-button>
          </div>
        </div>
        <div class="columns be-subheader">
          <div class="column auto"></div>
          <div class="column is-one-half">
            <div class="column be-subheader is-four-fifths is-pulled-right ">
              <div v-if="started">
                <h2 class="subtitle be-subtitle is-5">
                  {{ $t("entity_title_one") }}
                </h2>
                <h3 class="subtitle be-subtitle is-4">
                  {{ $t("entity_title_two") }}
                </h3>
              </div>
              <div v-if="!started">
                <h2
                  class="subtitle be-subtitle is-5"
                  style="visibility: hidden"
                >
                  Placeholder
                </h2>
                <h3
                  class="subtitle be-subtitle is-4"
                  style="visibility: hidden"
                >
                  Placeholder
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-card-body">
      <div v-if="!started && !nonProfit">
        <BaseCard class="summary box">
          <template v-slot:headertext>
            <h2 v-if="!introGate" class="title be-question-title is-4">
              {{ $t("welcome") }}
            </h2></template
          >
          <template v-slot:bodytext>
            <div v-if="!introGate">
              <p>{{ $t("intro_1") }}</p>
              <p>{{ $t("intro_2") }}</p>
              <p>{{ $t("intro_3") }}</p>
              <p>{{ $t("intro_4") }}</p>
              <p style="margin-bottom: 0px;">{{ $t("intro_disclaimer") }}</p>
              <!--  <b-button class="be-form-button" @click="showIntroGate()">
                {{ $t("start") }}</b-button
              > -->
            </div>
            <div v-if="introGate">
              <fieldset class="be-card-content">
                <legend class="be-gate-text">
                  {{ $t("start_question") }}
                </legend>
                <br />
                <form class="be-question-form">
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="start()"
                      id="profit"
                      name="purpose"
                      native-value="profit"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt1") }}
                    </b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="start()"
                      id="services"
                      name="purpose"
                      native-value="services"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt2") }}
                    </b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="start()"
                      id="services"
                      name="purpose"
                      native-value="services"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt3") }}
                    </b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="showNonProfit()"
                      id="charitable"
                      name="purpose"
                      native-value="charitable"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt4") }}
                    </b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="showNonProfit('n3')"
                      id="cooperative"
                      name="purpose"
                      native-value="cooperative"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt5") }}
                    </b-radio>
                  </div>
                </form>
              </fieldset>
            </div>
          </template>
          <template v-slot:footertext>
            <span v-if="!introGate" class="card-footer-item">
              <b-button class="be-form-button" @click="showIntroGate()">
                {{ $t("start") }}</b-button
              >
            </span>
          </template>
        </BaseCard>
      </div>
      <div v-if="started">
        <Entity @clicked="restartEntity" :lang="this.langLocal"></Entity>
      </div>
      <div v-if="nonProfit">
        <NonProfit
          @clicked="restartNonProfit"
          :lang="this.langLocal"
          :entity-id="this.radioButton"
        ></NonProfit>
      </div>
    </div>

    <footer class="modal-card-foot">
      <p class="is-pulled-right">
        <b-tooltip class="be-tooltip" :label="$t('disclaimer')" multilined>
          {{ $t("disclaimer_title") }} |
        </b-tooltip>

        {{ $t("powered") }}
        <a
          class="be-link"
          target="_blank"
          rel="noopener"
          :href="$t('bizpal_link')"
          >{{ $t("bizpal") }}</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
import Vue from "vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue";

import VueI18nHome from "vue-i18n";

Vue.use(VueI18nHome);

// Create VueI18n instance with options
export const i18n = new VueI18nHome({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en"
});

export default {
  name: "ModalHome",
  components: {
    BaseCard,
    Entity,
    NonProfit
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        business_structures: "Business Structures Wizard",
        welcome: "WELCOME",
        close: "Close",
        restart: "Restart",
        start: "Start",
        entity_title_one: "Suggested",
        entity_title_two: "Business Structure",
        start_question:
          "Which of these statements best describes the main purpose of your new organization?",
        start_question_opt1: "Generate a profit for owners",
        start_question_opt2:
          "Generate a profit for owners combined with a public benefit",
        start_question_opt3: "Provide services as a licensed professional",
        start_question_opt4: "Support a charitable cause or public benefit",
        start_question_opt5:
          "Provide shared benefit for members through a cooperative association",
        disclaimer_title: "Disclaimer",
        disclaimer:
          "Please note that this tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making a decision.",
        powered: "Powered by",
        bizpal_link: "https://services.bizpal-perle.ca/",
        bizpal: "BizPaL",
        intro_1:
          "One of your first decisions when creating a new organization is your legal structure, or entity type. Each type has advantages and disadvantages.",
        intro_2:
          "Use this tool to compare different business entity options and help you determine which one may be the best fit for your business.",
        intro_3:
          "This tool helps you decide among the most common types: proprietorships, partnerships, corporations, benefit companies, co-operatives, and non-profit societies.",
        intro_4: "Pick the answers that best fit your situation.",
        intro_disclaimer:
          "Please note that no personal information will be requested or collected through the use of this tool."
      },
      fr: {
        business_structures: "Structures d'entreprise",
        welcome: "BIENVENUE",
        close: "Fermer",
        restart: "Redémarrer",
        start: "Commencer",
        entity_title_one: "Structure d'entreprise",
        entity_title_two: "suggérée",
        start_question:
          "Which of these statements best describes the main purpose of your new organization? (fr)",
        start_question_opt1: "Generate a profit for owners (fr)",
        start_question_opt2:
          "Generate a profit for owners combined with a public benefit (fr)",
        start_question_opt3: "Provide services as a licensed professional (fr)",
        start_question_opt4:
          "Support a charitable cause or public benefit (fr)",
        start_question_opt5:
          "Provide shared benefit for members through a cooperative association (fr)",
        disclaimer_title: "Disclaimer (fr)",
        disclaimer:
          "Please note that this tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making a decision. (fr)",
        powered: "Proposé par",
        bizpal_link: "https://services.perle-bizpal.ca/",
        bizpal: "PerLE",
        intro_1:
          "One of your first decisions when creating a new organization is your legal structure, or entity type. Each type has advantages and disadvantages. FR",
        intro_2:
          "Use this tool to compare different business entity options and help you determine which one may be the best fit for your business. FR",
        intro_3:
          "This tool helps you decide among the most common types: proprietorships, partnerships, corporations, benefit companies, co-operatives, and non-profit societies. FR",
        intro_4: "Pick the answers that best fit your situation.FR",
        intro_disclaimer:
          "Please note that no personal information will be requested or collected through the use of this tool. FR"
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
      radioButton: "",
      started: false,
      nonProfit: false,
      langLocal: this.lang,
      introGate: false
    };
  },
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  },
  methods: {
    start: function() {
      this.started = true;
    },
    // reset form
    reset: function() {
      this.started = false;
      this.nonProfit = false;
    },
    showNonProfit: function(type) {
      this.radioButton = type;
      this.nonProfit = true;
    },
    showIntroGate: function() {
      this.introGate = true;
    },
    // restart from non-profit card
    restartNonProfit(value) {
      this.nonProfit = value;
    },
    // restart from entity card
    restartEntity(value) {
      this.started = value;
    }
  } //end methods
};
</script>

<style></style>
