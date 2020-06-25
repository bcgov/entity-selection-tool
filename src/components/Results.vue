<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h2>
            {{ title }}
          </h2>
        </template>
        <template v-slot:bodytext>
          <p class="be-results-text">{{ body }}</p>
          <div>
            <h6>{{ $t("advantages") }}</h6>
            <ul class="be-results-text">
              <span v-html="advantages"></span>
            </ul>
          </div>
          <br />
          <div>
            <h6>{{ $t("disadvantages") }}</h6>
            <ul class="be-results-text">
              <span v-html="disadvantages"></span>
            </ul>
          </div>
        </template>
        <template v-slot:footertext>
          <a href="#" class="card-footer-item">{{ $t("restart") }}</a>
          <a href="#" class="card-footer-item">Print Results</a>
          <a href="#" class="card-footer-item">Print All Entity Summaries</a>
        </template>
      </BaseCard>
    </div>
    <div class="column is-half"></div>
  </div>
</template>
<script>
import BaseCard from "@/components/base-components/BaseCard.vue";
export default {
  name: "Results",
  components: {
    BaseCard
  },
  props: {
    data: Object,
    entityId: String
  },
  data: function() {
    return {
      entity: {},
      lang: "en"
    };
  },
  created() {
    // get top Entity from data
    this.entity = this.data.entities[this.entityId];
  },
  computed: {
    title: function() {
      return this.entity[`title_${this.lang}`];
    },

    body: function() {
      return this.entity[`summary_${this.lang}`];
    },

    advantages: function() {
      return this.entity[`advantage_${this.lang}`];
    },

    disadvantages: function() {
      return this.entity[`disadvantage_${this.lang}`];
    }
  }
};
</script>
