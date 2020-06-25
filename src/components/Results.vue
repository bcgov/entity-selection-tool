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
          <b-button class="card-footer-item" @click="printEntity"
            >Print result</b-button
          >
          <b-button class="card-footer-item"
            >Print all entities summary</b-button
          >
        </template>

        <!-- new -->
      </BaseCard>
    </div>
    <div class="column is-half"></div>

    <b-modal :active.sync="isCardModalActive" full-screen class="print-modal">
      <div class="columns">
        <div class="column is-full">
          <section class="section">
            <div class="container">
              <h1 class="title">Suggested Business Structure</h1>
              <h2 class="subtitle">
                {{ title }}
              </h2>

               <div><p>{{body}}</p></div>
              <div>
                <h2>{{ $t("advantages") }}</h2>
                <ul>
                  <span v-html="advantages"></span>
                </ul>
              </div>

              <div>
                <h2>{{ $t("disadvantages") }}</h2>
                <ul>
                  <span v-html="disadvantages"></span>
                </ul>
              </div>
            </div>
          </section>
          <section class="section">
            <div class="container">
              <h1 class="title">Your Questions/Anwers</h1>
              <h2 class="subtitle">
                A simple container to divide your page into
                <strong>sections</strong>, like the one you're currently reading
              </h2>
            </div>
          </section>
        </div>
      </div>
    </b-modal>
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
      lang: "en",
      isCardModalActive: false
    };
  },
  created() {
    // get top Entity from data
    this.entity = this.data.entities[this.entityId] || {};
  },
  computed: {
    title: function() {
      return this.entity[`title_${this.lang}`] || "N/A";
    },

    body: function() {
      return this.entity[`summary_${this.lang}`] || "N/A";
    },

    advantages: function() {
      return this.entity[`advantage_${this.lang}`] || "N/A";
    },

    disadvantages: function() {
      return this.entity[`disadvantage_${this.lang}`] || "N/A";
    }
  },
  methods: {
    printEntity: function() {
      this.isCardModalActive = true;
    }
  }
};
</script>
<style scoped>
.print-modal {
  z-index: 100000;
}
</style>
