<template>
  <div>
    <div class="modal-card be-card" scroll="keep">
      <div class="modal-card-head be-modal-card-head">
        <div class="container">
          <div class="columns is-mobile">
            <div class="column is-three-quarters">
              <h1 class="be-modal-title">
                {{ $t("business_structures") }}
              </h1>
            </div>
            <div class="column  is-one-quarter"></div>
          </div>
          <div class="columns be-subheader">
            <div class="column auto"></div>
            <div class="column is-one-half">
              <div class="column be-subheader is-four-fifths is-pulled-right ">
                <div v-if="started">
                  <b-tooltip
                    type="is-light"
                    :label="$t('entity_tooltip')"
                    multilined
                    position="is-top"
                  >
                    <div>
                      <h2 class="subtitle be-subtitle is-5">
                        {{ $t("entity_title_one") }}
                      </h2>
                      <h3 class="subtitle be-subtitle is-4">
                        {{ $t("entity_title_two") }}
                      </h3>
                    </div>
                  </b-tooltip>
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
      <div class="modal-card-body be-modal-card-body">
        <div v-if="!started">
          <BaseCard class="be-summary box">
            <template v-slot:headertext>
              <h2 v-if="welcomeGate" class="title be-results-title">
                {{ $t("welcome") }}
              </h2>
            </template>
            <template v-slot:bodytext>
              <div v-if="welcomeGate">
                <p>{{ $t("intro_1") }}</p>
                <p>{{ $t("intro_2") }}</p>
                <p>{{ $t("intro_3") }}</p>
                <p>{{ $t("intro_4") }}</p>
                <p>
                  {{ $t("intro_5")
                  }}<a class="be-link" @click="printSummaries"> here</a>.
                </p>
                <b-button class="be-start-button" @click="start()">
                  {{ $t("start") }}</b-button
                >
              </div>
            </template>
            <template v-slot:footertext>
              <section v-if="welcomeGate" class="be-disclaimer">
                <p v-html="$t('disclaimer')">{{ $t("intro_disclaimer") }}</p>
              </section>
            </template>
          </BaseCard>
        </div>
        <div v-if="started">
          <Entity
            @clicked="restartEntity"
            :lang="this.langLocal"
            :sgc="this.sgcLocal"
            :data="this.dataLocal"
          ></Entity>
        </div>
      </div>

      <footer class="modal-card-foot be-modal-card-foot">
        <p class="is-pulled-right">
          <span v-if="welcomeGate">
            <img
              class="be-footer-logo"
              src="../assets/BC_Logo_Colour.png"
              alt="British Columbia Logo"
            />
          </span>

          <b-tooltip
            v-if="!welcomeGate"
            class="be-tooltip"
            multilined
            role="tooltip"
            :triggers="['focus', 'hover']"
          >
            <template v-slot:content>
              {{ $t("tooltip_disclaimer") }}
            </template>
            <span tabindex="0">{{ $t("disclaimer_title") }}</span>
          </b-tooltip>
          <span v-if="started"> | </span>

          <a
            v-if="started"
            class="be-link"
            target="_blank"
            rel="noopener"
            :href="$t('support_link')"
            >{{ $t("support") }}</a
          >
          <span v-if="!welcomeGate"> | </span>
          <span>
            {{ $t("powered") }}
            <a
              class="be-link"
              target="_blank"
              rel="noopener"
              :href="$t('bizpal_link')"
              >{{ $t("bizpal") }}</a
            >
          </span>
        </p>
      </footer>
    </div>
    <b-modal
      :active.sync="isSummariesModalActive"
      :can-cancel="canCancel"
      full-screen
      aria-role="dialog"
      aria-modal
      class="be-print-modal"
    >
      <ModalSummary @clicked="closeModal()" :data="dataSummary"> </ModalSummary>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import BaseCard from "@/components/base-components/BaseCard.vue";
