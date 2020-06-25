<i18n>
{
  "en": {
    "business_structures": "Business Structure Title"
  },
   "fr": {
    "business_structures": "Business Structure Title - French"
  }
}
</i18n>

<template>
  <div class="modal-card" scroll="keep">
    <div class="modal-card-head">
      <div class="container">
        <div class="columns">
          <div class="column is-three-quarters">
            <h1>
              {{ $t("business_structures") }}
            </h1>
          </div>
          <div class="column is-one-quarter">
            <b-button
              class="is-pulled-right"
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
        <div class="columns">
          <div class="column auto"></div>
          <div class="column is-one-half">
            <div class="column is-four-fifths is-pulled-right be-subtitle">
              <div v-if="started">
                <h3 style="color: white">
                  {{ $t("entity_title_one") }}
                </h3>

                <h2 style="color: white">
                  {{ $t("entity_title_two") }}
                </h2>
              </div>
              <div v-if="!started">
                <h3 style="visibility: hidden">test</h3>

                <h2 style="visibility: hidden">test</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-card-body">
      <div v-if="!started && !nonProfit">
        <BaseCard class="question box">
          <template v-slot:headertext> </template>
          <template v-slot:bodytext>
            <p>
              Which of these statements best describes the main purpose of your
              new organization?
            </p>
            <br />
            <b-radio
              @click.native="start()"
              name="purpose"
              native-value="profit"
            >
              <label for="profit">Generate a profit for owners</label>
            </b-radio>

            <br />
            <b-radio
              @click.native="start()"
              name="purpose"
              native-value="services"
            >
              <label for="services"
                >Provide services as a licensed professional</label
              >
            </b-radio>

            <br />
            <b-radio
              @click.native="showNonProfit()"
              name="purpose"
              native-value="charitable"
            >
              <label for="charitable">Charitable cause or public benefit</label>
            </b-radio>

            <br />
            <b-radio
              @click.native="showNonProfit()"
              name="purpose"
              native-value="cooperative"
            >
              <label for="cooperative"
                >Provide shared benefit for members through a cooperative
                association</label
              >
            </b-radio>

            <br />
          </template>
        </BaseCard>
      </div>
      <div v-if="started">
        <Entity></Entity>
      </div>
      <div v-if="nonProfit">
        <NonProfit></NonProfit>
      </div>
    </div>
    <footer class="modal-card-foot">
      <p class="is-pulled-right">Powered by BizPaL</p>
    </footer>
  </div>
</template>

<script>
import BaseCard from "@/components/base-components/BaseCard.vue";
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue";
require("../i18n");

export default {
  name: "ModalHome",
  components: {
    BaseCard,
    Entity,
    NonProfit
  },
  data: function() {
    this.$i18n.locale = "en";

    return {
      started: false,
      nonProfit: false
    };
  },
  methods: {
    start: function() {
      this.started = true;
    },
    showNonProfit: function() {
      this.nonProfit = true;
    }
  }
};
</script>

<style></style>
