<template>
  <div class="modal-card" scroll="keep">
    <div class="modal-card-head">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <h1 class="be-modal-title">
              {{ $t("business_structures") }}
            </h1>
          </div>
          <div class="column auto">
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
            <div v-if="started">
              <b-button
                class="be-nav-button is-pulled-right"
                outlined
                type="is-light"
                :aria-label="$t('restart')"
                @click="reset()"
              >
                <font-awesome-icon :icon="['fas', 'undo']" />
                {{ $t("restart") }}
              </b-button>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column auto"></div>
          <div class="column is-one-half">
            <div class="column is-four-fifths is-pulled-right be-subheader">
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
        <BaseCard class="question box">
          <template v-slot:headertext>
            <h2 v-if="!introGate" class="title be-question-title is-4">
              WELCOME
            </h2></template
          >
          <template v-slot:bodytext>
            <div v-if="!introGate">
              <p class="be-intro-text">{{ $t("intro_1") }}</p>
              <p class="be-intro-text">{{ $t("intro_2") }}</p>
              <p class="be-intro-text">{{ $t("intro_3") }}</p>
              <p class="be-intro-text">{{ $t("intro_4") }}</p>

              <div class="buttons">
                <b-button
                  class="be-form-button"
                  size="is-medium"
                  @click="showIntroGate()"
                >
                  Start
                </b-button>
              </div>
            </div>
            <div v-if="introGate">
              <fieldset>
                <legend>
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
                      @click.native="showNonProfit()"
                      id="charitable"
                      name="purpose"
                      native-value="charitable"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt3") }}
                    </b-radio>
                  </div>
                  <div class="field">
                    <b-radio
                      type="is-info"
                      @click.native="showNonProfit()"
                      id="cooperative"
                      name="purpose"
                      native-value="cooperative"
                      v-model="radioButton"
                    >
                      {{ $t("start_question_opt4") }}
                    </b-radio>
                  </div>
                </form>
              </fieldset>
            </div>
          </template>
          <template v-slot:footertext>
            <section class="be-context">
              <p v-if="!introGate">{{ $t("intro_disclaimer") }}</p>
              <p v-if="introGate">
                {{ $t("disclaimer") }}
              </p>
            </section>
          </template>
        </BaseCard>
      </div>
      <div v-if="started">
        <Entity></Entity>
      </div>
      <div v-if="nonProfit">
        <NonProfit @clicked="restartNonProfit"></NonProfit>
      </div>
    </div>

    <footer class="modal-card-foot">
      <p class="is-pulled-right">
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
        close: "Close",
        restart: "Restart",
        entity_title_one: "Suggested",
        entity_title_two: "Business Structure",
        start_question:
          "Which of these statements best describes the main purpose of your new organization?",
        start_question_opt1: "Generate a profit for owners",
        start_question_opt2: "Provide services as a licensed professional",
        start_question_opt3: "Charitable cause or public benefit",
        start_question_opt4:
          "Provide shared benefit for members through a cooperative association",
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
        close: "Fermer",
        restart: "Redémarrer",
        entity_title_one: "Structure d'entreprise",
        entity_title_two: "suggérée",
        start_question:
          "Which of these statements best describes the main purpose of your new organization? (fr)",
        start_question_opt1: "Generate a profit for owners (fr)",
        start_question_opt2: "Provide services as a licensed professional (fr)",
        start_question_opt3: "Charitable cause or public benefit (fr)",
        start_question_opt4:
          "Provide shared benefit for members through a cooperative association (fr)",
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
  data: function() {
    return {
      radioButton: "",
      started: false,
      nonProfit: false,
      lang: "en",
      introGate: false
    };
  },
  mounted: function() {
    this.$i18n.locale = this.lang;
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
    showNonProfit: function() {
      this.nonProfit = true;
    },
    showIntroGate: function() {
      this.introGate = true;
    },
    // restart from non-profit card
    restartNonProfit(value) {
      this.nonProfit = value;
    }
  } //end methods
};
</script>

<style></style>