import Entity from "@/components/Entity.vue";
import VueI18nHome from "vue-i18n";
import ModalSummary from "./ModalSummary.vue";
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
    ModalSummary
  },
  i18n: {
    locale: "en",
    messages: {
      en: {
        business_structures: "Business Structures Wizard",
        welcome: "Welcome",
        close: "Exit",
        restart: "Restart",
        start: "Start",
        entity_title_one: "Suggested",
        entity_title_two: "Business Structure",
        disclaimer_title: "Disclaimer",
        disclaimer:
          "This tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making your decision.",
        tooltip_disclaimer:
          "This tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making your decision.",
        powered: "Powered by",
        bizpal_link: "https://services.bizpal-perle.ca/",
        bizpal: "BizPaL",
        intro_1:
          "One of your first decisions when creating a new organization is your legal structure, or entity type. Each type has advantages and disadvantages.",
        intro_2:
          "Use this tool to compare different business structure options and help you determine which one may be the best fit for your business.",
        intro_3:
          "The tool covers the most common types in British Columbia: sole proprietorships, partnerships, corporations, and benefit companies.",
        intro_4: "Pick the answers that best fit your business.",
        intro_5: "You can also read a summary of all business structures",
        intro_disclaimer:
          "No personal information will be requested or collected through the use of this tool.",
        entity_tooltip:
          "Watch these progress bars change to see how your answers affect your best match.",
        support_link: "mailto:open@bizpal-perle.ca",
        support: "Support"
      }
    },
    fr: {
      business_structures: "Structures d'entreprise",
      welcome: "Bienvenue",
      close: "Fermer",
      restart: "Redémarrer",
      start: "Commencer",
      entity_title_one: "Structure d'entreprise",
      entity_title_two: "suggérée",
      disclaimer_title: "Disclaimer (fr)",
      disclaimer:
        "This tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making your decision.(fr)",
      tooltip_disclaimer:
        "This tool is intended as general guidance and not as legal or financial advice. Please seek the services of a lawyer and accountant before making your decision.(fr)",
      powered: "Proposé par",
      bizpal_link: "https://services.perle-bizpal.ca/",
      bizpal: "PerLE",
      intro_1:
        "One of your first decisions when creating a new organization is your legal structure, or entity type. Each type has advantages and disadvantages. (FR)",
      intro_2:
        "Use this tool to compare different business structure options and help you determine which one may be the best fit for your business. (FR)",
      intro_3:
        "The tool covers the most common types in British Columbia: sole proprietorships, partnerships, corporations, and benefit companies. (FR)",
      intro_4: "Pick the answers that best fit your business.",
      intro_5:
        "You can also read a summary of all business structures here. (FR)",
      intro_disclaimer:
        "No personal information will be requested or collected through the use of this tool. FR",
      entity_tooltip:
        "Watch these progress bars change to see how your answers affect your best match. (FR)",
      support_link: "mailto:ouverts@perle-bizpal.ca",
      support: "Support (FR)"
    }
  }, // end i18n
  props: {
    lang: {
      type: String,
      default: "en"
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
      radioButton: "",
      started: false,
      langLocal: this.lang,
      welcomeGate: true,
      sgcLocal: this.sgc,
      dataLocal: this.data,
      isSummariesModalActive: false,
      canCancel: false
    };
  },
  created: function() {
    this.dataSummary = this.dataLocal[`pid-${this.sgcLocal}`];
  },
  mounted: function() {
    this.$i18n.locale = this.langLocal;
  },
  methods: {
    start: function() {
      this.started = true;
      this.welcomeGate = false;
    },
    // reset form
    reset: function() {
      this.started = false;
    },
    // restart from entity card
    restartEntity(value) {
      if (value == false) {
        this.started = value;
        this.welcomeGate = true;
      }
      if (value == true) {
        this.started = false;
        this.welcomeGate = value;
      }
    },
    printSummaries: function() {
      this.isSummariesModalActive = true;
    },
    closeModal(value) {
      this.isSummariesModalActive = value;
    }
  } //end methods
};
</script>

<style></style>
