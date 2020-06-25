<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h3>
            {{ title }}
          </h3>
        </template>
        <template v-slot:bodytext>
          <!-- <p>{{ body }}</p> -->
          <div>
            <h4>{{ $t("advantages") }}</h4>
            <ul>
              <span v-html="advantages"></span>
            </ul>
          </div>
          <div>
            <h4>{{ $t("disadvantages") }}</h4>
            <ul>
              <span v-html="disadvantages"></span>
            </ul>
          </div>
        </template>
        <template v-slot:footertext>
          <!-- <router-link to="/">{{ $t("restart") }}</router-link> || -->
          <b-button class="card-footer-item">Print result</b-button>
          <b-button class="card-footer-item"
            >Print all entities summary</b-button
          >
        </template>

        <!-- new -->
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
