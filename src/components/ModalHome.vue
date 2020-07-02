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
          <div v-if="started" class="column is-one-eigth">
            <b-button
              class="be-nav-button is-pulled-right"
              outlined
              type="is-light is-small"
              :aria-label="$t('restart')"
              @click="reset()"
            >
              <font-awesome-icon :icon="['fas', 'undo']" />
              Restart
            </b-button>
          </div>
          <div class="column is-one-eigth">
            <b-button
              class="be-nav-button is-pulled-right"
              outlined
              type="is-light is-small"
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
                <h3>
                  {{ $t("entity_title_one") }}
                </h3>

                <h2>
                  {{ $t("entity_title_two") }}
                </h2>
              </div>
              <div v-if="!started">
                <h3 style="visibility: hidden">Placeholder</h3>

                <h2 style="visibility: hidden">Placeholder</h2>
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
              type="is-info"
              @click.native="start()"
              id="profit"
              name="purpose"
              native-value="profit"
              v-model="radioButton"
            >
              Generate a profit for owners
            </b-radio>

            <br />
            <b-radio
              type="is-info"
              @click.native="start()"
              id="services"
              name="purpose"
              native-value="services"
              v-model="radioButton"
            >
              Provide services as a licensed professional
            </b-radio>

            <br />
            <b-radio
              type="is-info"
              @click.native="showNonProfit()"
              id="charitable"
              name="purpose"
              native-value="charitable"
              v-model="radioButton"
            >
              Charitable cause or public benefit
            </b-radio>

            <br />
            <b-radio
              type="is-info"
              @click.native="showNonProfit()"
              id="cooperative"
              name="purpose"
              native-value="cooperative"
              v-model="radioButton"
            >
              Provide shared benefit for members through a cooperative
              association
            </b-radio>

            <br />
          </template>
          <template v-slot:footertext>
            <section class="be-context">
              <p>
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
      <p class="is-pulled-right">Powered by BizPaL</p>
    </footer>
  </div>
</template>

<script>
import BaseCard from "@/components/base-components/BaseCard.vue";
import Entity from "@/components/Entity.vue";
import NonProfit from "@/components/NonProfit.vue";
export default {
  name: "ModalHome",
  components: {
    BaseCard,
    Entity,
    NonProfit
  },
  data: function() {
    return {
      radioButton: "",
      started: false,
      nonProfit: false
    };
  },
  methods: {
    start: function() {
      this.started = true;
    },
    reset: function() {
      this.started = false;
      this.nonProfit = false;
    },
    showNonProfit: function() {
      this.nonProfit = true;
    },
    restartNonProfit(value) {
      this.nonProfit = value;
    }
  }
};
</script>

<style></style>
