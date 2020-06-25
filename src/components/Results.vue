<template>
  <div class="columns">
    <div class="column is-half">
      <BaseCard class="question box">
        <template v-slot:headertext>
          <h3>
            {{ $t(structure) }}
          </h3>
        </template>
        <template v-slot:bodytext>
          <p>{{ $t(body) }}</p>
          <div>
            <h4>{{ $t("advantages") }}</h4>
            <ul>
              <span v-html="$t(advantages)"></span>
            </ul>
          </div>
          <div>
            <h4>{{ $t("disadvantages") }}</h4>
            <ul>
              <span v-html="$t(disadvantages)"></span>
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
    structure: String
  },
  computed: {
    /**
     * For use with i18n
     * @returns key for structure description
     */
    body: function() {
      return this.structure + "_body";
    },
    /**
     * For use with i18n
     * @returns key for advantages of structure
     */
    advantages: function() {
      return this.structure + "_adv";
    },
    /**
     * For use with i18n
     * @returns key for disadvantages of strucutre
     */
    disadvantages: function() {
      return this.structure + "_dis";
    }
  }
};
</script>
