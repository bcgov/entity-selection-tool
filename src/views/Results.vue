<template>
  <div class="uk-flex uk-flex-center">
    <div class="uk-card uk-card-default uk-width-2-3">
      <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ $t(structure) }}
            </h3>
          </div>
        </div>
      </div>
      <div class="uk-card-body" uk-grid>
        <p>{{ $t(body) }}</p>
        <div class="uk-width-1-2">
          <h4>{{ $t("advantages") }}</h4>
          <ul>
            <span v-html="$t(advantages)"></span>
          </ul>
        </div>
        <div class="uk-width-1-2">
          <h4>{{ $t("disadvantages") }}</h4>
          <ul>
            <span v-html="$t(disadvantages)"></span>
          </ul>
        </div>
      </div>
      <div class="uk-card-footer">
        <router-link to="/">{{ $t("restart") }}</router-link> ||
        <button>Print result</button> ||
        <button>Print all entities summary</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "results",
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
